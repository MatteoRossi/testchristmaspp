import React, { useState, useCallback } from "react";
import BenefitItem from "./components/BenefitItem";
import Grinch from "./components/Grinch";

const benefits = [
  {
    title: "Canada Carbon Rebate",
    amount: "$1,800",
    description: "Annual Canada Carbon Rebate payments for a family of four.",
  },
  {
    title: "Canada Child Benefit",
    amount: "$7,400",
    description: "Annual support per child every year.",
  },
  {
    title: "Canadian Dental Care Plan",
    amount: "$730",
    description: "Saved so far on average thanks to our Liberal plan.",
  },
  {
    title: "$10-a-day Child Care",
    amount: "$8,500",
    description:
      "Real savings for families to give kids the best possible start in life.",
  },
];

type Benefit = {
  title: string;
  amount: string;
  description: string;
};

const calculateTotal = (
  benefits: Benefit[],
  stolenBenefits: Set<number>
): number => {
  return benefits.reduce((total: number, benefit: Benefit, index: number) => {
    if (!stolenBenefits.has(index)) {
      return total + parseInt(benefit.amount.replace(/[$,]/g, ""));
    }
    return total;
  }, 0);
};

function App() {
  const [grinchState, setGrinchState] = useState({
    isVisible: false,
    position: { x: -100, y: 0 },
    hasBenefit: false,
    isWalkingAway: false,
  });
  const [stolenBenefitIndex, setStolenBenefitIndex] = useState<number | null>(
    null
  );
  const [showWarning, setShowWarning] = useState<number | null>(null);
  const [stolenBenefit, setStolenBenefit] = useState<
    (typeof benefits)[0] | null
  >(null);
  const [stolenBenefits, setStolenBenefits] = useState<Set<number>>(new Set());

  const stealBenefit = useCallback(
    (element: HTMLDivElement, index: number) => {
      const rect = element.getBoundingClientRect();
      const targetY = rect.top + rect.height / 2;

      // Don't allow stealing if already in progress
      if (grinchState.isVisible) return;

      // Start with Grinch animation
      setStolenBenefitIndex(index);
      setStolenBenefit(benefits[index]);
      setGrinchState({
        isVisible: true,
        position: { x: -100, y: targetY },
        hasBenefit: false,
        isWalkingAway: false,
      });

      // Walk to benefit
      setTimeout(() => {
        setGrinchState((prev) => ({
          ...prev,
          position: { x: rect.left - 50, y: targetY },
        }));
      }, 100);

      // Grab benefit and show warning
      setTimeout(() => {
        setShowWarning(index);
        setGrinchState((prev) => ({
          ...prev,
          hasBenefit: true,
          isWalkingAway: true,
        }));
      }, 1500);

      // Walk away
      setTimeout(() => {
        setGrinchState((prev) => ({
          ...prev,
          position: { x: -200, y: targetY },
        }));
      }, 3500);

      // Reset everything except stolen benefits
      setTimeout(() => {
        setGrinchState({
          isVisible: false,
          position: { x: -100, y: 0 },
          hasBenefit: false,
          isWalkingAway: false,
        });
        setStolenBenefitIndex(null);
        setShowWarning(null);
        setStolenBenefit(null);
        setStolenBenefits((prev) => new Set([...prev, index]));
      }, 4500);
    },
    [grinchState.isVisible]
  );

  const totalBenefits = calculateTotal(benefits, new Set());
  const remainingBenefits = calculateTotal(benefits, stolenBenefits);
  const stolenAmount = totalBenefits - remainingBenefits;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          What Liberal progress matters most for your family?
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          As we approach the holiday season, select the progress that makes a
          difference for your family, and see how our plan compares to Pierre
          Poilievre's Conservatives.
        </p>
        {/* Add this benefits tally section */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-[auto,1fr,auto] gap-x-4 items-center">
            <span className="text-gray-600">Our Liberal Plan:</span>
            <div className="border-b border-dotted border-gray-300"></div>
            {stolenAmount === 0 ? (
              <span className="text-xl font-bold text-gray-600">
                Select a benefit to start
              </span>
            ) : (
              <span className="text-xl font-bold text-green-600">
                +${stolenAmount.toLocaleString()}
              </span>
            )}
          </div>

          {stolenBenefits.size > 0 && (
            <div className="grid grid-cols-[auto,1fr,auto] gap-x-4 items-center mt-2">
              <span className="text-gray-600">Conservative Cuts:</span>
              <div className="border-b border-dotted border-gray-300"></div>
              <span className="text-xl font-bold text-red-600">
                -${stolenAmount.toLocaleString()}
              </span>
            </div>
          )}
          {stolenBenefits.size > 0 && (
            <ul className="mt-4">
              {[...stolenBenefits].map((index) => (
                <li key={index} className="text-red-600">
                  {benefits[index].title} - $
                  {parseInt(
                    benefits[index].amount.replace(/[$,]/g, "")
                  ).toLocaleString()}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              {...benefit}
              isBeingStolen={stolenBenefitIndex === index}
              showWarning={showWarning === index}
              isStolen={stolenBenefits.has(index)}
              onAttemptClaim={(element) => stealBenefit(element, index)}
            />
          ))}
        </div>
        <Grinch {...grinchState} stolenBenefit={stolenBenefit || undefined} />
      </div>
    </div>
  );
}

export default App;
