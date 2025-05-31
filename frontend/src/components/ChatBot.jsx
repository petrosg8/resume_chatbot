// frontend/src/components/ChatBot.jsx
import React, { useState, useRef, useEffect } from "react";
import MessageList from "./MessageList";
import SampleQuestions from "./SampleQuestions";
import MessageInput from "./MessageInput";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi there! Ask me anything about my resume." },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    // Whenever messages change, scroll down to the bottom
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(userText) {
    if (!userText.trim()) return;

    // 1) Add user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText.trim() },
    ]);

    // 2) Add a “thinking” placeholder for the bot
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "🤖 Let me think..." },
    ]);

    // 3) After a short delay, replace the placeholder with a real reply
    setTimeout(() => {
      setMessages((prev) => {
        // Remove the placeholder
        const withoutPlaceholder = prev.filter(
          (msg) => msg.text !== "🤖 Let me think..."
        );

        // Add a dummy reply for now (we’ll wire up HTTP next)
        return [
          ...withoutPlaceholder,
          {
            sender: "bot",
            text: `You said: "${userText}". (Real reply via HTTP coming soon!)`,
          },
        ];
      });
    }, 800);
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Scrollable message area */}
      <div className="flex-1 overflow-y-auto chat-scrollbar px-4 py-2 scroll-smooth">
        <MessageList messages={messages} />
        <div ref={bottomRef} />
      </div>

      {/* Sample questions row */}
      <div className="border-t border-gray-200 p-2">
        <SampleQuestions onAsk={handleSend} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 px-4 py-2">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
