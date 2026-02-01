// Basic Input Sanitization to prevent Prompt Injection
const sanitizeInput = (input) => {
  if (!input) return "";
  // 1. Truncate to reasonable length (15k chars is ~4k tokens, safe for Gemini Flash)
  let clean = input.slice(0, 15000);

  // 2. Remove potential control characters that might confuse the model
  // (We keep newlines and basic punctuation)
  clean = clean.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");

  return clean;
};

// Client now calls a server-side proxy at `/api/generate` so the API key
// remains on the server. The server will forward the request to Gemini.
export const generateWithGemini = async (rawPrompt) => {
  try {
    const prompt = sanitizeInput(rawPrompt);

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });
    clearTimeout(id);
    if (!response.ok) throw new Error('API Request Failed');
    const data = await response.json();

    // The server forwards Gemini's response; extract the generated text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No content generated');
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('AI Generation Failed:', error);
    return null;
  }
};

export const explainAnswer = async (question, correctAnswer, userAnswer) => {
  try {
    const prompt = `Explain concisely (max 2-3 sentences) why "${correctAnswer}" is the correct answer to: "${question}". ${userAnswer && userAnswer !== correctAnswer ? `Briefly mention why "${userAnswer}" is incorrect.` : ''}`;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 15000);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
      signal: controller.signal,
    });
    clearTimeout(id);

    if (!response.ok) throw new Error('API Request Failed');
    const data = await response.json();

    // Extract text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "No explanation available.";
  } catch (error) {
    console.error("Explanation Failed:", error);
    return "Could not load explanation.";
  }
};
