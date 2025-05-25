"use client"
import React, { useEffect, useRef } from 'react';
import { MousePointer, Pencil, Scissors, Image, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Only create effect when mouse is over the canvas
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        const ripple = document.createElement('div');
        ripple.className = 'absolute w-1 h-1 bg-blue-500 rounded-full opacity-70';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.transform = 'scale(0)';
        
        canvasRef.current.appendChild(ripple);
        
        // Animate the ripple
        ripple.animate(
          [
            { transform: 'scale(0)', opacity: '0.7' },
            { transform: 'scale(40)', opacity: '0' }
          ],
          {
            duration: 1000,
            easing: 'ease-out'
          }
        ).onfinish = () => ripple.remove();
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
              Visualize Your Ideas with
              <span className="text-blue-500 block mt-2">Effortless Drawing</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Create beautiful diagrams, wireframes, and illustrations with our intuitive whiteboard tool. No design skills required.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300">
                Start Drawing Now
              </button>
              <button className="px-8 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold text-lg transition-all">
                Watch Demo
              </button>
            </div>
            <div className="flex items-center mt-8 text-gray-500">
              <span className="text-sm">No sign-up required • Free to use</span>
              
            </div>
            {/* signin signup button */}
            <Link href={"/signin"}>
            <button className='bg-red-600 rounded p-2 px-3 py-2 mt-2'>Signin</button>
            </Link>
            <Link href={"/signup"}>
             <button className='bg-red-600 rounded p-2 px-3 py-2 mt-2 ml-2'>Signup</button>
            </Link>
            
          </div>
          
          {/* Right side - Interactive Canvas */}
          <div className="w-full md:w-1/2 mt-12 md:mt-0">
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="h-8 bg-gray-100 flex items-center px-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div 
                ref={canvasRef}
                className="relative h-[320px] md:h-[380px] p-4 bg-blue-50 overflow-hidden"
              >
                {/* Tool palette */}
                <div className="absolute left-4 top-4 bg-white rounded-lg shadow-md p-2">
                  <div className="flex flex-col space-y-3">
                    <button className="p-2 rounded hover:bg-blue-100 text-blue-600">
                      <MousePointer size={20} />
                    </button>
                    <button className="p-2 rounded bg-blue-100 text-blue-600">
                      <Pencil size={20} />
                    </button>
                    <button className="p-2 rounded hover:bg-blue-100 text-gray-600">
                      <Scissors size={20} />
                    </button>
                    <button className="p-2 rounded hover:bg-blue-100 text-gray-600">
                      <Image size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Sample drawings (simplified) */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 opacity-70">
                  {/* Simple box with text */}
                  <div className="absolute top-10 left-24 w-40 h-28 border-2 border-blue-500 rounded-lg bg-white shadow-sm flex items-center justify-center rotate-6">
                    <span className="text-lg text-gray-700 font-medium">Your Ideas</span>
                  </div>
                  
                  {/* Arrow */}
                  <div className="absolute top-28 left-10 w-32 h-8 border-b-2 border-r-2 border-purple-500 transform -rotate-12"></div>
                  
                  {/* Circle */}
                  <div className="absolute top-36 left-6 w-24 h-24 border-2 border-coral-500 rounded-full bg-white/50 flex items-center justify-center -rotate-6">
                    <span className="text-sm text-gray-700">Made Easy</span>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="absolute right-4 bottom-4 flex space-x-2">
                  <button className="p-2 bg-white rounded-lg shadow-sm text-gray-600 hover:text-blue-600">
                    <Download size={20} />
                  </button>
                  <button className="p-2 bg-white rounded-lg shadow-sm text-gray-600 hover:text-blue-600">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;