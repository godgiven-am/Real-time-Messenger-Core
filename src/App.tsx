import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { AdminPage } from "./pages/AdminPage";
import { TestMUI } from "./TestMUI";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
