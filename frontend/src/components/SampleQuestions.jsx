// frontend/src/components/SampleQuestions.jsx

import React from "react";

export const SAMPLE_QUESTIONS = [
  "Tell me something about yourself.",
  "What projects have you worked on?",
  "What are your skills?",
  "Where did you study?",
];

export default function SampleQuestions({ onAsk }) {
  return (
    <div className="flex flex-wrap gap-2">
      {SAMPLE_QUESTIONS.map((q, idx) => (
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
