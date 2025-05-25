import React from 'react';
import { Share2, Users, PenTool, Layers, ArrowUpRight, Puzzle as PuzzlePiece, Palette, Lock } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="flex items-start">
        <div className="rounded-lg p-3 bg-blue-100 text-blue-600 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Powerful Features, Simple Interface</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to bring your ideas to life, without the complexity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<PenTool size={24} />}
            title="Intuitive Drawing Tools"
            description="Sketch, draw, and annotate with our easy-to-use pen tools, shapes, and text options."
          />
          
          <FeatureCard 
            icon={<Share2 size={24} />}
            title="One-Click Sharing"
            description="Share your creations instantly with teammates or clients via a simple link."
          />
          
          <FeatureCard 
            icon={<Users size={24} />}
            title="Real-Time Collaboration"
            description="Work together with your team in real-time, seeing changes as they happen."
          />
          
          <FeatureCard 
            icon={<Layers size={24} />}
            title="Infinite Canvas"
            description="Never run out of space with our unlimited, expandable drawing area."
          />
          
          <FeatureCard 
            icon={<PuzzlePiece size={24} />}
            title="Premade Templates"
            description="Get started quickly with dozens of ready-made templates for any purpose."
          />
          
          <FeatureCard 
            icon={<Palette size={24} />}
            title="Customizable Styles"
            description="Personalize your drawings with custom colors, fonts, and line styles."
          />
        </div>

        <div className="mt-16 text-center">
          <a href="#" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Explore all features <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;