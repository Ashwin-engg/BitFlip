// mqttSubscriber.js
const mqtt = require("mqtt");
require("dotenv").config();

function initMQTT() {
  const brokerUrl = process.env.MQTT_BROKER || "mqtt://localhost:1883";

  const client = mqtt.connect(brokerUrl);

  client.on("connect", () => {
    console.log("✅ Connected to MQTT Broker");

    // Subscribe to CNC topic
    client.subscribe("cnc/sensors", (err) => {
      if (!err) {
        console.log("📡 Subscribed to cnc/sensors");
      } else {
        console.error("❌ MQTT subscription error:", err.message);
      }
    });
  });

  client.on("message", (topic, message) => {
    const data = message.toString();
    console.log(`📥 Message received on ${topic}:`, data);

    // Later: send to InfluxDB here
  });

  client.on("error", (err) => {
    console.error("❌ MQTT Error:", err.message);
  });
}

module.exports = initMQTT;

