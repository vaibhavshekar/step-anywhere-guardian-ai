
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  searchAmadeusHotels, 
  searchAmadeusFlights,
  formatAmadeusHotelData,
  formatAmadeusFlightData
} from '@/services/amadeusApi';

interface SearchResult {
  provider: string;
  price: number;
  logo: string;
  duration?: string;
  stops?: number;
  departureTime?: string;
  arrivalTime?: string;
  hotel?: {
    name: string;
    rating: number;
    facilities?: string;
    website?: string;
  };
  rawData?: any;
}

const SearchBar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("flights");
  
  // Form states
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  
  // Hotel specific states
  const [hotelLocation, setHotelLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);

  // Search results states
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeTab === 'flights') {
      if (!departureCity || !destinationCity || !departureDate) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields to search for flights.",
          variant: "destructive"
        });
        return;
      }
      
      setIsSearching(true);
      
      try {
        const flightData = await searchAmadeusFlights(
          departureCity,
          destinationCity,
          departureDate,
          travelers,
          returnDate || undefined
        );
        
        const formattedResults = flightData.map(formatAmadeusFlightData);
        setSearchResults(formattedResults);
        setShowResults(true);
        
        toast({
          title: "Flights found",
          description: `Found ${formattedResults.length} flight options.`,
        });
      } catch (error) {
        console.error('Flight search error:', error);
        toast({
          title: "Search failed",
          description: "Unable to search flights. Please check your input and try again.",
          variant: "destructive"
        });
      } finally {
        setIsSearching(false);
      }
      
    } else {
      if (!hotelLocation || !checkInDate || !checkOutDate) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields to search for hotels.",
          variant: "destructive"
        });
        return;
      }
      
      setIsSearching(true);
      
      try {
        const hotelData = await searchAmadeusHotels(
          hotelLocation,
          checkInDate,
          checkOutDate,
          guests
        );
        
        const formattedResults = hotelData.map(formatAmadeusHotelData);
        setSearchResults(formattedResults);
        setShowResults(true);
        
        toast({
          title: "Hotels found",
          description: `Found ${formattedResults.length} hotel options.`,
        });
      } catch (error) {
        console.error('Hotel search error:', error);
        toast({
          title: "Search failed",
          description: "Unable to search hotels. Please check your input and try again.",
          variant: "destructive"
        });
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleBookNow = (provider: string, price: number, result: SearchResult) => {
    if (result.hotel?.website) {
      window.open(result.hotel.website, '_blank');
    }
    
    toast({
      title: "Redirecting to provider",
      description: `Taking you to ${provider} to complete your booking for $${price}.`,
    });
    setShowResults(false);
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  const getCheapestOption = (results: SearchResult[]): SearchResult | undefined => {
    if (results.length === 0) return undefined;
    return results.reduce((min, result) => result.price < min.price ? result : min, results[0]);
  };

  const cheapestOption = getCheapestOption(searchResults);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
      <Tabs defaultValue="flights" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="flights" className="text-base">Flights</TabsTrigger>
          <TabsTrigger value="hotels" className="text-base">Hotels</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSearch}>
          <TabsContent value="flights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From (Airport Code)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="e.g., NYC, LON" 
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">To (Airport Code)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="e.g., NYC, LON" 
                    value={destinationCity}
                    onChange={(e) => setDestinationCity(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Departure</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    type="date" 
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Return (Optional)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    type="date" 
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Travelers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    type="number" 
                    min="1" 
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="hotels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">City Code</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="e.g., NYC, LON" 
                    value={hotelLocation}
                    onChange={(e) => setHotelLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      className="pl-10" 
                      type="date" 
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      className="pl-10" 
                      type="date" 
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rooms</label>
                <Input 
                  type="number" 
                  min="1" 
                  value={rooms}
                  onChange={(e) => setRooms(parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Guests</label>
                <Input 
                  type="number" 
                  min="1" 
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                />
              </div>
            </div>
          </TabsContent>
          
          <div className="mt-6 flex items-center">
            <Button 
              type="submit"
              className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white"
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search {activeTab === "flights" ? "Flights" : "Hotels"}
                </>
              )}
            </Button>
          </div>
        </form>
      </Tabs>

      {/* Search Results Dialog */}
      <Dialog open={showResults} onOpenChange={handleCloseResults}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{activeTab === "flights" ? `Flights: ${departureCity} to ${destinationCity}` : `Hotels in ${hotelLocation}`}</span>
              {cheapestOption && (
                <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-2 py-1 rounded-full">
                  Best Deal: ${cheapestOption.price} ({cheapestOption.provider})
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {searchResults.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No results found. Try different search criteria.</p>
            ) : (
              searchResults.map((result, index) => (
                <div key={index} className={`border rounded-lg p-4 transition-colors ${
                  cheapestOption === result ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-xs">
                        {result.provider.length > 8 ? result.provider.substring(0, 8) : result.provider}
                      </div>
                      <div>
                        {activeTab === 'flights' ? (
                          <div className="text-sm">
                            <span className="font-medium">{result.departureTime} - {result.arrivalTime}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {result.duration} • {result.stops === 0 ? 'Nonstop' : `${result.stops} stop${result.stops > 1 ? 's' : ''}`}
                            </p>
                          </div>
                        ) : (
                          <div className="text-sm">
                            <span className="font-medium">{result.hotel?.name}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {result.hotel?.rating}/5 rating
                            </p>
                            {result.hotel?.facilities && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {result.hotel.facilities.substring(0, 50)}...
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">${result.price}</div>
                      <Button 
                        size="sm" 
                        variant="default"
                        className="mt-1 bg-brand-purple hover:bg-brand-purple-dark"
                        onClick={() => handleBookNow(result.provider, result.price, result)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>

                  {cheapestOption === result && (
                    <div className="mt-2 text-xs text-green-700 dark:text-green-400 font-medium">
                      Best price! Save ${Math.min(...searchResults.filter(r => r !== result).map(r => r.price)) - result.price} compared to others
                    </div>
                  )}
                </div>
              ))
            )}

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
              Prices and availability from Amadeus Travel API. Safety information provided alongside booking details.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;
