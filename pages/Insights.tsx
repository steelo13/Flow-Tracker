import React from 'react';
import { INSIGHTS } from '../constants';
import { PlayCircle } from 'lucide-react';

const Insights = () => {
  return (
    <div className="bg-gray-50 h-full pb-24 overflow-y-auto no-scrollbar">
      <div className="bg-white sticky top-0 z-10 p-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Insights Library</h1>
        <div className="flex space-x-2 mt-4 overflow-x-auto no-scrollbar">
           {['For You', 'Reproductive Health', 'Sex & Relationships', 'Pregnancy'].map((cat, i) => (
             <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${i === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
               {cat}
             </button>
           ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Featured Course */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
           <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&h=600&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />
           <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
              <span className="text-white text-xs font-bold uppercase tracking-wider mb-2 bg-rose-500 w-fit px-2 py-1 rounded">Course</span>
              <h2 className="text-white text-2xl font-bold mb-1">Mastering your Cycle</h2>
              <div className="flex items-center text-white/90 text-sm space-x-2">
                 <PlayCircle size={16} />
                 <span>5 Lessons • 25 min</span>
              </div>
           </div>
        </div>

        {/* Article Grid */}
        <h3 className="font-bold text-lg text-gray-800 pt-2">Recommended for you</h3>
        <div className="grid grid-cols-1 gap-4">
           {INSIGHTS.map(article => (
             <div key={article.id} className="flex bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
               <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-xl overflow-hidden">
                  <img src={article.imageUrl} className="w-full h-full object-cover" />
               </div>
               <div className="ml-4 flex flex-col justify-center">
                  <span className="text-xs text-purple-600 font-bold uppercase mb-1">{article.category}</span>
                  <h4 className="font-bold text-gray-800 leading-tight mb-2">{article.title}</h4>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;