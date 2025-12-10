'use client';

import { useState } from 'react';
import TourWidget from '../components/TourWidget';

export default function DemoPage() {
  const [resetKey, setResetKey] = useState(0);

  const resetTour = () => {
    // Clear any local storage if we were using it, or just force re-mount
    setResetKey(prev => prev + 1);
    // In a real scenario, we might need to clear cookies or local storage flags
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-sm"></div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">StrideCore Widget</h1>
        </div>
        <div className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
          Live Demo
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-12">
          {/* Mock Dashboard Header */}
          <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
             <div className="font-bold text-lg tracking-wide">SAMPLE DASHBOARD</div>
             <div className="flex gap-6 text-sm text-slate-300">
                <span className="hover:text-white cursor-pointer transition-colors">Home</span>
                <span className="hover:text-white cursor-pointer transition-colors">Projects</span>
                <span className="hover:text-white cursor-pointer transition-colors">Settings</span>
                <span className="hover:text-white cursor-pointer transition-colors">Help</span>
             </div>
          </div>

          {/* Mock Dashboard Content */}
          <div className="p-8 md:p-12 min-h-[400px] flex flex-col gap-8">
             <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-800">Welcome to your dashboard!</h2>
                <p className="text-gray-500">Here is an overview of your current activities and analytics.</p>
             </div>

             <div className="flex gap-4">
                <button 
                  data-tour="step-1"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium shadow-md hover:bg-blue-700 transition-colors"
                >
                  + New Project
                </button>
                <button 
                  data-tour="step-2"
                  className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors shadow-sm"
                >
                  View Analytics
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="h-32 bg-gray-50 rounded-xl border border-gray-100 p-4 flex flex-col justify-between">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                 </div>
               ))}
               <div data-tour="step-3" className="h-32 bg-green-50 rounded-xl border border-green-100 p-4 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-2 bg-green-100 rounded-bl-xl text-xs text-green-700 font-bold">New</div>
                 <div className="w-10 h-10 bg-green-200 rounded-lg"></div>
                 <div className="h-4 bg-green-200 rounded w-2/3"></div>
               </div>
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="text-center space-y-8">
           <div className="flex justify-center gap-4">
             <button 
                onClick={resetTour}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95 shadow-lg"
             >
               Restart Demo Tour
             </button>
           </div>

           <div className="max-w-2xl mx-auto bg-gray-100 rounded-lg p-6 text-left font-mono text-sm border border-gray-200">
              <div className="text-gray-500 mb-2 select-none">// Installation</div>
              <div className="text-blue-600">
                &lt;script src=&quot;https://stridecore.vercel.app/embed.js&quot; data-tour-id=&quot;YOUR_TOUR_ID&quot;&gt;&lt;/script&gt;
              </div>
           </div>
        </div>
      </main>

      {/* The Widget - Remounts when key changes to restart */}
      <TourWidget key={resetKey} tourId="abc123" />
    </div>
  );
}
