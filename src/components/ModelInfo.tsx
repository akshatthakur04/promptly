import React from 'react';
interface ModelInfoProps {
  model: {
    name: string;
    icon: string;
    specialty: string;
    tokenLimit: number;
  };
}
const ModelInfo: React.FC<ModelInfoProps> = ({
  model
}) => {
  return <div className="relative p-6 rounded-2xl h-full">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10"></div>
      {/* Content */}
      <div className="relative">
        <div className="w-16 h-16 flex items-center justify-center mb-4 text-3xl bg-[#19faff]/10 rounded-xl">
          {model.icon}
        </div>
        <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
        <p className="text-gray-300 mb-6">{model.specialty}</p>
        <div className="border-t border-white/10 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Token Limit</span>
            <span className="font-mono text-[#19faff]">
              {model.tokenLimit.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#19faff] to-[#11b0ff] rounded-full" style={{
            width: '70%'
          }}></div>
          </div>
          <div className="mt-1 text-xs text-gray-500 text-right">
            ~70% available
          </div>
        </div>
        <div className="mt-6 p-4 bg-[#19faff]/5 border border-[#19faff]/20 rounded-xl">
          <h4 className="text-sm font-medium text-[#19faff] mb-2">Pro Tip</h4>
          <p className="text-sm text-gray-300">
            This model excels at detailed instructions with clear examples.
            Include reference material when possible.
          </p>
        </div>
      </div>
    </div>;
};
export default ModelInfo;