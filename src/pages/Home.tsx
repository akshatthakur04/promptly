import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Bot, DollarSign } from 'lucide-react';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
const Home = () => {
  return <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 md:py-32 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-[#19faff10] via-transparent to-transparent animate-pulse-slow"></div>
          <div className="absolute w-full h-full opacity-10">
            {[...Array(20)].map((_, i) => <div key={i} className="absolute h-[1px] w-[100px] md:w-[200px] bg-[#19faff] blur-[2px]" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: Math.random() * 0.5 + 0.2
          }}></div>)}
          </div>
        </div>
        {/* Logo */}
        <div className="relative mb-6 w-64 h-12 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#19faff] blur-xl opacity-20 rounded-full"></div>
          <h1 className="text-4xl font-bold tracking-tight">
            Promptly<span className="text-[#19faff]">.</span>
          </h1>
        </div>
        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 tracking-tight">
          Craft model-perfect prompts<span className="text-[#19faff]">.</span>{' '}
          <span className="block">
            Instantly<span className="text-[#19faff]">.</span>
          </span>
        </h2>
        {/* Subtext */}
        <p className="text-xl text-gray-300 text-center max-w-2xl mb-8">
          Promptly generates optimized AI prompts tailored for ChatGPT 4, 
          Google Gemini 2.5, Grok 3, and Claude 4.
        </p>
        {/* CTA Button */}
        <Link to="/select" className="group">
          <button className="relative px-8 py-3 bg-[#0c0f15] border border-[#19faff] rounded-xl text-lg font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(25,250,255,0.5)] hover:-translate-y-1">
            <span className="relative z-10">Start Now</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[#19faff] blur-md rounded-xl transition-opacity duration-300"></div>
          </button>
        </Link>
      </section>
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon={<Zap className="text-[#19faff]" size={24} />} title="Instant Prompt Generation" description="Create optimized prompts in seconds, not minutes" />
          <FeatureCard icon={<Bot className="text-[#11b0ff]" size={24} />} title="Model-Specific Optimization" description="Tailored prompts for each AI model's unique capabilities" />
          <FeatureCard icon={<DollarSign className="text-[#0aefff]" size={24} />} title="Free to Use" description="Powerful prompt engineering tools at no cost" />
        </div>
      </section>
      {/* Footer */}
      <div className="mt-auto">
        <Footer />
      </div>
    </main>;
};
export default Home;