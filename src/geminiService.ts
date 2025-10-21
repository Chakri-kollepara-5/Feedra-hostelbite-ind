import { ai } from './firebaseConfig';

export async function generateGeminiResponse(prompt: string) {
  try {
    const model = ai.generativeModel({ modelName: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    return result.text || "No response text.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong.";
  }
}
