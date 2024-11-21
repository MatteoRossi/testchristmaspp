import React from "react";
import StolenBenefit from "./StolenBenefit";

interface GrinchProps {
  isVisible: boolean;
  position: { x: number; y: number };
  hasBenefit: boolean;
  isWalkingAway: boolean;
  stolenBenefit?: {
    title: string;
    amount: string;
    description: string;
  };
}

export default function Grinch({
  isVisible,
  position,
  hasBenefit,
  isWalkingAway,
  stolenBenefit,
}: GrinchProps) {
  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: "all 1s ease-in-out",
        transform: `translateX(${isWalkingAway ? "100px" : "0px"})`, // Add this line
      }}
    >
      <div className={`relative ${isWalkingAway ? "scale-x-[-1]" : ""}`}>
        {hasBenefit && stolenBenefit && (
          <div
            className={`absolute -top-20 left-1/2 -translate-x-1/2 ${
              isWalkingAway ? "scale-x-[-1]" : ""
            }`}
          >
            <StolenBenefit {...stolenBenefit} />
          </div>
        )}
        <div className="animate-walk">
          <img
            src="https://matteorossi.github.io/calc/pptest.png"
            alt="Grinch"
            className="w-24 h-24"
          />
        </div>
      </div>
    </div>
  );
}
