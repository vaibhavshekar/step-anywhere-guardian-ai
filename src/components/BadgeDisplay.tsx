
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
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4", className)}>
      {badges.map(badge => (
        <div key={badge.id} className="flex flex-col items-center text-center p-4 rounded-lg border border-transparent hover:border-brand-purple/20 transition-colors">
          <div className="mb-3">
            {badge.icon === 'location' ? (
              <MapPin className={cn("h-6 w-6", badge.earned ? "text-brand-purple" : "text-gray-400 dark:text-gray-500")} />
            ) : (
              <MessageSquare className={cn("h-6 w-6", badge.earned ? "text-brand-purple" : "text-gray-400 dark:text-gray-500")} />
            )}
          </div>
          
          <h4 className="text-sm font-medium">{badge.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{badge.description}</p>
          
          {badge.earned && badge.date && (
            <div className="mt-2 text-xs text-brand-purple flex items-center justify-center">
              <Award className="h-3 w-3 mr-1" />
              Earned {badge.date}
            </div>
          )}
          
          {!badge.earned && (
            <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Not earned yet
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BadgeDisplay;
