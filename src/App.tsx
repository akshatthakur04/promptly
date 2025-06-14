import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ModelSelection from './pages/ModelSelection';
import PromptBuilder from './pages/PromptBuilder';
export function App() {
  return <Router>
      <div className="min-h-screen bg-[#0c0f15] text-white font-['Inter',sans-serif]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<ModelSelection />} />
          <Route path="/build/:modelId" element={<PromptBuilder />} />
        </Routes>
      </div>
    </Router>;
}