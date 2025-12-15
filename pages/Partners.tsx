import React, { useState, useEffect, useRef } from 'react';
import { UserSettings, DailyLog } from '../types';
import { Heart, MessageCircle, CheckCircle, Sparkles, Loader, Camera } from 'lucide-react';
import { getCycleDay, getCyclePhase } from '../services/cycleService';
import { getDailyLog } from '../services/db';
import { GoogleGenAI } from "@google/genai";

interface PartnersProps {
  userSettings: UserSettings;
}

const Partners: React.FC<PartnersProps> = ({ userSettings }) => {
  const [cycleDay, setCycleDay] = useState(1);
  const [phase, setPhase] = useState<string>('');
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  
  // Photo State
  const [herPhoto, setHerPhoto] = useState<string>("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80");
  const [hisPhoto, setHisPhoto] = useState<string>("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80");
  const herInputRef = useRef<HTMLInputElement>(null);
  const hisInputRef = useRef<HTMLInputElement>(null);
  
  // AI State
  const [aiTip, setAiTip] = useState<string>("Loading personalized starter...");
  const [isAiLoading, setIsAiLoading] = useState(true);

  // Checklist State
  const [checklist, setChecklist] = useState<{id: number, text: string, done: boolean}[]>([]);

  useEffect(() => {
    // 0. Load Photos
    const storedHer = localStorage.getItem('partner_her_photo');
    if (storedHer) setHerPhoto(storedHer);
    const storedHis = localStorage.getItem('partner_his_photo');
    if (storedHis) setHisPhoto(storedHis);

    // 1. Calculate Cycle Data
    const today = new Date();
    const day = getCycleDay(userSettings, today);
    const p = getCyclePhase(day, userSettings.cycleLength, userSettings.periodLength);
    
    setCycleDay(day);
    setPhase(p);

    // 2. Fetch Daily Log
    const fetchLog = async () => {
        try {
            const log = await getDailyLog(today.toISOString());
            setDailyLog(log);
        } catch (e) {
            console.error("Error fetching log", e);
        }
    };
    fetchLog();

    // 3. Set Checklist based on Phase
    const getChecklistItems = (phaseName: string) => {
        switch(phaseName) {
            case 'menstruation':
                return [
                    { id: 1, text: "Bring a heating pad or hot tea", done: false },
                    { id: 2, text: "Handle dinner responsibilities", done: false },
                    { id: 3, text: "Offer a gentle massage", done: false }
                ];
            case 'follicular':
                return [
                    { id: 1, text: "Plan a fun activity together", done: false },
                    { id: 2, text: "Compliment her energy", done: false },
                    { id: 3, text: "Go for a walk outdoors", done: false }
                ];
            case 'ovulation':
                return [
                    { id: 1, text: "Plan a romantic date night", done: false },
                    { id: 2, text: "Dress up for dinner", done: false },
                    { id: 3, text: "Have a deep conversation", done: false }
                ];
            case 'luteal':
                return [
                    { id: 1, text: "Be patient and listening", done: false },
                    { id: 2, text: "Stock up on favorite snacks", done: false },
                    { id: 3, text: "Encourage extra rest", done: false }
                ];
            default:
                return [
                    { id: 1, text: "Ask how she is feeling", done: false },
                    { id: 2, text: "Give a long hug", done: false },
                    { id: 3, text: "Tell her you appreciate her", done: false }
                ];
        }
    };
    setChecklist(getChecklistItems(p));

    // 4. AI Generation
    const generateAiTip = async (phaseName: string) => {
        setIsAiLoading(true);
        try {
            // Check if API key exists (in a real app environment)
            if (!process.env.API_KEY) {
                setAiTip("How can I support you best today?");
                setIsAiLoading(false);
                return;
            }

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Generate a single, short, supportive, and romantic conversation starter question for a partner to ask their significant other who is in the '${phaseName}' phase of their menstrual cycle. Keep it under 20 words. No quotes.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            
            if (response.text) {
                setAiTip(response.text.trim());
            } else {
                setAiTip("How can I make your day better?");
            }
        } catch (error) {
            console.error("AI Error:", error);
            setAiTip("How are you feeling physically and emotionally today?");
        } finally {
            setIsAiLoading(false);
        }
    };

    generateAiTip(p);

  }, [userSettings]); // Re-run if settings change

  const toggleCheckItem = (id: number) => {
    setChecklist(prev => prev.map(item => 
        item.id === id ? { ...item, done: !item.done } : item
    ));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'her' | 'his') => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result as string;
            if (type === 'her') {
                setHerPhoto(result);
                localStorage.setItem('partner_her_photo', result);
            } else {
                setHisPhoto(result);
                localStorage.setItem('partner_his_photo', result);
            }
        };
        reader.readAsDataURL(file);
    }
  };

  const getPhaseLabel = (p: string) => {
      if (p === 'menstruation') return 'Period';
      return p.charAt(0).toUpperCase() + p.slice(1);
  };

  return (
    <div className="flex flex-col h-full bg-purple-50 pb-24 overflow-y-auto">
       {/* Header */}
       <div className="bg-white p-6 rounded-b-3xl shadow-sm mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-rose-100 p-2 rounded-full">
              <Heart className="text-rose-500" size={24} fill="currentColor" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Flo for Partners</h1>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sharing your cycle helps your partner understand your moods and symptoms. Maximize your connection today.
          </p>
       </div>

       {/* Main Interaction Card */}
       <div className="px-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
             <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
               <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Today's Sync</span>
               <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded">Connected</span>
             </div>
             
             <div className="flex space-x-4">
                {/* Her Section */}
                <div className="flex-1 flex flex-col items-center">
                   <div 
                        className="relative group cursor-pointer" 
                        onClick={() => herInputRef.current?.click()}
                        title="Change photo"
                    >
                       <input 
                            type="file" 
                            ref={herInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, 'her')}
                       />
                       <img 
                         src={herPhoto} 
                         className="w-16 h-16 rounded-full border-4 border-rose-100 mb-2 object-cover transition-opacity group-hover:opacity-80" 
                         alt="Her" 
                       />
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Camera size={20} className="text-gray-600 bg-white/90 p-1 rounded-full shadow-sm" />
                       </div>
                       <div className="absolute bottom-2 right-0 bg-rose-500 w-4 h-4 rounded-full border-2 border-white"></div>
                   </div>
                   <p className="text-center font-bold text-gray-800">Her Day</p>
                   <p className="text-center text-xs text-gray-500">Day {cycleDay} • {getPhaseLabel(phase)}</p>
                   <div className="mt-2 text-center min-h-[24px]">
                     {dailyLog?.symptoms && dailyLog.symptoms.length > 0 ? (
                        <span className="inline-block bg-rose-50 text-rose-600 text-xs px-2 py-1 rounded font-medium truncate max-w-[90px]">
                            {dailyLog.symptoms[0]} {dailyLog.symptoms.length > 1 ? `+${dailyLog.symptoms.length - 1}` : ''}
                        </span>
                     ) : (
                        <span className="inline-block bg-gray-50 text-gray-400 text-[10px] px-2 py-1 rounded">No logs yet</span>
                     )}
                   </div>
                </div>
                
                <div className="flex items-center justify-center">
                   <div className="w-px h-24 bg-gray-200"></div>
                </div>

                {/* Him Section */}
                <div className="flex-1 flex flex-col items-center">
                   <div 
                        className="relative group cursor-pointer" 
                        onClick={() => hisInputRef.current?.click()}
                        title="Change photo"
                    >
                       <input 
                            type="file" 
                            ref={hisInputRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handlePhotoUpload(e, 'his')}
                       />
                       <img 
                         src={hisPhoto} 
                         className="w-16 h-16 rounded-full border-4 border-blue-100 mb-2 object-cover transition-opacity group-hover:opacity-80" 
                         alt="Him" 
                       />
                       <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Camera size={20} className="text-gray-600 bg-white/90 p-1 rounded-full shadow-sm" />
                       </div>
                   </div>
                   <p className="text-center font-bold text-gray-800">His Role</p>
                   <p className="text-center text-xs text-gray-500">Supportive</p>
                   <div className="mt-2 text-center">
                     <span className="inline-block bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded font-medium">Check Plan</span>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* AI Daily Conversation Starter */}
       <div className="px-4 mb-6">
         <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-2xl shadow-sm flex items-start space-x-4 border border-orange-100">
            <div className="bg-orange-100 p-2 rounded-full flex-shrink-0 mt-1">
               <Sparkles size={20} className="text-orange-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-gray-800 text-sm">AI Conversation Starter</h4>
                  <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded font-bold">Gemini</span>
              </div>
              
              <div className="min-h-[40px] flex items-center">
                 {isAiLoading ? (
                    <div className="flex items-center space-x-2 text-gray-400 text-xs italic">
                        <Loader size={12} className="animate-spin" />
                        <span>Generating tailored question...</span>
                    </div>
                 ) : (
                    <p className="text-sm text-gray-700 italic">"{aiTip}"</p>
                 )}
              </div>
            </div>
         </div>
       </div>

       {/* Partner's Action Plan */}
       <div className="px-4">
         <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <CheckCircle className="text-teal-500" size={20} />
                    <h3 className="font-bold text-gray-800">Partner's Action Plan</h3>
                </div>
                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full uppercase">{getPhaseLabel(phase)} Mode</span>
            </div>
            
            <div className="space-y-3">
                {checklist.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => toggleCheckItem(item.id)}
                        className={`w-full flex items-center p-3 rounded-xl border transition-all duration-200 ${item.done ? 'bg-teal-50 border-teal-200' : 'bg-gray-50 border-transparent hover:bg-gray-100'}`}
                    >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-colors ${item.done ? 'bg-teal-500 border-teal-500' : 'border-gray-300 bg-white'}`}>
                            {item.done && <CheckCircle size={12} className="text-white" strokeWidth={3} />}
                        </div>
                        <span className={`text-sm font-medium ${item.done ? 'text-teal-800 line-through decoration-teal-300' : 'text-gray-700'}`}>
                            {item.text}
                        </span>
                    </button>
                ))}
            </div>
            
            <p className="text-center text-[10px] text-gray-400 mt-4">
                Items update automatically based on cycle phase
            </p>
         </div>
       </div>
    </div>
  );
};

export default Partners;