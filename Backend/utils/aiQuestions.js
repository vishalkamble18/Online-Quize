const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
  console.log("❌ OPENAI KEY MISSING");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateAIQuestions(topic, total) {
  try {
    console.log("🤖 Generating AI questions for:", topic);

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `
Generate ${total} multiple choice questions on "${topic}".

Rules:
- 4 options only
- correctAnswer must be index (0-3)
- Return ONLY valid JSON array

Example:
[
  {
    "question": "What is C++?",
    "options": ["Lang", "OS", "DB", "Browser"],
    "correctAnswer": 0
  }
]
`
    });

    const text = response.output_text;
    const questions = JSON.parse(text);

    console.log("✅ AI QUESTIONS GENERATED:", questions.length);
    return questions;

  } catch (err) {
    console.error("❌ AI ERROR:", err.message);
    return [];
  }
}

module.exports = generateAIQuestions;
