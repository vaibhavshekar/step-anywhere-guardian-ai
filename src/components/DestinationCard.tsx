
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { MapPin } from 'lucide-react';
import SafetyIndicator from './SafetyIndicator';
import { Destination } from '@/data/destinations';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({
  destination
}: DestinationCardProps) => {
  return (
    <Link to={`/destination/${destination.id}`} className="block">
      <div className="group rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-card shadow-sm hover:shadow-md transition-all card-hover">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
          />
          <div className="absolute top-3 right-3">
            <SafetyIndicator level={destination.safetyLevel} reason={destination.safetyReason} />
          </div>
          {destination.popularityScore && destination.popularityScore > 8 && (
            <Badge className="absolute top-3 left-3 bg-brand-orange text-white">
              Popular
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{destination.name}</h3>
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                <span>{destination.country}</span>
              </div>
            </div>
            <div className="text-right">
              {destination.flightPrice && (
                <div className="text-sm font-medium">
                  Flights from <span className="text-brand-purple">${destination.flightPrice}</span>
                </div>
              )}
              {destination.hotelPrice && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Hotels from ${destination.hotelPrice}/night
                </div>
              )}
            </div>
          </div>
          
          {destination.currentEvents && destination.currentEvents.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">Current Events:</p>
              <div className="flex flex-wrap gap-1.5">
                {destination.currentEvents.slice(0, 2).map((event, index) => (
                  <Badge 
                    variant="outline" 
                    key={index} 
                    className="text-xs py-0"
                  >
                    {event}
                  </Badge>
                ))}
                {destination.currentEvents.length > 2 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs py-0"
                  >
                    +{destination.currentEvents.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
