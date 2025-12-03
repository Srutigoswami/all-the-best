import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-3xl text-center">
          <div className="inline-block bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-1 rounded-full text-sm font-medium mb-6">AI-Powered Bug Tracking</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
            Intelligent bug tracking for <span className="text-blue-700 dark:text-blue-400">modern teams</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Track, analyze, and resolve bugs faster with AI-powered predictions.<br />
            Get instant severity assessments, resolution time estimates, and actionable insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => navigate('/report')}
              className="bg-gray-900 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition cursor-pointer"
            >
              Start Tracking Bugs
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:border-blue-700 dark:hover:border-blue-500 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold shadow transition cursor-pointer"
            >
              View Demo
            </button>
          </div>
        <div className="flex justify-center items-center relative mt-8">
          {/* Illustration */}
          <div className="relative w-80 h-56 flex items-center justify-center">
            <div className="absolute left-4 top-4 text-yellow-400 text-2xl">☀️</div>
            <div className="absolute right-4 top-8 text-red-400 text-2xl">🐞</div>
            <div className="absolute right-0 bottom-8 text-orange-300 text-2xl">🌞</div>
            <div className="bg-gray-100 rounded-xl shadow-lg w-56 h-40 flex flex-col items-center justify-center">
              <div className="text-5xl text-gray-700 mb-2">🤖</div>
              <div className="bg-blue-700 text-white px-2 py-1 rounded text-xs font-bold mb-2">AI</div>
              <div className="flex gap-2">
                <span className="bg-gray-200 px-2 py-1 rounded text-xs">...</span>
                <span className="bg-gray-200 px-2 py-1 rounded text-xs">...</span>
              </div>
            </div>
            <div className="absolute left-0 bottom-0 text-gray-400 text-4xl">🧑</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
