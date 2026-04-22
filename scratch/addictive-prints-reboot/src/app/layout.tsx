import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Addictive Prints | Industrial Precision",
  description: "Accessoires pour artisans et bricoleurs exigeants. Précision, Durabilité, Confort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-zinc-950 text-zinc-50 min-h-screen flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
