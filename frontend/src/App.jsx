import React from "react";

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-600 to-black/90 text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
