import React from "react";

import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SuperheroPage from "./pages/SuperheroPage";

const App = () => {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300 overflow-hidden">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/superhero/:id" element={<SuperheroPage />} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
