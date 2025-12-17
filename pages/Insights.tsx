
import React, { useState } from 'react';
import { INSIGHTS, MASTERING_CYCLE_COURSE } from '../constants';
import { PlayCircle, Sparkles, Send, Loader, Search, Info, ArrowLeft, Clock, ChevronRight, Check, Lock, Star } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { UserSettings, InsightArticle, Course, Lesson } from '../types';
import PaymentModal from '../components/PaymentModal';

interface InsightsProps {
  userSettings: UserSettings;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
}

const Insights: React.FC<InsightsProps> = ({ userSettings, onUpdateSettings }) => {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Payment State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentConfig, setPaymentConfig] = useState<{
      title: string;
      price: string;
      description: string;
      type: 'subscription' | 'one-time';
      onSuccess: () => void;
  } | null>(null);

  const handleAskAI = async () => {
    // Premium Check
    if (!userSettings.isPremium) {
        setPaymentConfig({
            title: "Unlock Flo AI",
            price: "£9.99",
            description: "Get unlimited personalized health answers, cycle analysis, and wellness tips tailored to your unique body.",
            type: 'subscription',
            onSuccess: () => onUpdateSettings({ isPremium: true })
        });
        setPaymentModalOpen(true);
        return;
    }

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

  const handleCourseClick = (course: Course) => {
      const isPurchased = (userSettings.purchasedCourses || []).includes(course.id);
      
      if (!isPurchased) {
          setPaymentConfig({
            title: "Mastering Your Cycle",
            price: "£29.99",
            description: "Unlock lifetime access to this expert-led course. Learn to harness your 4 phases for better productivity, fitness, and health.",
            type: 'one-time',
            onSuccess: () => {
                const currentPurchases = userSettings.purchasedCourses || [];
                onUpdateSettings({ purchasedCourses: [...currentPurchases, course.id] });
                // Automatically open course after purchase success
                setTimeout(() => setSelectedCourse(course), 500); 
            }
          });
          setPaymentModalOpen(true);
      } else {
          setSelectedCourse(course);
      }
  };

  const handleCompleteLesson = (lessonId: string) => {
    const completed = userSettings.completedLessons || [];
    if (!completed.includes(lessonId)) {
        onUpdateSettings({
            completedLessons: [...completed, lessonId]
        });
    }
    setSelectedLesson(null); 
  };

  // LESSON VIEW
  if (selectedLesson && selectedCourse) {
    const isCompleted = (userSettings.completedLessons || []).includes(selectedLesson.id);

    return (
        <div className="bg-white h-full pb-24 overflow-y-auto animate-fade-in">
           <div className="bg-purple-600 text-white p-6 sticky top-0 z-20">
               <button 
                onClick={() => setSelectedLesson(null)}
                className="flex items-center text-purple-100 hover:text-white mb-4"
               >
                   <ArrowLeft size={20} className="mr-2" />
                   <span className="text-sm font-bold">Back to Course</span>
               </button>
               <h1 className="text-xl font-bold leading-tight">{selectedLesson.title}</h1>
               <div className="flex items-center text-xs text-purple-200 mt-2">
                   <Clock size={12} className="mr-1" />
                   <span>{selectedLesson.duration}</span>
                   {isCompleted && (
                       <span className="ml-3 bg-green-500/20 text-green-100 text-[10px] font-bold px-2 py-0.5 rounded flex items-center">
                           <Check size={10} className="mr-1" /> Completed
                       </span>
                   )}
               </div>
           </div>
           
           <div className="p-6">
                <div className="prose prose-purple max-w-none text-gray-700 leading-relaxed">
                    {selectedLesson.content.split('\n').map((paragraph, index) => (
                        paragraph.trim() && (
                            <p key={index} className="mb-4 text-base">
                                {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split(/(<strong>.*?<\/strong>)/).map((part, i) => 
                                    part.startsWith('<strong>') ? <strong key={i}>{part.replace(/<\/?strong>/g, '')}</strong> : part
                                )}
                            </p>
                        )
                    ))}
                </div>
                
                <div className="mt-8">
                    <button 
                        onClick={() => handleCompleteLesson(selectedLesson.id)} 
                        disabled={isCompleted}
                        className={`w-full py-3 rounded-xl font-bold transition-all ${
                            isCompleted 
                            ? 'bg-green-100 text-green-700 cursor-default'
                            : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-200'
                        }`}
                    >
                        {isCompleted ? (
                            <span className="flex items-center justify-center">
                                <Check size={18} className="mr-2" /> Lesson Completed
                            </span>
                        ) : 'Mark as Complete'}
                    </button>
                </div>
           </div>
        </div>
    );
  }

  // COURSE OVERVIEW
  if (selectedCourse) {
      const completedCount = selectedCourse.lessons.filter(l => (userSettings.completedLessons || []).includes(l.id)).length;
      const totalLessons = selectedCourse.lessons.length;
      const progress = Math.round((completedCount / totalLessons) * 100);

      return (
          <div className="bg-white h-full pb-24 overflow-y-auto animate-fade-in">
              <div className="relative h-64">
                  <img src={selectedCourse.imageUrl} className="w-full h-full object-cover" alt={selectedCourse.title} />
                  <div className="absolute top-4 left-4">
                      <button 
                          onClick={() => setSelectedCourse(null)}
                          className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors"
                      >
                          <ArrowLeft size={24} />
                      </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="inline-block bg-teal-500 text-xs font-bold px-2 py-1 rounded mb-2 uppercase tracking-wide">
                          Course
                      </span>
                      <h1 className="text-3xl font-bold leading-tight mb-2">{selectedCourse.title}</h1>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs font-medium text-white/80">
                            <span>By {selectedCourse.author}</span>
                        </div>
                        <span className="text-xs font-bold bg-black/30 px-2 py-1 rounded border border-white/20">
                            {progress}% Complete
                        </span>
                      </div>
                  </div>
              </div>
              
              <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">Course Curriculum</h3>
                  <div className="space-y-4">
                      {selectedCourse.lessons.map((lesson, index) => {
                          const isCompleted = (userSettings.completedLessons || []).includes(lesson.id);
                          return (
                            <div 
                                key={lesson.id}
                                onClick={() => setSelectedLesson(lesson)} 
                                className={`flex items-center p-4 rounded-2xl border transition-all cursor-pointer group ${
                                    isCompleted 
                                    ? 'bg-green-50 border-green-100' 
                                    : 'bg-gray-50 border-gray-100 hover:bg-purple-50 hover:border-purple-100'
                                }`}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold border transition-colors ${
                                    isCompleted
                                    ? 'bg-green-500 text-white border-green-500'
                                    : 'bg-white text-gray-400 border-gray-200 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600'
                                }`}>
                                    {isCompleted ? <Check size={18} /> : index + 1}
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className={`font-bold group-hover:text-purple-700 ${isCompleted ? 'text-gray-600' : 'text-gray-800'}`}>
                                        {lesson.title}
                                    </h4>
                                    <div className="flex items-center text-xs text-gray-400 mt-1">
                                        <PlayCircle size={12} className="mr-1" />
                                        <span>{lesson.duration}</span>
                                    </div>
                                </div>
                                <div className="text-gray-300 group-hover:text-purple-400">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      );
  }

  // ARTICLE DETAIL VIEW
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
      <PaymentModal 
         isOpen={paymentModalOpen}
         onClose={() => setPaymentModalOpen(false)}
         title={paymentConfig?.title || ''}
         price={paymentConfig?.price || ''}
         description={paymentConfig?.description || ''}
         type={paymentConfig?.type || 'one-time'}
         onSuccess={paymentConfig?.onSuccess || (() => {})}
      />

      {/* Header */}
      <div className="bg-white sticky top-0 z-10 pt-4 pb-4 shadow-sm px-4">
        <h1 className="text-2xl font-bold text-gray-900">Insights Library</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Ask AI Section */}
        <div className={`relative bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg overflow-hidden ${!userSettings.isPremium ? 'cursor-pointer' : ''}`} onClick={!userSettings.isPremium ? handleAskAI : undefined}>
           
           {/* Background Deco */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>

           <div className="flex items-center justify-between mb-3 relative z-10">
              <div className="flex items-center space-x-2">
                <Sparkles className="text-yellow-300" size={20} />
                <h2 className="font-bold text-lg">Ask Flo AI</h2>
              </div>
              {!userSettings.isPremium && (
                 <div className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center shadow-sm">
                    <Lock size={10} className="mr-1" /> Premium
                 </div>
              )}
           </div>
           
           {!aiResponse && !isThinking ? (
               <div className="relative z-10">
                <p className="text-purple-100 text-sm mb-4">
                    Have a question about your cycle, symptoms, or health? Ask me anything!
                </p>
                <div className="relative">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={userSettings.isPremium ? "e.g., Is spotting normal during ovulation?" : "Unlock to start chatting..."}
                        className={`w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 pr-12 text-white placeholder-purple-200 focus:outline-none focus:bg-white/30 transition-colors ${!userSettings.isPremium ? 'pointer-events-none opacity-60' : ''}`}
                        onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                        disabled={!userSettings.isPremium}
                    />
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleAskAI(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                        {userSettings.isPremium ? <Send size={16} /> : <Lock size={16} />}
                    </button>
                </div>
                {!userSettings.isPremium && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px] rounded-xl border border-white/20">
                         <a 
                            href="https://buy.stripe.com/eVq14p5Y2eNhdiK5iMes002"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white text-purple-700 font-bold text-sm px-4 py-2 rounded-full shadow-lg flex items-center hover:scale-105 transition-transform no-underline"
                         >
                             Unlock for £9.99/mo
                         </a>
                    </div>
                )}
               </div>
           ) : (
               <div className="animate-fade-in relative z-10">
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
        <div>
            <div className="flex items-center space-x-2 mb-3">
                 <Star className="text-orange-500 fill-orange-500" size={18} />
                 <h3 className="font-bold text-lg text-gray-800">Premium Courses</h3>
            </div>
            <div 
                onClick={() => handleCourseClick(MASTERING_CYCLE_COURSE)}
                className="relative h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer transition-transform hover:scale-[1.01]"
            >
                <img src={MASTERING_CYCLE_COURSE.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="Yoga" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <span className="text-white text-xs font-bold uppercase tracking-wider mb-2 bg-rose-500 w-fit px-2 py-1 rounded">Course</span>
                            <h2 className="text-white text-2xl font-bold mb-1 leading-tight w-3/4">{MASTERING_CYCLE_COURSE.title}</h2>
                            <div className="flex items-center text-white/90 text-sm space-x-2">
                                <PlayCircle size={16} />
                                <span>
                                    {MASTERING_CYCLE_COURSE.lessons.length} Lessons • 
                                    {userSettings.completedLessons && userSettings.completedLessons.length > 0 ? ` ${Math.round((userSettings.completedLessons.length / MASTERING_CYCLE_COURSE.lessons.length) * 100)}% Done` : ' 50 min'}
                                </span>
                            </div>
                        </div>
                        {!(userSettings.purchasedCourses || []).includes(MASTERING_CYCLE_COURSE.id) && (
                            <a 
                                href="https://buy.stripe.com/bJe8wR2LQ20v2E612wes003"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white text-gray-900 px-4 py-2 rounded-xl font-bold shadow-lg flex items-center hover:scale-105 transition-transform no-underline"
                            >
                                <Lock size={16} className="mr-2 text-gray-500" />
                                £29.99
                            </a>
                        )}
                    </div>
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
