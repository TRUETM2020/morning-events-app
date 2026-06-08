// Run this to test your app before deploying
// Command: node test.js
require("dotenv").config();

const { fetchEvents } = require("./events");
const { sendSMS } = require("./sms");

async function test() {
  console.log("🧪 Testing Morning Events App...\n");

  // Check environment variables
  const required = [
    "ANTHROPIC_API_KEY",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_PHONE_NUMBER",
    "MY_PHONE_NUMBER",
  ];

  let allSet = true;
  for (const key of required) {
    if (!process.env[key] || process.env[key].includes("your_")) {
      console.error(`❌ Missing or unset: ${key}`);
      allSet = false;
    } else {
      console.log(`✅ ${key} is set`);
    }
  }

  if (!allSet) {
    console.log("\n⚠️  Please fill in your .env file before testing.");
    process.exit(1);
  }

  console.log("\n🔍 Fetching events from Claude...");
  const message = await fetchEvents();

  console.log("\n📋 Message to be sent:\n");
  console.log("─".repeat(50));
  console.log(message);
  console.log("─".repeat(50));
  console.log(`\nCharacter count: ${message.length}`);

  console.log("\n📱 Sending test SMS...");
  await sendSMS(message);

  console.log("\n🎉 Test complete! Check your phone for the SMS.");
}

test().catch((err) => {
  console.error("Test failed:", err.message);
  process.exit(1);
});
