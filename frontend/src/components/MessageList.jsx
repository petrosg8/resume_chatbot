// frontend/src/components/MessageList.jsx

import React from "react";

export default function MessageList({ messages }) {
  return (
    <ul className="flex flex-col space-y-2">
      {messages.map((msg, idx) => {
        const isUser = msg.sender === "user";

        return (
          <li
            key={idx}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow
                 ${
                   isUser
                     ? "bg-teal-500 text-white rounded-br-none dark:bg-teal-400"
                     : "bg-gray-100 text-gray-800 rounded-bl-none dark:bg-gray-700 dark:text-gray-200"
                 }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                {msg.time}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
