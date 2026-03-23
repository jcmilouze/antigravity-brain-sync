const NETDATA_URL = 'http://62.212.70.10:19999';

export const fetchNodeInfo = async () => {
  const response = await fetch(`${NETDATA_URL}/api/v1/info`);
  return await response.json();
};

export const fetchChartData = async (chart, after = -300) => {
  const response = await fetch(`${NETDATA_URL}/api/v1/data?chart=${chart}&after=${after}&format=json&points=60`);
  return await response.json();
};

export const fetchAlarms = async () => {
  const response = await fetch(`${NETDATA_URL}/api/v1/alarms?active`);
  return await response.json();
};

export const fetchSummary = async () => {
  const [cpu, ram, disk, net, storage] = await Promise.all([
    fetchChartData('system.cpu', -60),
    fetchChartData('system.ram', -60),
    fetchChartData('system.io', -60),
    fetchChartData('system.net', -60),
    fetchChartData('disk_space._var_log', -60),
  ]);

  return { cpu, ram, disk, net, storage };
};
