// frontend/src/App.js
import React from "react";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="w-full h-full">
      {}
      <div className="w-full h-full bg-white dark:bg-gray-800 flex flex-col overflow-hidden">
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
