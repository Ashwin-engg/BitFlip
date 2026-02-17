const { InfluxDBClient } = require("@influxdata/influxdb3-client");

const influxClient = new InfluxDBClient({
  host: process.env.INFLUX_URL,
  token: process.env.INFLUX_TOKEN,
  database: process.env.INFLUX_DATABASE,
});

console.log("✅ InfluxDB client initialized");

module.exports = influxClient;