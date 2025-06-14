// src/pages/PromptBuilder.tsx
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModelInfo from '../components/ModelInfo';
import PromptForm from '../components/PromptForm';
import PromptOutput from '../components/PromptOutput';

// ======= CONFIG =======
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

// ======= MAIN COMPONENT =======
const PromptBuilder: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();
  const model = (modelId && modelData[modelId as keyof typeof modelData]) 
    ? modelData[modelId as keyof typeof modelData] 
    : {
        name: 'Unknown Model',
        icon: '❓',
        specialty: 'Unknown specialty',
        tokenLimit: 0
      };

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [lastFormData, setLastFormData] = useState<any>(null);

  // WARNING: This API key should NOT be exposed in frontend code in production.
  // Move to a backend proxy for security in a real app!
  const OPENROUTER_API_KEY = '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';

  const handleGeneratePrompt = async (formData: any) => {
    setIsGenerating(true);
    setGeneratedPrompt('');

    // SYSTEM + USER PROMPT STRUCTURE
    const systemPrompt = `You are a world-class AI assistant, specialized in ${model.specialty}. Your task is to analyze the user's request and generate a response that is not only accurate but also perfectly tailored to the specified audience, constraints, and format. Think step-by-step to ensure all requirements are met with the highest quality.`;

    const userPrompt = `# TASK
${formData.outcome || ''}

# TARGET AUDIENCE
${formData.audience || ''}

# HARD CONSTRAINTS
${formData.constraints || ''}

${formData.context ? `# CONTEXT/SOURCE MATERIAL
${formData.context}
` : ''}
${formData.example ? `# GOLD STANDARD EXAMPLE
${formData.example}
` : ''}
# OUTPUT FORMAT REQUIRED
${formData.format || ''}

---
Deliver exactly what was requested. Be precise and match all constraints and needs.`;

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://promptly-app.com', // Optional, for OpenRouter analytics
          'X-Title': 'Promptly' // Optional, for OpenRouter analytics
        },
        body: JSON.stringify({
          model: 'nousresearch/nous-hermes-2-mixtral-8x7b-dpo', // Switched to a more stable free model
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        let errorText = await response.text();
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || 'No response generated.';
      setGeneratedPrompt(content);

    } catch (error: any) {
      console.error('Error generating prompt:', error);
      let msg = 'Sorry, there was an error generating your content. ';
      if (error instanceof Error) {
        msg += `Error: ${error.message}`;
      }
      setGeneratedPrompt(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyPrompt = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
      // In production: add a toast here!
    }
  };

  const handleFormSubmit = (formData: any) => {
    setLastFormData(formData);
    handleGeneratePrompt(formData);
  };

  const handleRegeneratePrompt = () => {
    if (lastFormData) {
      handleGeneratePrompt(lastFormData);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0c0f15] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0c0f15]/80 backdrop-blur-lg border-b border-white/10 px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-1">
            {/* Replace with your logo image if desired */}
            {/* <img src="/promptly.png" alt="Promptly Logo" className="h-7 mr-2" /> */}
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
            <PromptForm onSubmit={handleFormSubmit} />
            {(isGenerating || generatedPrompt) && (
              <div className="mt-8">
                <PromptOutput
                  prompt={generatedPrompt}
                  isGenerating={isGenerating}
                  onCopy={handleCopyPrompt}
                  onRegenerate={handleRegeneratePrompt}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PromptBuilder;