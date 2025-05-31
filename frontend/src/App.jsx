// frontend/src/App.js
import React from "react";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/* 
        Chat card container:
        - bg-white: crisp white panel for chat UI
        - rounded-2xl: wide, smooth corners
        - shadow-lg: subtle drop shadow for depth
        - h-[80vh]: 80% of viewport height (so there’s breathing room above + below)
        - flex flex-col: vertical stacking (header, body, footer)
        - overflow-hidden: to keep borders from expanding when scrollbars appear
      */}
      <div className="bg-white rounded-2xl shadow-lg h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-teal-500">
          <h1 className="text-white text-xl font-semibold text-center">
            Resume Chatbot
          </h1>
        </div>

        {/* The rest of the chat UI */}
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
