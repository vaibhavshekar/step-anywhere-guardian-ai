
import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type SafetyLevel = 'safe' | 'moderate' | 'unsafe';

interface SafetyIndicatorProps {
  level: SafetyLevel;
  reason?: string;
  className?: string;
}

const SafetyIndicator = ({ level, reason, className }: SafetyIndicatorProps) => {
  // Define UI properties based on safety level
  const properties = {
    safe: {
      icon: ShieldCheck,
      text: "Safe to Travel",
      color: "text-safety-safe",
      bgColor: "bg-safety-safe/10 dark:bg-safety-safe/20", 
      borderColor: "border-safety-safe/30"
    },
    moderate: {
      icon: Shield,
      text: "Exercise Caution",
      color: "text-safety-moderate",
      bgColor: "bg-safety-moderate/10 dark:bg-safety-moderate/20",
      borderColor: "border-safety-moderate/30"
    },
    unsafe: {
      icon: ShieldAlert,
      text: "Not Recommended",
      color: "text-safety-unsafe",
      bgColor: "bg-safety-unsafe/10 dark:bg-safety-unsafe/20",
      borderColor: "border-safety-unsafe/30"
    },
  };

  const { icon: Icon, text, color, bgColor, borderColor } = properties[level];

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn("flex items-center justify-center p-1.5 rounded-md", bgColor)}>
        <Icon className={cn("h-5 w-5", color)} />
      </div>
      <div className="ml-2">
        <span className={cn("text-sm font-medium", color)}>{text}</span>
        {reason && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="ml-1 inline">
                  <Info className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{reason}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default SafetyIndicator;
