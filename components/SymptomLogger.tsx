import React, { useState } from 'react';
import { 
  X, Check, Zap, Frown, Wind, Meh, Smile, RefreshCw, 
  BatteryLow, Droplet, Cloud, Activity, Thermometer
} from 'lucide-react';
import { MOCK_SYMPTOMS } from '../constants';
import { Symptom } from '../types';

// Map string identifiers to React Components
const IconMap: Record<string, React.ElementType> = {
  'zap': Zap,
  'frown': Frown,
  'wind': Wind,
  'meh': Meh,
  'smile': Smile,
  'refresh-cw': RefreshCw,
  'battery-low': BatteryLow,
  'droplet': Droplet,
  'cloud': Cloud,
  'activity': Activity,
  'thermometer': Thermometer
};

interface SymptomLoggerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (symptoms: string[]) => void;
}

const SymptomLogger: React.FC<SymptomLoggerProps> = ({ isOpen, onClose, onSave }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  // Helper to get color styles based on category
  const getCategoryStyles = (category: string, isSelected: boolean) => {
    const base = "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200";
    
    if (!isSelected) {
      return `${base} border-gray-100 bg-gray-50 text-gray-400 group-hover:border-gray-200`;
    }

    switch (category) {
      case 'mood':
        return `${base} border-purple-500 bg-purple-50 text-purple-600 shadow-sm shadow-purple-100`;
      case 'discharge':
        return `${base} border-blue-500 bg-blue-50 text-blue-600 shadow-sm shadow-blue-100`;
      case 'physical':
      default:
        return `${base} border-rose-500 bg-rose-50 text-rose-600 shadow-sm shadow-rose-100`;
    }
  };

  // Group symptoms by category
  const symptomsByCategory = MOCK_SYMPTOMS.reduce((acc, symptom) => {
    if (!acc[symptom.category]) {
      acc[symptom.category] = [];
    }
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as Record<string, Symptom[]>);

  // Define sort order
  const categoryOrder = ['physical', 'mood', 'discharge', 'other'];
  const categoryLabels: Record<string, string> = {
    physical: 'Physical Symptoms',
    mood: 'Mood',
    discharge: 'Vaginal Discharge',
    other: 'Other'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md h-[85vh] sm:h-auto sm:rounded-2xl rounded-t-3xl shadow-2xl flex flex-col animate-slide-up overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white z-10">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
          <h2 className="text-lg font-bold text-gray-800">Log symptoms</h2>
          <button 
            onClick={handleSave}
            className="text-rose-500 font-bold px-4 py-1.5 hover:bg-rose-50 rounded-full transition-colors text-sm"
          >
            Save
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 pb-20 sm:pb-4">
          {categoryOrder.map(catKey => {
            const categorySymptoms = symptomsByCategory[catKey];
            if (!categorySymptoms || categorySymptoms.length === 0) return null;

            return (
              <div key={catKey} className="mb-8">
                <div className="flex items-center mb-4">
                  <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-widest">
                    {categoryLabels[catKey] || catKey}
                  </h3>
                  <div className="ml-3 h-px bg-gray-100 flex-1"></div>
                </div>
                
                <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                  {categorySymptoms.map(symptom => {
                    const IconComponent = IconMap[symptom.icon] || Activity;
                    const isSelected = selected.includes(symptom.id);
                    
                    return (
                      <button
                        key={symptom.id}
                        onClick={() => toggleSymptom(symptom.id)}
                        className="flex flex-col items-center group relative"
                      >
                        <div className={getCategoryStyles(symptom.category, isSelected)}>
                           <IconComponent size={24} strokeWidth={isSelected ? 2.5 : 1.5} />
                           {isSelected && (
                             <div className="absolute top-0 right-1 bg-white rounded-full p-0.5 border border-gray-100 shadow-sm">
                               <Check size={10} className="text-green-500" strokeWidth={3} />
                             </div>
                           )}
                        </div>
                        <span className={`mt-2 text-[10px] font-bold text-center leading-tight transition-colors ${isSelected ? 'text-gray-800' : 'text-gray-400'}`}>
                          {symptom.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Mobile Safe Area Spacer */}
        <div className="h-safe w-full bg-white sm:hidden"></div>
      </div>
    </div>
  );
};

export default SymptomLogger;