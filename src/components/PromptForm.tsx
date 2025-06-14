import React, { useState } from 'react';

interface PromptFormProps {
  onSubmit: (formData: {
    outcome: string;
    audience: string;
    constraints: string;
    context: string;
    example: string;
    format: string;
  }) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    outcome: '',
    audience: '',
    constraints: '',
    context: '',
    example: '',
    format: 'Markdown'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return <div className="relative p-6 rounded-2xl">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10"></div>
      {/* Content */}
      <form onSubmit={handleSubmit} className="relative space-y-6">
        <div>
          <label htmlFor="outcome" className="block text-gray-300 mb-2">
            1. What's the exact outcome you want in a single sentence?
          </label>
          <input 
            id="outcome" 
            name="outcome" 
            type="text" 
            value={formData.outcome} 
            onChange={handleChange} 
            placeholder="e.g., Create a compelling product description that increases conversion rates by 20%" 
            className="w-full px-4 py-3 bg-[#0c0f15]/60 border border-white/10 rounded-xl focus:border-[#19faff] focus:outline-none focus:ring-1 focus:ring-[#19faff] transition-colors" 
            required 
          />
        </div>

        <div>
          <label htmlFor="audience" className="block text-gray-300 mb-2">
            2. Who is the intended reader or end-user?
          </label>
          <input 
            id="audience" 
            name="audience" 
            type="text" 
            value={formData.audience} 
            onChange={handleChange} 
            placeholder="e.g., C-suite executives, high school students, technical developers" 
            className="w-full px-4 py-3 bg-[#0c0f15]/60 border border-white/10 rounded-xl focus:border-[#19faff] focus:outline-none focus:ring-1 focus:ring-[#19faff] transition-colors" 
            required 
          />
        </div>

        <div>
          <label htmlFor="constraints" className="block text-gray-300 mb-2">
            3. What hard constraints do I have to respect?
          </label>
          <textarea 
            id="constraints" 
            name="constraints" 
            value={formData.constraints} 
            onChange={handleChange} 
            placeholder="e.g., Maximum 250 words, must include 3 bullet points, follow AP style guide" 
            className="w-full px-4 py-3 bg-[#0c0f15]/60 border border-white/10 rounded-xl focus:border-[#19faff] focus:outline-none focus:ring-1 focus:ring-[#19faff] transition-colors min-h-[80px] resize-y" 
            required 
          />
        </div>

        <div>
          <label htmlFor="context" className="block text-gray-300 mb-2">
            4. What critical context or source material should the model reference?
          </label>
          <textarea 
            id="context" 
            name="context" 
            value={formData.context} 
            onChange={handleChange} 
            placeholder="e.g., Company values document, recent market research data, specific product specifications" 
            className="w-full px-4 py-3 bg-[#0c0f15]/60 border border-white/10 rounded-xl focus:border-[#19faff] focus:outline-none focus:ring-1 focus:ring-[#19faff] transition-colors min-h-[80px] resize-y" 
          />
        </div>

        <div>
          <label htmlFor="example" className="block text-gray-300 mb-2">
            5. Do you have a gold-standard example of the ideal output?
          </label>
          <textarea 
            id="example" 
            name="example" 
            value={formData.example} 
            onChange={handleChange} 
            placeholder="Paste your ideal example output here, or describe what perfect looks like..." 
            className="w-full px-4 py-3 bg-[#0c0f15]/60 border border-white/10 rounded-xl focus:border-[#19faff] focus:outline-none focus:ring-1 focus:ring-[#19faff] transition-colors min-h-[100px] resize-y" 
          />
        </div>

        <div>
          <label htmlFor="format" className="block text-gray-300 mb-2">
            Preferred output format
          </label>
          <select 
            id="format" 
            name="format" 
            value={formData.format} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-[#0c0f15]/60 border border-white/10 rounded-xl focus:border-[#19faff] focus:outline-none focus:ring-1 focus:ring-[#19faff] transition-colors appearance-none" 
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2399A3B1' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            <option value="Markdown">Markdown</option>
            <option value="JSON">JSON</option>
            <option value="Bullet list">Bullet list</option>
            <option value="Plaintext">Plaintext</option>
          </select>
        </div>

        <div>
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-[#19faff] to-[#11b0ff] rounded-xl text-black font-medium hover:shadow-[0_0_15px_rgba(25,250,255,0.4)] transition-all duration-300"
          >
            Generate Prompt
          </button>
        </div>
      </form>
    </div>;
};

export default PromptForm;