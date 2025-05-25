"use client"
import React, { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';

interface DemoTabProps {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const DemoTab: React.FC<DemoTabProps> = ({ id, title, isActive, onClick }) => {
  return (
    <button
      id={id}
      className={`px-4 py-3 text-left transition-colors ${
        isActive 
          ? 'bg-white shadow-sm rounded-lg font-medium text-blue-600' 
          : 'text-gray-600 hover:text-gray-800'
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const Demo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('wireframing');
  
  const demos = [
    {
      id: 'wireframing',
      title: 'Wireframing',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: 'Create low-fidelity wireframes to quickly visualize your UI concepts',
    },
    {
      id: 'diagramming',
      title: 'Diagramming',
      image: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: 'Build flowcharts, mind maps, and process diagrams with ease',
    },
    {
      id: 'brainstorming',
      title: 'Brainstorming',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: 'Collaborate in real-time with your team to generate and organize ideas',
    },
    {
      id: 'presentations',
      title: 'Presentations',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: 'Create engaging visual presentations that captivate your audience',
    }
  ];
  
  const activeDemoContent = demos.find(demo => demo.id === activeTab);

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">See It In Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Sketchify can transform your creative process
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs navigation */}
          <div className="w-full lg:w-1/4">
            <div className="bg-gray-100 p-4 rounded-xl flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
              {demos.map(demo => (
                <DemoTab 
                  key={demo.id}
                  id={demo.id}
                  title={demo.title}
                  isActive={activeTab === demo.id}
                  onClick={() => setActiveTab(demo.id)}
                />
              ))}
            </div>
          </div>
          
          {/* Demo content */}
          {activeDemoContent && (
            <div className="w-full lg:w-3/4">
              <div className="bg-gray-100 rounded-xl overflow-hidden">
                <div className="relative aspect-video overflow-hidden group">
                  <img 
                    src={activeDemoContent.image} 
                    alt={activeDemoContent.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="flex items-center justify-center w-16 h-16 rounded-full bg-white text-blue-600 shadow-lg hover:bg-blue-50 transition-colors">
                      <Play size={24} fill="currentColor" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {activeDemoContent.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {activeDemoContent.description}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                  >
                    Learn more <ArrowRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Demo;