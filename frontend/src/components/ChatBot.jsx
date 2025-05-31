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

    //  user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText.trim() },
    ]);

    // “thinking” placeholder for the bot
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

        // TODO: implement backend functionality
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
    <div className="flex-1 flex flex-col h-full">
      {/* ─── SCROLLABLE REGION ────────────────────────────────────────────── */}
      {/* 
        - h-0 flex-1: forces this div to occupy exactly the “leftover” space.
        - overflow-y-auto: only *this* area scrolls vertically.
        - scroll-smooth: smooth scrolling when new messages appear.
      */}
      <div className="h-0 flex-1 overflow-y-auto scroll-smooth">
        {/*
          ──────────────────── Sticky Header ────────────────────
          - sticky top-0: pins this header to the top of the scroll container.
          - z-10: ensures it sits above the messages as they scroll under it.
          - bg-teal-500: teal background
          - px-6 py-4: padding
        */}
        <div className="sticky top-0 z-10 bg-teal-500 px-6 py-4">
          <h1 className="text-white text-xl font-semibold text-center">
            Petros Gerogiannis Resume Chatbot
          </h1>
        </div>

        {}
        <div className="px-4 py-2">
          <MessageList messages={messages} />
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ───  Sample Questions Row (never scrolls) ────────────────────────── */}
      <div className="border-t border-gray-200 p-2 bg-white">
        <SampleQuestions onAsk={handleSend} />
      </div>

      {/* ─── 4) Input Area (never scrolls) ─────────────────────────────────── */}
      <div className="border-t border-gray-200 px-4 py-2 bg-white">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}