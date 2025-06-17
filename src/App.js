import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [theme, setTheme] = useState("haunted mansion");
  const [stage, setStage] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const riddles = [
    "I speak without a mouth and hear without ears. I have nobody, but I come alive with the wind. What am I?",
    "I have keys but no locks. I have space but no room. You can enter but not go outside. What am I?",
    "The more you take, the more you leave behind. What am I?",
    "What has to be broken before you can use it?",
    "I’m tall when I’m young, and I’m short when I’m old. What am I?",
  ];
  

  // This function is called when "Start Game" is clicked
  const startGame = () => {
    setMessages([
      {
        role: "bot",
        text: `🧠 You awaken in the haunted mansion.\n\n🧩 Riddle 1: ${riddles[0]}`,
      },
    ]);
    setStage(0);
    setInput("");
  };
  

  const sendAnswer = () => {
    if (!input.trim()) return;
    const userMsg = input;
    const nextStage = stage + 1;
  
    const nextRiddle =
      nextStage < riddles.length
        ? `🧩 Riddle ${nextStage + 1}: ${riddles[nextStage]}`
        : "🎉 You’ve escaped the haunted mansion! Well done!";
  
    setMessages([
      ...messages,
      { role: "user", text: userMsg },
      { role: "bot", text: `✅ Good choice!\n\n${nextRiddle}` },
    ]);
    setStage(nextStage);
    setInput("");
  };
  

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app">
      <h1>🧠 MindEscape – AI Escape Room</h1>
      <div className="controls">
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="haunted mansion">Haunted Mansion</option>
          {/* Add more themes here */}
        </select>
        <button onClick={startGame}>Start Game</button>
      </div>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatRef} />
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          placeholder="Type your answer..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendAnswer()}
        />
        <button onClick={sendAnswer}>Submit</button>
      </div>
    </div>
  );
}

export default App;
