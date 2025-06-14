import React from 'react';
import { Link } from 'react-router-dom';
interface ModelProps {
  id: string;
  name: string;
  tagline: string;
  contextLength: string;
  useCases: string[];
}
interface ModelCardProps {
  model: ModelProps;
  isActive: boolean;
}
const ModelCard: React.FC<ModelCardProps> = ({
  model,
  isActive
}) => {
  return <div className={`
        relative p-6 rounded-2xl transition-all duration-300
        ${isActive ? 'scale-[1.02] shadow-lg' : 'scale-100 opacity-70'}
      `}>
      {/* Glass background */}
      <div className={`
        absolute inset-0 rounded-2xl backdrop-blur-md border
        ${isActive ? 'bg-white/8 border-[#19faff] shadow-[0_0_15px_rgba(25,250,255,0.2)]' : 'bg-white/5 border-white/10'}
      `}></div>
      {/* Content */}
      <div className="relative">
        <div className="mb-4">
          <div className="inline-block px-3 py-1 bg-[#19faff]/10 rounded-full text-xs font-medium text-[#19faff]">
            {model.contextLength} context
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
        <p className="text-gray-300 mb-4">{model.tagline}</p>
        <div className="flex space-x-2 mb-6">
          {model.useCases.map((useCase, index) => <div key={index} className="text-xl">
              {useCase}
            </div>)}
        </div>
        <Link to={`/build/${model.id}`}>
          <button className="w-full py-3 bg-gradient-to-r from-[#19faff] to-[#11b0ff] rounded-xl text-black font-medium hover:shadow-[0_0_15px_rgba(25,250,255,0.4)] transition-all duration-300">
            Use This Model
          </button>
        </Link>
      </div>
    </div>;
};
export default ModelCard;