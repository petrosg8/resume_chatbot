// frontend/src/components/SampleQuestions.jsx

import React from "react";

export default function SampleQuestions({ onAsk }) {
  const samples = [
    "Tell me something about yourself.",
    "What projects have you worked on?",
    "What are your skills?",
    "Where did you study?",
    "What are your hobbies?",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {samples.map((q, idx) => (
        <button
          key={idx}
          onClick={() => onAsk(q)}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm
                     hover:bg-gray-300 transition
                     dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
