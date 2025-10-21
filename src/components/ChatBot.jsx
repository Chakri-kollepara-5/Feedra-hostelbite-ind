import React, { useState } from "react";
import { ai } from "../firebaseGemini";

const ChatBot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const result = await ai.generateText({
        prompt: input,
      });
      setResponse(result.text);
    } catch (error) {
      console.error("Gemini Error:", error);
      setResponse("⚠️ Failed to get AI response.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>🤖 Gemini AI Chatbot</h2>
      <textarea
        rows="3"
        placeholder="Type something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      <button onClick={handleSend}>Send</button>
      {response && (
        <div style={{ marginTop: "15px", padding: "10px", background: "#f3f3f3" }}>
          <strong>AI:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
