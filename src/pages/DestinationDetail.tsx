
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Shield, Star, Users, MessageSquare, Hotel, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafetyIndicator from '@/components/SafetyIndicator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import { useToast } from '@/hooks/use-toast';

// This would come from an API in a real app
import { featuredDestinations } from '@/data/destinations';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const found = featuredDestinations.find((dest) => dest.id === id);
      setDestination(found || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBookmark = () => {
    toast({
      title: "Destination saved",
      description: `${destination?.name} has been added to your bookmarks`,
    });
  };

  const handleBookFlight = () => {
    toast({
      title: "Flight booking",
      description: "This feature is coming soon!",
    });
  };

  const handleBookHotel = () => {
    toast({
      title: "Hotel booking",
      description: "This feature is coming soon!",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="h-6 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Destination Not Found</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Sorry, we couldn't find the destination you're looking for.
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock data for the destination page
  const attractions = [
    { name: "Famous Landmark", rating: 4.8, reviewCount: 1240 },
    { name: "Historic Museum", rating: 4.5, reviewCount: 860 },
    { name: "Local Market", rating: 4.6, reviewCount: 950 },
  ];

  const reviews = [
    { 
      id: '1', 
      user: 'Alex', 
      date: '2 weeks ago', 
      content: 'Amazing place! The safety measures were excellent and I felt secure throughout my stay.',
      rating: 5
    },
    { 
      id: '2', 
      user: 'Sam', 
      date: '1 month ago', 
      content: 'Great destination but be careful in certain areas at night. Overall a good experience.',
      rating: 4
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative">
          <div className="h-64 md:h-96 overflow-hidden">
            <img 
              src={destination.image} 
              alt={destination.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
          </div>
          
          <div className="container max-w-6xl mx-auto px-4">
            <div className="relative -mt-24 bg-background rounded-t-xl p-6 shadow-sm border border-border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{destination.country}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">{destination.name}</h1>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" onClick={handleBookmark}>
                    Save
                  </Button>
                  <Button size="sm" className="bg-brand-purple hover:bg-brand-purple-dark">
                    <Shield className="h-4 w-4 mr-2" />
                    Safety Guide
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-6">
                <SafetyIndicator 
                  level={destination.safetyLevel} 
                  reason={destination.safetyReason} 
                  className="flex-shrink-0"
                />
                
                {destination.popularityScore && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-3">
                      <Star className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Popularity Score</div>
                      <div className="text-2xl font-bold">{destination.popularityScore.toFixed(1)}</div>
                    </div>
                  </div>
                )}
                
                {destination.flightPrice && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                      <Plane className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Flights from</div>
                      <div className="text-2xl font-bold">${destination.flightPrice}</div>
                    </div>
                  </div>
                )}
                
                {destination.hotelPrice && (
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                      <Hotel className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Hotels from</div>
                      <div className="text-2xl font-bold">${destination.hotelPrice}/night</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <Tabs defaultValue="overview">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-8">
              {/* Current Events */}
              {destination.currentEvents && destination.currentEvents.length > 0 && (
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-brand-purple" />
                    Current Events
                  </h2>
                  <div className="space-y-4">
                    {destination.currentEvents.map((event: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full p-2 mr-3">
                          <Calendar className="h-4 w-4 text-brand-purple" />
                        </div>
                        <div>
                          <h3 className="font-medium">{event}</h3>
                          <p className="text-sm text-muted-foreground">Now until June 2025</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Popular Attractions */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-brand-purple" />
                  Popular Attractions
                </h2>
                <div className="space-y-4">
                  {attractions.map((attraction, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div className="flex items-start">
                        <div className="bg-amber-100 dark:bg-amber-900/30 rounded-full p-2 mr-3">
                          <Star className="h-4 w-4 text-amber-500" />
                        </div>
                        <div>
                          <h3 className="font-medium">{attraction.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                            <span>{attraction.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{attraction.reviewCount} reviews</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Booking Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Plane className="h-5 w-5 mr-2 text-brand-purple" />
                    Flight Booking
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Find the best flights to {destination.name} starting from ${destination.flightPrice}.
                  </p>
                  <Button className="w-full" onClick={handleBookFlight}>
                    <Plane className="h-4 w-4 mr-2" />
                    Book a Flight
                  </Button>
                </div>
                
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Hotel className="h-5 w-5 mr-2 text-brand-purple" />
                    Hotel Booking
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Find accommodation in {destination.name} from ${destination.hotelPrice} per night.
                  </p>
                  <Button className="w-full" onClick={handleBookHotel}>
                    <Hotel className="h-4 w-4 mr-2" />
                    Book a Hotel
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="safety" className="space-y-8">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-4 mb-6">
                  <SafetyIndicator 
                    level={destination.safetyLevel} 
                    reason={destination.safetyReason} 
                  />
                </div>
                
                <h3 className="text-lg font-medium mb-3">Safety Overview</h3>
                <p className="text-muted-foreground mb-6">
                  {destination.safetyReason}
                  {destination.safetyLevel === 'safe' && " The local authorities maintain good security standards and tourists rarely experience serious problems."}
                  {destination.safetyLevel === 'moderate' && " Follow basic safety precautions and stay informed about local conditions during your stay."}
                  {destination.safetyLevel === 'unsafe' && " Consider whether your journey is essential and take extreme caution if you decide to travel here."}
                </p>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-medium mb-3">Safety Tips</h3>
                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 mr-2 mt-1 text-brand-purple" />
                    Keep your valuables secure and be aware of your surroundings, especially in crowded areas.
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 mr-2 mt-1 text-brand-purple" />
                    Register with your embassy or consulate upon arrival.
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 mr-2 mt-1 text-brand-purple" />
                    Carry a photocopy of your passport and keep the original in a secure location.
                  </li>
                  <li className="flex items-start">
                    <Shield className="h-4 w-4 mr-2 mt-1 text-brand-purple" />
                    Research local customs and dress codes to respect local traditions.
                  </li>
                </ul>
                
                <Alert className="border-brand-purple/30">
                  <Shield className="h-4 w-4 text-brand-purple" />
                  <AlertTitle>Stay Informed</AlertTitle>
                  <AlertDescription>
                    Safety conditions can change. Check for the latest travel advisories before and during your trip.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-8">
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-brand-purple" />
                    Traveler Reviews
                  </h2>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center mr-2">
                            <Users className="h-4 w-4 text-brand-purple" />
                          </div>
                          <span className="font-medium">{review.user}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300 dark:text-gray-600'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default DestinationDetail;
