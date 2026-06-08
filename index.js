const cron = require("node-cron");
const { fetchEvents } = require("./events");
const { sendSMS } = require("./sms");

console.log("🌅 Morning Events App started...");

// Runs every day at 6:00 AM (America/New_York timezone)
cron.schedule(
  "0 6 * * *",
  async () => {
    console.log("⏰ Running morning events job...");
    try {
      const message = await fetchEvents();
      await sendSMS(message);
      console.log("✅ SMS sent successfully!");
    } catch (err) {
      console.error("❌ Error:", err.message);
    }
  },
  {
    timezone: "America/New_York",
  }
);
