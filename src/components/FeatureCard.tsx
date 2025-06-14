import React from 'react';
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description
}) => {
  return <div className="group relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 group-hover:border-[#19faff]/30 transition-all duration-300"></div>
      {/* Content */}
      <div className="relative">
        <div className="w-12 h-12 flex items-center justify-center mb-4 rounded-xl bg-[#0c0f15]/50">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </div>;
};
export default FeatureCard;