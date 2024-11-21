import React from 'react';
import { DollarSign } from 'lucide-react';

interface StolenBenefitProps {
  title: string;
  amount: string;
  description: string;
}

export default function StolenBenefit({ title, amount, description }: StolenBenefitProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md scale-50 transform -translate-y-1/2 w-[300px]">
      <div className="absolute top-2 right-2">
        <DollarSign className="w-4 h-4 text-green-600" />
      </div>
      <h3 className="text-sm font-bold text-gray-800 mb-1">{title}</h3>
      <p className="text-base font-bold text-green-600 mb-1">{amount}</p>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}