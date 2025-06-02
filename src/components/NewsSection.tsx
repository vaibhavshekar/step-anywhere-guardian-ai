
import React, { useEffect, useState } from 'react';
import { ExternalLink, Clock, Newspaper } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { searchCityNews, NewsArticle } from '@/services/newsApi';
import { useToast } from '@/hooks/use-toast';

interface NewsSectionProps {
  cityName: string;
}

const NewsSection = ({ cityName }: NewsSectionProps) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const newsData = await searchCityNews(cityName);
        setArticles(newsData.articles);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch news';
        setError(errorMessage);
        toast({
          title: "News unavailable",
          description: "Unable to load latest news at this time.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchNews();
    }
  }, [cityName, toast]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Newspaper className="h-5 w-5 mr-2 text-brand-purple" />
            Latest News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || articles.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Newspaper className="h-5 w-5 mr-2 text-brand-purple" />
            Latest News
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No recent news available for {cityName}.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Newspaper className="h-5 w-5 mr-2 text-brand-purple" />
          Latest News - {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-medium text-sm mb-2 leading-tight">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {article.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {article.source.name}
                    </Badge>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                </div>
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 h-7 text-xs p-2"
                onClick={() => window.open(article.url, '_blank')}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Read more
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsSection;
