import React from 'react';
import { DollarSign } from 'lucide-react';

interface BenefitItemProps {
  title: string;
  amount: string;
  description: string;
  onAttemptClaim: (element: HTMLDivElement) => void;
  isBeingStolen: boolean;
  showWarning: boolean;
  isStolen: boolean;
}

export default function BenefitItem({ 
  title, 
  amount, 
  description, 
  onAttemptClaim,
  isBeingStolen,
  showWarning,
  isStolen
}: BenefitItemProps) {
  if (isStolen) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        <p className="text-gray-500 italic text-center">
          Pierre Poilievre would cut the {title.toLowerCase()}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-white p-6 rounded-lg shadow-md transition-all duration-500 cursor-pointer
        hover:shadow-xl ${isBeingStolen ? 'opacity-50 scale-90' : ''}`}
      onClick={(e) => onAttemptClaim(e.currentTarget)}
    >
      {showWarning && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-90 rounded-lg flex items-center justify-center p-4 z-10 animate-fade-in">
          <p className="text-white text-center text-lg font-bold">
            Pierre Poilievre would take away this benefit!
          </p>
        </div>
      )}
      <div className="absolute top-4 right-4">
        <DollarSign className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-green-600 mb-2">{amount}</p>
      <p className="text-gray-600">{description}</p>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        This is important to me
      </button>
    </div>
  );
}