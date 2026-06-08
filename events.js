const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function fetchEvents() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/New_York",
  });

  const prompt = `Today is ${today}. 

Search for fun upcoming events happening TODAY and THIS WEEK in the following areas:
- Essex County, NJ (Newark, East Orange, Montclair, Maplewood, South Orange)
- Hudson County, NJ (Jersey City, Hoboken, Bayonne)
- Union County, NJ (Elizabeth, Rahway, Roselle, Westfield, Summit)
- Broader NYC metro area (Manhattan, Brooklyn, Queens)

Focus on TIME-SENSITIVE, community-oriented events such as:
- Food festivals & street fairs
- Music festivals & live concerts (free or affordable)
- Parades & cultural celebrations
- Block parties & neighborhood events
- Farmers markets & outdoor markets
- Family-friendly outdoor events
- Art walks & pop-up events

Format the response as a clean SMS-friendly list. Start with a fun greeting. 
Include event name, location, date/time, and a one-line description.
Keep the total message under 1500 characters so it fits in an SMS.
If no specific events are found for today, list the best upcoming events this week.
End with an encouraging sign-off.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
      },
    ],
    messages: [{ role: "user", content: prompt }],
  });

  // Extract the final text response
  const textBlocks = response.content.filter((block) => block.type === "text");
  if (textBlocks.length > 0) {
    return textBlocks[textBlocks.length - 1].text;
  }

  return "Good morning! No events found today — check back tomorrow. Have a great day! 🌟";
}

module.exports = { fetchEvents };
