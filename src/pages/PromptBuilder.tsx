import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, RefreshCw } from 'lucide-react';
import ModelInfo from '../components/ModelInfo';
import PromptForm from '../components/PromptForm';
import PromptOutput from '../components/PromptOutput';
// AI model data for prompt building
const modelData = {
  'chatgpt-4': {
    name: 'ChatGPT 4',
    icon: '🤖',
    specialty: 'Advanced reasoning and creative problem solving',
    tokenLimit: 128000
  },
  'gemini-2-5': {
    name: 'Google Gemini 2.5',
    icon: '💎',
    specialty: 'Multimodal AI with enhanced reasoning capabilities',
    tokenLimit: 2000000
  },
  'grok-3': {
    name: 'Grok 3',
    icon: '🚀',
    specialty: 'Real-time information and witty responses',
    tokenLimit: 100000
  },
  'claude-4': {
    name: 'Claude 4',
    icon: '🎭',
    specialty: 'Constitutional AI with strong reasoning',
    tokenLimit: 200000
  }
};
const PromptBuilder = () => {
  const {
    modelId
  } = useParams<{
    modelId: string;
  }>();
  const model = modelId && modelData[modelId as keyof typeof modelData] ? modelData[modelId as keyof typeof modelData] : {
    name: 'Unknown Model',
    icon: '❓',
    specialty: 'Unknown specialty',
    tokenLimit: 0
  };
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const handleGeneratePrompt = (formData: any) => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const prompt = `# Task
${formData.outcome}

# Target Audience
${formData.audience}

# Constraints
${formData.constraints}

${formData.context ? `# Context/Reference Material
${formData.context}

` : ''}${formData.example ? `# Example/Gold Standard
${formData.example}

` : ''}# Output Format
Please format your response as ${formData.format || 'clear, concise text'}.

---

Please complete this task following all specifications above.`;
      setGeneratedPrompt(prompt);
      setIsGenerating(false);
    }, 1500);
  };
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    // In a real app, you'd show a toast notification here
  };
  const handleRegeneratePrompt = (formData: any) => {
    handleGeneratePrompt(formData);
  };
  return <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0c0f15]/80 backdrop-blur-lg border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Promptly<span className="text-[#19faff]">.</span>
          </Link>
          <Link to="/select" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Models</span>
          </Link>
        </div>
      </header>
      {/* Content */}
      <section className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Prompt Builder</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Model info */}
          <div className="lg:col-span-4">
            <ModelInfo model={model} />
          </div>
          {/* Right column - Prompt builder */}
          <div className="lg:col-span-8">
            <PromptForm onSubmit={handleGeneratePrompt} />
            {generatedPrompt && <div className="mt-8">
                <PromptOutput prompt={generatedPrompt} isGenerating={isGenerating} onCopy={handleCopyPrompt} onRegenerate={handleRegeneratePrompt} />
              </div>}
          </div>
        </div>
      </section>
    </main>;
};
export default PromptBuilder;