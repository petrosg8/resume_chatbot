// frontend/src/components/MessageInput.jsx
import React, { useState } from "react";

export default function MessageInput({ onSend }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        placeholder="Type your question..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full 
                   focus:outline-none focus:ring-2 focus:ring-teal-300"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className={`px-4 py-2 rounded-full font-semibold transition 
          ${
            text.trim()
              ? "bg-teal-500 text-white hover:bg-teal-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        Send
      </button>
    </form>
  );
}
