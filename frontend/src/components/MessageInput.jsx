// frontend/src/components/MessageInput.jsx

import React, { useState, useRef, useEffect } from "react";
import { SAMPLE_QUESTIONS } from "./SampleQuestions";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef(null);

  // Focus the input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Update suggestion based on the first sample question that starts with the typed text
  useEffect(() => {
    if (!text.trim()) {
      setSuggestion("");
      return;
    }
    const lower = text.toLowerCase();
    const match = SAMPLE_QUESTIONS.find((q) =>
      q.toLowerCase().startsWith(lower)
    );
    setSuggestion(match || "");
  }, [text]);

  // Accept suggestion when pressing Right Arrow
  function handleKeyDown(e) {
    if (e.key === "ArrowRight" && suggestion) {
      const textTyped = text.toLowerCase();
      if (suggestion.toLowerCase().startsWith(textTyped)) {
        e.preventDefault();
        setText(suggestion);
        setSuggestion("");
      }
    }
  }

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    setSuggestion("");
  }

  // Compute the “rest” of the suggestion that hasn’t been typed yet
  const rest =
    suggestion && suggestion.toLowerCase().startsWith(text.toLowerCase())
      ? suggestion.slice(text.length)
      : "";

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      {/* 
        Container with border + background 
        Moves bg-white / dark:bg-gray-700 off the input and onto this wrapper 
      */}
      <div
        className="relative w-full border border-gray-300 rounded-full
                   bg-white dark:bg-gray-700
                   focus-within:ring-2 focus-within:ring-teal-300 dark:border-gray-600"
      >
        {/* 
          Autocomplete “ghost” text:
          - Uses the same font settings as the input (monospace, same font-size).
          - Shown in a lighter color.
          - pointer-events-none so clicks land on the input beneath.
        */}
        {suggestion && (
          <div
            className="absolute inset-y-0 left-0 px-4 py-2 text-gray-400 whitespace-pre-nowrap
                       pointer-events-none select-none font-mono text-base"
          >
            {/* Show typed portion in normal color, remainder in half opacity */}
            {text}
            <span className="opacity-50">{rest}</span>
          </div>
        )}

        {/* Actual input, with transparent background so ghost text is visible */}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
          className="w-full px-4 py-2 pr-20 bg-transparent text-gray-900 dark:text-gray-100
                     placeholder-gray-500 dark:placeholder-gray-400
                     font-mono text-base focus:outline-none"
          autoComplete="off"
        />

        {/* “Send” button positioned inside the same wrapper */}
        <button
          type="submit"
          disabled={!text.trim()}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 rounded-full font-semibold transition
            ${
              text.trim()
                ? "bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-400 dark:hover:bg-teal-500"
                : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
            }`}
          title="Send your question"
        >
          Send
        </button>
      </div>
    </form>
  );
}
