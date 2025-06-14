import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import ModelCard from '../components/ModelCard';

// Updated logo paths to use the PNG assets the user has provided locally
const models = [
  {
    id: 'chatgpt-4',
    name: 'ChatGPT 4',
    tagline: 'Advanced reasoning and creative problem solving',
    contextLength: '128K',
    useCases: ['🧠', '💡', '📝'],
    logo: '/logos/openai.png',
  },
  {
    id: 'gemini-2-5',
    name: 'Google Gemini 2.5',
    tagline: 'Multimodal AI with enhanced reasoning capabilities',
    contextLength: '2M',
    useCases: ['🌟', '📊', '🎯'],
    logo: '/logos/gemini.png',
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    tagline: 'Real-time information and witty responses',
    contextLength: '100K',
    useCases: ['⚡', '🔍', '💬'],
    logo: '/logos/grok.png',
  },
  {
    id: 'claude-4',
    name: 'Claude 4',
    tagline: 'Constitutional AI with strong reasoning',
    contextLength: '200K',
    useCases: ['📚', '🎓', '🔬'],
    logo: '/logos/claude.png',
  },
];

const ModelSelection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextModel = () => {
    setActiveIndex((prev) => (prev + 1) % models.length);
  };

  const prevModel = () => {
    setActiveIndex((prev) => (prev - 1 + models.length) % models.length);
  };

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0c0f15]/80 backdrop-blur-lg border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Promptly<span className="text-[#19faff]">.</span>
          </Link>
          <Link
            to="/"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="container mx-auto px-4 py-16 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Choose Your AI Model
        </h1>

        {/* Carousel */}
        <div className="relative w-full max-w-4xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {models.map((model, index) => (
                <div key={model.id} className="w-full flex-shrink-0 px-4">
                  <ModelCard model={model} isActive={index === activeIndex} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevModel}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 w-10 h-10 rounded-full bg-[#0c0f15]/80 border border-white/10 flex items-center justify-center hover:border-[#19faff]/50 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextModel}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 w-10 h-10 rounded-full bg-[#0c0f15]/80 border border-white/10 flex items-center justify-center hover:border-[#19faff]/50 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {models.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex ? 'bg-[#19faff] w-6' : 'bg-gray-600'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ModelSelection;
