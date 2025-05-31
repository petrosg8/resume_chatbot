// frontend/src/App.jsx
import React from "react";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/*
        Chat card container:
        - bg-white (light) / dark:bg-gray-800 (dark)
        - rounded-2xl + shadow-lg
        - h-[80vh], flex-col, overflow-hidden
      */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-[80vh] flex flex-col overflow-hidden">
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
