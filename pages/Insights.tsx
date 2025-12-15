
import React, { useState } from 'react';
import { INSIGHTS } from '../constants';
import { PlayCircle, Sparkles, Send, Loader, Search, Info, ArrowLeft, Clock } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { UserSettings, InsightArticle } from '../types';

interface InsightsProps {
  userSettings: UserSettings;
}

const Insights: React.FC<InsightsProps> = ({ userSettings }) => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  const handleAskAI = async () => {
    if (!query.trim()) return;
    setIsThinking(true);
    setAiResponse(null);

    try {
        if (!process.env.API_KEY) {
            setAiResponse("I can't connect to the AI right now. Please check your configuration.");
            setIsThinking(false);
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `You are a helpful, empathetic women's health assistant for an app called FlowTracker. 
        The user's name is ${userSettings.name}.
        Cycle Length: ${userSettings.cycleLength} days.
        Period Length: ${userSettings.periodLength} days.
        Provide concise, supportive answers. 
        IMPORTANT: Always include a disclaimer that you are an AI and this is not medical advice.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: query,
            config: {
                systemInstruction: systemInstruction,
            }
        });

        if (response.text) {
            setAiResponse(response.text);
        }
    } catch (error) {
        console.error("AI Error", error);
        setAiResponse("Sorry, I'm having trouble thinking right now. Please try again later.");
    } finally {
        setIsThinking(false);
    }
  };

  // DETAIL VIEW
  if (selectedArticle) {
    return (
      <div className="bg-white h-full pb-24 overflow-y-auto animate-fade-in">
        <div className="relative h-64">
           <img src={selectedArticle.imageUrl} className="w-full h-full object-cover" alt={selectedArticle.title} />
           <div className="absolute top-4 left-4">
             <button 
               onClick={() => setSelectedArticle(null)}
               className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
             >
               <ArrowLeft size={24} />
             </button>
           </div>
           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent pointer-events-none"></div>
           <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-block bg-rose-500 text-xs font-bold px-2 py-1 rounded mb-2 uppercase tracking-wide">
                {selectedArticle.category}
              </span>
              <h1 className="text-2xl font-bold leading-tight mb-2">{selectedArticle.title}</h1>
              <div className="flex items-center text-xs font-medium text-white/90">
                 <Clock size={14} className="mr-1" />
                 <span>{selectedArticle.readTime}</span>
              </div>
           </div>
        </div>
        
        <div className="p-6">
           <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed">
             {selectedArticle.content.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
             ))}
           </div>
           
           <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400">Written by FlowTracker Medical Team</span>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="text-purple-600 font-bold text-sm hover:underline"
              >
                Back to Library
              </button>
           </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div className="bg-gray-50 h-full pb-24 overflow-y-auto">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 pt-4 pb-4 shadow-sm px-4">
        <h1 className="text-2xl font-bold text-gray-900">Insights Library</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Ask AI Section */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg">
           <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="text-yellow-300" size={20} />
              <h2 className="font-bold text-lg">Ask Flo AI</h2>
           </div>
           
           {!aiResponse && !isThinking ? (
               <>
                <p className="text-purple-100 text-sm mb-4">
                    Have a question about your cycle, symptoms, or health? Ask me anything!
                </p>
                <div className="relative">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., Is spotting normal during ovulation?"
                        className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 pr-12 text-white placeholder-purple-200 focus:outline-none focus:bg-white/30 transition-colors"
                        onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                    />
                    <button 
                        onClick={handleAskAI}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                        <Send size={16} />
                    </button>
                </div>
               </>
           ) : (
               <div className="animate-fade-in">
                   {isThinking ? (
                       <div className="flex flex-col items-center justify-center py-6">
                           <Loader className="animate-spin mb-2 text-white" />
                           <span className="text-purple-200 text-sm">Analyzing health data...</span>
                       </div>
                   ) : (
                       <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                           <div className="flex justify-between items-start mb-2">
                               <h3 className="font-bold text-sm">Answer</h3>
                               <button onClick={() => { setAiResponse(null); setQuery(''); }} className="text-xs text-purple-200 hover:text-white underline">Ask another</button>
                           </div>
                           <p className="text-sm leading-relaxed text-purple-50 mb-3 whitespace-pre-wrap">
                               {aiResponse}
                           </p>
                           <div className="flex items-start space-x-1.5 bg-black/20 p-2 rounded text-[10px] text-purple-200">
                               <Info size={12} className="mt-0.5 flex-shrink-0" />
                               <span>This is AI-generated for informational purposes. Consult a doctor for medical advice.</span>
                           </div>
                       </div>
                   )}
               </div>
           )}
        </div>

        {/* Featured Course */}
        <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-transform hover:scale-[1.01]">
            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&h=600&q=80" className="absolute inset-0 w-full h-full object-cover" alt="Yoga" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <span className="text-white text-xs font-bold uppercase tracking-wider mb-2 bg-rose-500 w-fit px-2 py-1 rounded">Course</span>
                <h2 className="text-white text-2xl font-bold mb-1">Mastering your Cycle</h2>
                <div className="flex items-center text-white/90 text-sm space-x-2">
                    <PlayCircle size={16} />
                    <span>5 Lessons • 25 min</span>
                </div>
            </div>
        </div>

        {/* Article Grid */}
        <div>
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg text-gray-800">Latest Articles</h3>
                <Search size={18} className="text-gray-400" />
            </div>
            
            {INSIGHTS.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                {INSIGHTS.map(article => (
                    <div 
                        key={article.id} 
                        onClick={() => setSelectedArticle(article)}
                        className="flex bg-white p-3 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                    >
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-xl overflow-hidden">
                        <img src={article.imageUrl} className="w-full h-full object-cover" alt={article.title} />
                    </div>
                    <div className="ml-4 flex flex-col justify-center">
                        <span className="text-xs text-purple-600 font-bold uppercase mb-1">{article.category}</span>
                        <h4 className="font-bold text-gray-800 leading-tight mb-2 line-clamp-2">{article.title}</h4>
                        <span className="text-xs text-gray-400">{article.readTime}</span>
                    </div>
                    </div>
                ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-400 text-sm">No articles found.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Insights;
