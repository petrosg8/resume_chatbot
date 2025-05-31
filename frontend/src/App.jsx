// frontend/src/App.jsx

import React from "react";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      {/*
        Chat card:
        - bg-white: white background
        - rounded-2xl + shadow-lg: soft corners + drop shadow
        - h-[80vh]: fix at 80% of viewport height
        - flex flex-col overflow-hidden: stack its children, and clip anything beyond the bounds
      */}
      <div className="bg-white rounded-2xl shadow-lg h-[80vh] flex flex-col overflow-hidden">
        {}
        <ChatBot />
      </div>
    </div>
  );
}

export default App;
