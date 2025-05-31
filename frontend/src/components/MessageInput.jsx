// frontend/src/components/MessageInput.jsx
import React, { useState, useRef, useEffect } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full
                   bg-white text-gray-900 placeholder-gray-500
                   focus:outline-none focus:ring-2 focus:ring-teal-300
                   dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400
                   dark:border-gray-600"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className={`px-4 py-2 rounded-full font-semibold transition
          ${
            text.trim()
              ? "bg-teal-500 text-white hover:bg-teal-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
          dark:disabled:bg-gray-700 dark:disabled:text-gray-500
        `}
      >
        Send
      </button>
    </form>
  );
}
