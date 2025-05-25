import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-blue-100">
            Join thousands of creators and teams who use Sketchify every day.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-4 rounded-lg bg-white text-blue-600 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Start Drawing Now
            </button>
            <button className="px-8 py-4 rounded-lg border-2 border-white text-white font-semibold text-lg hover:bg-white/10 transition-colors">
              See Pricing
            </button>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="px-6 py-3 bg-blue-700 bg-opacity-30 rounded-full flex items-center">
              <span className="text-blue-100">No credit card required</span>
              <span className="mx-3 text-blue-300">•</span>
              <a href="#" className="flex items-center text-white font-medium hover:underline">
                Take a tour <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;