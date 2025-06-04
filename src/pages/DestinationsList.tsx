import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import DestinationCard from '@/components/DestinationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ShieldCheck, Search, MapPin, Globe, AlertCircle } from 'lucide-react';
import { featuredDestinations, Destination } from '@/data/destinations';
import { fetchNewsForLocation, analyzeSentiment } from '@/services/newsApi';

const DestinationsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [safetyFilter, setSafetyFilter] = useState<string>('all');
  const [region, setRegion] = useState<string>('all');
  const [articles, setArticles] = useState<any[]>([]);
  const [sentimentScore, setSentimentScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter destinations based on search term and filters
  const filteredDestinations = featuredDestinations.filter((destination) => {
    const matchesSearch = 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSafety = 
      safetyFilter === 'all' || 
      destination.safetyLevel === safetyFilter;
    
    const matchesRegion = region === 'all' || destination.region === region;
    
    return matchesSearch && matchesSafety && matchesRegion;
  });

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setArticles([]);
    setSentimentScore(null);
    
    try {
      console.log('Starting news search for:', searchTerm);
      const newsArticles = await fetchNewsForLocation(searchTerm);
      console.log('Received news articles:', newsArticles.length);
      
      if (newsArticles.length === 0) {
        setError('No recent news found for this location.');
        return;
      }

      setArticles(newsArticles);
      const score = analyzeSentiment(newsArticles);
      setSentimentScore(score);
    } catch (err) {
      console.error('Search error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch news. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (score: number) => {
    if (score >= 7) return 'text-green-500';
    if (score >= 4) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-brand-purple-light/20 to-brand-blue-light/30 dark:from-brand-purple/10 dark:to-brand-blue-light/10 py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Safe Destinations</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Discover our curated collection of destinations with detailed safety information and travel insights.
              </p>
            </div>
            
            {/* Search & Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 md:p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-1 md:col-span-3 mb-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      className="pl-10" 
                      placeholder="Search destinations, cities, or countries" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">Safety Level</label>
                  <Select 
                    value={safetyFilter} 
                    onValueChange={setSafetyFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All safety levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All safety levels</SelectItem>
                      <SelectItem value="safe">Safe</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="unsafe">Not Recommended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-2">Region</label>
                  <Select 
                    value={region} 
                    onValueChange={setRegion}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All regions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All regions</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="northamerica">North America</SelectItem>
                      <SelectItem value="southamerica">South America</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="oceania">Oceania</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button 
                    className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white"
                    onClick={handleSearch}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* News Results */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 mb-4 mt-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-purple mx-auto mb-4"></div>
                <p className="text-gray-600">Fetching news and analyzing safety...</p>
              </div>
            )}

            {!loading && sentimentScore !== null && (
              <Card className="mt-6 mb-6">
                <CardHeader>
                  <CardTitle>Safety Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${getSentimentColor(sentimentScore)}`}>
                      {sentimentScore}/10
                    </div>
                    <p className="text-gray-500 mt-2">
                      Based on recent news sentiment analysis
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && articles.length > 0 && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent News</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                  {articles.map((article, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {article.urlToImage && (
                            <img
                              src={article.urlToImage}
                              alt={article.title}
                              className="w-24 h-24 object-cover rounded flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold mb-2">
                              <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-brand-purple line-clamp-2"
                              >
                                {article.title}
                              </a>
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {article.description}
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
        </div>
        
        {/* Destinations Grid */}
        <div className="py-12 px-4 bg-gray-50 dark:bg-gray-900">
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                {filteredDestinations.length} {filteredDestinations.length === 1 ? 'Destination' : 'Destinations'} Found
              </h2>
              
              <div className="flex items-center">
                <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400 mr-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  <span>Showing all regions</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-1 text-brand-purple" />
                  Safety information available
                </div>
              </div>
            </div>
            
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="h-16 w-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No destinations found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSafetyFilter('all');
                    setRegion('all');
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDestinations.map(destination => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default DestinationsList;
