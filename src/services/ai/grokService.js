const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

const askGrok = async (prompt) => {
  try {
    const response =
      await client.chat.completions.create({
        model: "grok-3",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    return response.choices[0].message.content;

  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = askGrok;