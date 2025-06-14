import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';
interface PromptOutputProps {
  prompt: string;
  isGenerating: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
}
const PromptOutput: React.FC<PromptOutputProps> = ({
  prompt,
  isGenerating,
  onCopy,
  onRegenerate
}) => {
  return <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">AI-Generated Content</h3>
        <div className="flex space-x-2">
          <button onClick={onRegenerate} className="p-2 rounded-lg border border-white/10 hover:border-[#19faff]/30 transition-colors">
            <RefreshCw size={18} className={isGenerating ? 'animate-spin text-[#19faff]' : ''} />
          </button>
          <button onClick={onCopy} className="p-2 rounded-lg border border-white/10 hover:border-[#19faff]/30 transition-colors">
            <Copy size={18} />
          </button>
        </div>
      </div>
      <div className="relative p-4 rounded-xl">
        {/* Glass background */}
        <div className="absolute inset-0 bg-[#0c0f15]/80 rounded-xl backdrop-blur-md border border-white/10"></div>
        {/* Content */}
        <div className="relative">
          {isGenerating ? <div className="font-mono text-gray-400 min-h-[200px] flex items-center justify-center">
              <div className="typing-animation">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div> : <pre className="font-mono text-gray-300 whitespace-pre-wrap break-words p-2">
              {prompt}
            </pre>}
        </div>
      </div>
      <style>{`
        .typing-animation {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 0 4px;
          border-radius: 50%;
          background-color: #19faff;
          animation: typing 1.4s infinite ease-in-out both;
        }
        .dot:nth-child(1) {
          animation-delay: -0.32s;
        }
        .dot:nth-child(2) {
          animation-delay: -0.16s;
        }
        @keyframes typing {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>;
};
export default PromptOutput;