"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-800">{question}</h3>
        <span className="ml-4 flex-shrink-0 text-gray-500">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      
      <div 
        className={`mt-2 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: 'Is Sketchify free to use?',
      answer: 'Yes, Sketchify offers a free tier with essential features. We also offer premium plans with advanced capabilities for teams and professionals who need more power.'
    },
    {
      question: 'Do I need to install any software?',
      answer: 'No, Sketchify is a web-based application that runs in your browser. There\'s no need to download or install anything to get started.'
    },
    {
      question: 'Can I collaborate with others in real-time?',
      answer: 'Absolutely! Real-time collaboration is one of our core features. Simply share your drawing link, and others can join and work with you simultaneously.'
    },
    {
      question: 'How do I save my work?',
      answer: 'Your work is automatically saved as you draw. You can also manually save versions, export to various formats, or share a link that others can view or edit.'
    },
    {
      question: 'What file formats can I export my drawings to?',
      answer: 'Sketchify supports exporting to PNG, SVG, and PDF formats. Premium users can also export to additional formats like JPEG and high-resolution images.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security seriously. All your drawings are encrypted in transit and at rest. We also offer additional security features for team and enterprise plans.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Sketchify
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-700 mb-4">Still have questions?</p>
          <a 
            href="#" 
            className="inline-block px-6 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;