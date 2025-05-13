import React from 'react';
import { Award, MapPin, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
export interface Badge {
  id: string;
  type: 'visit' | 'comment';
  title: string;
  description: string;
  icon: 'location' | 'comment';
  earned: boolean;
  date?: string;
}
interface BadgeDisplayProps {
  badges: Badge[];
  className?: string;
}
const BadgeDisplay = ({
  badges,
  className
}: BadgeDisplayProps) => {
  return <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", className)}>
      {badges.map(badge => <div key={badge.id} className={cn("relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all", badge.earned ? "border-brand-purple/30 bg-brand-purple/5" : "border-gray-200 bg-gray-100/50 opacity-60 grayscale")}>
          <div className="">
            {badge.icon === 'location' ? <MapPin className={cn("h-6 w-6", badge.earned ? "text-brand-purple" : "text-gray-400")} /> : <MessageSquare className={cn("h-6 w-6", badge.earned ? "text-brand-purple" : "text-gray-400")} />}
          </div>
          
          <h4 className="text-sm font-medium text-center">{badge.title}</h4>
          <p className="text-xs text-gray-500 text-center mt-1">{badge.description}</p>
          
          {badge.earned && badge.date && <div className="mt-2 text-xs text-brand-purple flex items-center">
              <Award className="h-3 w-3 mr-1" />
              Earned {badge.date}
            </div>}
          
          {!badge.earned && <div className="mt-2 text-xs text-gray-400">
              Not earned yet
            </div>}
        </div>)}
    </div>;
};
export default BadgeDisplay;