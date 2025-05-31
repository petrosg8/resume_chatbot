// frontend/src/components/ChatBot.jsx

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import SampleQuestions from "./SampleQuestions";
import MessageInput from "./MessageInput";

export default function ChatBot() {
  // messages: array of { sender: "user" | "bot", text: string }
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! Ask me anything about my CV.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])

  // Reference to auto-scroll to bottom
  const bottomRef = useRef(null);

  // Whenever messages change, scroll to the bottom:
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

   // Utility to get a “HH:MM” timestamp
   function getTimestamp() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Called when user types OR clicks a sample question
  async function handleSend(userText) {
    if (!userText.trim()) return;

    // Add the user's message with timestamp
    const userMsg = {
      sender: "user",
      text: userText.trim(),
      time: getTimestamp(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Add a “thinking” placeholder with timestamp
    const thinkingMsg = {
        sender: "bot",
        text: "🤖 Thinking...",
        time: getTimestamp(),
      };
      setMessages((prev) => [...prev, thinkingMsg]);

      try {
        // Send POST to Flask backend
        const response = await axios.post("http://127.0.0.1:5000/chat", {
          prompt: userText.trim(),
        });
  
        const botReplyText = response.data.reply || "Sorry, no reply received.";
        const botMsg = {
          sender: "bot",
          text: botReplyText,
          time: getTimestamp(),
        };
  
        //  Replace the thinking placeholder with actual botReply
        setMessages((prev) => {
          // Filter out exactly the last “🤖 Thinking...” placeholder
          const withoutPlaceholder = prev.filter(
            (msg, idx) => !(msg.sender === "bot" && msg.text === "🤖 Thinking..." && idx === prev.length - 1)
          );
          return [...withoutPlaceholder, botMsg];
        });
      } catch (err) {
        console.error("Error fetching reply:", err);
        const errorMsg = {
          sender: "bot",
          text: "😕 Oops! Something went wrong. Please try again.",
          time: getTimestamp(),
        };
        setMessages((prev) => {
          const withoutPlaceholder = prev.filter(
            (msg, idx) => !(msg.sender === "bot" && msg.text === "🤖 Thinking..." && idx === prev.length - 1)
          );
          return [...withoutPlaceholder, errorMsg];
        });
      }
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