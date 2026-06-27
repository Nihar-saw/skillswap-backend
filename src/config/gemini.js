const askGemini = async (prompt, systemInstruction = "") => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.XAI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key for Gemini/AI service is missing");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
    }
    throw new Error("Unexpected response structure from Gemini API");
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw error;
  }
};

module.exports = askGemini;
