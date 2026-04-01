const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const { CallToolRequestSchema, ListToolsRequestSchema } = require("@modelcontextprotocol/sdk/types.js");
const { PrismaClient } = require("@prisma/client");
const { GarminConnect } = require("garmin-connect");
const { buildGPX, GarminBuilder } = require("gpx-builder");
const { Point } = GarminBuilder;
require("dotenv").config();

const prisma = new PrismaClient();
const server = new Server(
  { name: "garmin-velotrack-bridge", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Helper: Convertir routes waypoints -> GPX
function createGPX(route, name, description) {
  const gpxData = new GarminBuilder();
  
  // Hypothèse: waypoints est un tableau de {lat, lon, ele?} ou [lon, lat]
  const pts = Array.isArray(route.waypoints) ? route.waypoints : [];
  
  const points = pts.map(p => {
    const lat = p.lat || p[1];
    const lon = p.lon || p[0];
    const ele = p.elevation || p.ele || 0;
    return new Point(lat, lon, { ele, time: new Date() });
  });

  gpxData.setSegmentPoints(points);
  return buildGPX(gpxData.toObject());
}

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "garmin_export_velotrack",
      description: "Exporte un parcours VeloTrack vers Garmin Connect",
      inputSchema: {
        type: "object",
        properties: {
          route_id: { type: "number", description: "L'ID du parcours dans Postgres" },
          name: { type: "string", description: "Nom du parcours sur Garmin" },
          description: { type: "string" }
        },
        required: ["route_id"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "garmin_export_velotrack") {
    try {
      // 1. Query Postgres via Prisma
      const route = await prisma.route.findUnique({
        where: { id: parseInt(args.route_id) }
      });

      if (!route) return { content: [{ type: "text", text: `Parcours #${args.route_id} introuvable.` }], isError: true };

      // 2. Generate GPX
      const gpxContent = createGPX(route, args.name || route.name || "VeloTrack Route", args.description || "");

      // 3. Connect to Garmin
      const GC = new GarminConnect();
      await GC.login(process.env.GARMIN_EMAIL, process.env.GARMIN_PASSWORD);
      
      // 4. Upload Course
      // Note: garmin-connect-node library specific upload method
      // if uploadCourse is not direct, we use uploadActivity or similar specialized methods
      const result = await GC.uploadCourse(Buffer.from(gpxContent), {
        name: args.name || route.name || "Export VeloTrack",
        description: args.description || "Généré via Antigravity VeloTrack Bridge"
      });

      return {
        content: [{ type: "text", text: `🚀 Succès ! Parcours envoyé sur Garmin Connect (ID: ${args.route_id}).` }]
      };
    } catch (error) {
      return { content: [{ type: "text", text: `❌ Erreur : ${error.message}` }], isError: true };
    }
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Garmin VeloTrack Bridge running on stdio");
}

main().catch(console.error);
