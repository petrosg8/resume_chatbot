// frontend/src/components/ChatBot.jsx

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { SunIcon, MoonIcon, TrashIcon } from "@heroicons/react/24/solid";
import MessageList from "./MessageList";
import SampleQuestions from "./SampleQuestions";
import MessageInput from "./MessageInput";

export default function ChatBot() {
  // ─── Theme State (for Light/Dark Mode) ─────────────────────────────────
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    // If no preference saved, default to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = window.document.documentElement; 
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  // ───  Chat History State & Persistence ─────────────────────────────────
  // Each message: { sender: "user" | "bot", text: string, time: "HH:MM" }

  // Helper to compute current HH:MM timestamp
  function getTimestamp() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // Initial greeting (used if no saved history)
  const initialGreeting = {
    sender: "bot",
    text: "👋 Hi there! Ask me anything about my CV.",
    time: getTimestamp(),
  };

  // Load messages from localStorage (if any), else start with [initialGreeting]
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("chatHistory");
      if (saved) {
        // Parse stored JSON; ensure it’s an array
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Failed to parse saved chat history:", e);
    }
    return [initialGreeting];
  });

  // Whenever messages change, write them to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  // ───  Clear Chat Functionality ────────────────────────────────────────────
  function handleClearChat() {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      const freshGreeting = {
        sender: "bot",
        text: "👋 Hi there! Ask me anything about my CV.",
        time: getTimestamp(),
      };
      setMessages([freshGreeting]);
      localStorage.removeItem("chatHistory");
    }
  }

  // ───  Scroll to Bottom on New Message ─────────────────────────────────────
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ───  Sending a New Message to the Bot ────────────────────────────────────
  async function handleSend(userText) {
    if (!userText.trim()) return;
    const now = getTimestamp();

    //  Append user's message
    const newUserMsg = { sender: "user", text: userText.trim(), time: now };
    setMessages((prev) => [...prev, newUserMsg]);

    //  Append "Thinking..." placeholder
    const thinkingMsg = { sender: "bot", text: "🤖 Thinking...", time: now };
    setMessages((prev) => [...prev, thinkingMsg]);

    try {
      //  Call backend /chat endpoint
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        prompt: userText.trim(),
      });
      const botReplyText = response.data.reply || "Sorry, no reply received.";
      const replyTimestamp = getTimestamp();
      const botMsg = { sender: "bot", text: botReplyText, time: replyTimestamp };

      //  Replace the last "Thinking..." placeholder with the real reply
      setMessages((prev) => {
        const withoutPlaceholder = prev.filter(
          (msg, idx) =>
            !(
              msg.sender === "bot" &&
              msg.text === "🤖 Thinking..." &&
              idx === prev.length - 1
            )
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
          (msg, idx) =>
            !(
              msg.sender === "bot" &&
              msg.text === "🤖 Thinking..." &&
              idx === prev.length - 1
            )
        );
        return [...withoutPlaceholder, errorMsg];
      });
    }
  }

  // ───  Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* ─────────────── Scrollable region with Sticky Header ─────────────── */}
      <div className="h-0 flex-1 overflow-y-auto chat-scrollbar bg-gray-100 dark:bg-gray-900 scroll-smooth">
        {/* Sticky header (contains title, theme toggle, and clear button) */}
        <div className="sticky top-0 z-10 bg-teal-500 dark:bg-teal-700 px-6 py-4 flex items-center justify-between">
          <h1 className="text-white text-xl font-semibold">Resumé chatbot</h1>
          <div className="flex items-center space-x-2">
            {/* Clear Chat Button */}
            <button
              onClick={handleClearChat}
              className="p-1 rounded-full bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300"
              aria-label="Clear chat history"
            >
              <TrashIcon className="h-6 w-6 text-white" />
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-full bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="h-6 w-6 text-white" />
              ) : (
                <MoonIcon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="px-4 py-2">
          <MessageList messages={messages} />
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ─────────────── Sample Questions Row ─────────────── */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-800">
        <SampleQuestions onAsk={handleSend} />
      </div>

      {/* ─────────────── Input Area ─────────────── */}
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
}
