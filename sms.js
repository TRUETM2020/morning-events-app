const twilio = require("twilio");

async function sendSMS(message) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.MY_PHONE_NUMBER,
  });

  console.log(`📱 SMS sent to ${process.env.MY_PHONE_NUMBER}`);
}

module.exports = { sendSMS };
