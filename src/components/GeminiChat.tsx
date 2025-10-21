import React, { useState } from "react";
import { generateGeminiResponse } from "../geminiService";

const GeminiChat: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    const output = await generateGeminiResponse(prompt);
    setResponse(output);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🤖 Gemini AI Chat</h2>
      <input
        type="text"
        placeholder="Ask something..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ padding: "10px", width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleSend}>Send</button>
      <div style={{ marginTop: "20px" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default GeminiChat;
