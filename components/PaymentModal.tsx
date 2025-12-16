
import React, { useState } from 'react';
import { X, Lock, CheckCircle, CreditCard, ShieldCheck } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: string;
  description: string;
  onSuccess: () => void;
  type: 'subscription' | 'one-time';
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  price, 
  description, 
  onSuccess,
  type
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate Stripe API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        setIsSuccess(false); // Reset for next time
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-slide-up relative">
        
        {!isSuccess && (
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
                disabled={isProcessing}
            >
                <X size={20} className="text-gray-500" />
            </button>
        )}

        {/* Content */}
        <div className="p-8 flex flex-col items-center text-center">
            
            {isSuccess ? (
                 <div className="py-10 flex flex-col items-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                        <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                    <p className="text-gray-500">Unlocking your content...</p>
                 </div>
            ) : (
                <>
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-200 transform -rotate-3">
                        {type === 'subscription' ? (
                            <ShieldCheck size={32} className="text-white" />
                        ) : (
                            <Lock size={32} className="text-white" />
                        )}
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed px-2">
                        {description}
                    </p>

                    <div className="w-full bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500 font-medium">Total due today</span>
                            <span className="text-2xl font-extrabold text-gray-800">{price}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-400 bg-white p-2 rounded border border-gray-100">
                             <CreditCard size={12} className="mr-2" />
                             <span>Secured by Stripe</span>
                        </div>
                    </div>

                    <button 
                        onClick={handlePay}
                        disabled={isProcessing}
                        className="w-full py-4 rounded-xl bg-[#635BFF] text-white font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-[#5851E8] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isProcessing ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            `Pay ${price}`
                        )}
                    </button>
                    
                    <p className="mt-4 text-[10px] text-gray-400">
                        {type === 'subscription' 
                            ? "Recurring monthly billing. Cancel anytime." 
                            : "One-time payment. Lifetime access."}
                    </p>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
