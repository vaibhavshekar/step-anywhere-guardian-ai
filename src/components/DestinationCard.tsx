import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import SafetyIndicator from './SafetyIndicator';
import { Destination } from '@/data/destinations';
import { fetchNewsForLocation, analyzeSentiment } from '@/services/newsApi';
import { Card, CardContent } from '@/components/ui/card';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({
  destination
}: DestinationCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [sentimentScore, setSentimentScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    if (!isExpanded || articles.length > 0) return;
    
    setLoading(true);
    setError(null);
    try {
      const newsArticles = await fetchNewsForLocation(`${destination.name}, ${destination.country}`);
      setArticles(newsArticles);
      const score = analyzeSentiment(newsArticles);
      setSentimentScore(score);
    } catch (err) {
      setError('Failed to fetch news');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isExpanded) {
      fetchNews();
    }
  }, [isExpanded]);

  const getSentimentColor = (score: number) => {
    if (score >= 7) return 'text-green-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="group rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-card shadow-sm hover:shadow-md transition-all card-hover">
      <Link to={`/destination/${destination.id}`} className="block">
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
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          {isExpanded ? (
            <>
              Hide News <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show Recent News <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-purple mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Loading news...</p>
              </div>
            )}

            {error && (
              <div className="text-center text-sm text-red-500">
                {error}
              </div>
            )}

            {!loading && sentimentScore !== null && (
              <div className="text-center">
                <p className="text-sm font-medium mb-1">News Safety Rating</p>
                <div className={`text-2xl font-bold ${getSentimentColor(sentimentScore)}`}>
                  {sentimentScore}/10
                </div>
              </div>
            )}

            {!loading && articles.length > 0 && (
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                <div className="space-y-3">
                  {articles.slice(0, 3).map((article, index) => (
                    <Card key={index} className="hover:shadow-sm transition-shadow">
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          {article.urlToImage && (
                            <img
                              src={article.urlToImage}
                              alt={article.title}
                              className="w-16 h-16 object-cover rounded flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm mb-1 line-clamp-2">
                              <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-brand-purple"
                              >
                                {article.title}
                              </a>
                            </h4>
                            <p className="text-xs text-gray-500">
                              {new Date(article.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationCard;
