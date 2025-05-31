// frontend/src/components/ChatBot.jsx

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import MessageList from "./MessageList";
import SampleQuestions from "./SampleQuestions";
import MessageInput from "./MessageInput";

export default function ChatBot() {
  //  Theme state (light/dark), persisted in localStorage
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  //  When isDark changes, toggle 'dark' class on <html> and store preference
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

  //  Helper to toggle theme
  function toggleTheme() {
    setIsDark((prev) => !prev);
  }

  //  Chat messages state: { sender: "user"|"bot", text: string, time: "HH:MM" }
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! Ask me anything about my CV.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const bottomRef = useRef(null);

  //  Scroll down on every new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //  Utility to get current time as "HH:MM"
  function getTimestamp() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  //  When user sends a prompt (typed or clicked), update state and call backend
  async function handleSend(userText) {
    if (!userText.trim()) return;
    const now = getTimestamp();

    //  Append user message
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText.trim(), time: now },
    ]);

    //  Append "thinking" placeholder
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "🤖 Thinking...", time: now },
    ]);

    try {
      //  POST to Flask /chat
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        prompt: userText.trim(),
      });

      const botReplyText = response.data.reply || "Sorry, no reply received.";
      const replyTimestamp = getTimestamp();
      const botMsg = { sender: "bot", text: botReplyText, time: replyTimestamp };

      //  Replace only the last "thinking" placeholder with real reply
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
      const errorTimestamp = getTimestamp();
      const errorMsg = {
        sender: "bot",
        text: "😕 Oops! Something went wrong. Please try again.",
        time: errorTimestamp,
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

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* ─────────────── Scrollable region with sticky header ─────────────── */}
      <div className="h-0 flex-1 overflow-y-auto chat-scrollbar bg-gray-100 dark:bg-gray-900 scroll-smooth">
        {/*
          Sticky header inside the scroll area:
          - bg-teal-500 (light) / dark:bg-teal-700 (dark)
          - px-6 py-4 for padding
          - flex justify-between to place title and toggle on same line
          - z-10 so it stays above the messages
        */}
        <div className="sticky top-0 z-10 bg-teal-500 dark:bg-teal-700 px-6 py-4 flex items-center justify-between">
          <h1 className="text-white text-xl font-semibold">Petros Gerogiannis Resume Chatbot</h1>
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

        {/* ─────────────── Messages List ─────────────── */}
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
