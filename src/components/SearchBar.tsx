import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Loader2, ArrowRight, Clock, PlaneTakeoff, PlaneLanding, Filter, SortAsc, SortDesc, Luggage, Shield, Star } from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FlightFilter {
  sortBy: 'price' | 'duration' | 'departure';
  sortOrder: 'asc' | 'desc';
  stops: 'all' | 'nonstop' | '1stop';
}

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
  flightNumber?: string;
  aircraft?: string;
  baggageAllowance?: string;
  refundable?: boolean;
  cabinClass?: string;
}

// Test with valid city code
searchAmadeusHotels('LON', '2025-06-05', '2025-06-07', 2)
  .then(results => console.log(results))
  .catch(error => console.error(error));

const HotelCard = ({
  result,
  isCheapest,
  allResults,
  onBookNow
}: {
  result: SearchResult;
  isCheapest: boolean;
  allResults: SearchResult[];
  onBookNow: (provider: string, price: number, result: SearchResult) => void;
}) => (
  <div className={`border rounded-lg p-6 transition-colors ${isCheapest ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700'
    }`}>
    <div className="flex justify-between items-start">
      <div className="flex-1">
        {/* Hotel Info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
          </div>
          <div>
            <div className="font-semibold text-xl">{result.hotel?.name}</div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(result.hotel?.rating || 0)
                      ? 'fill-yellow-400 stroke-yellow-400'
                      : 'stroke-gray-300 dark:stroke-gray-500'
                    }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {result.hotel?.rating?.toFixed(1) || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Facilities */}
        {result.hotel?.facilities && (
          <div className="mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Facilities</div>
            <div className="flex flex-wrap gap-2">
              {result.hotel.facilities.split(',').map((facility, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-gray-100 dark:bg-gray-700"
                >
                  {facility.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price and Booking */}
      <div className="ml-8 text-right border-l pl-8 border-gray-200 dark:border-gray-700">
        <div className="text-3xl font-bold text-brand-purple">${result.price}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          per night
        </div>
        <Button
          size="lg"
          variant="default"
          className="w-full bg-brand-purple hover:bg-brand-purple-dark"
          onClick={() => onBookNow(result.provider, result.price, result)}
        >
          Book Now
        </Button>
      </div>
    </div>

    {isCheapest && (
      <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-700 dark:text-green-400">
            <Star className="h-5 w-5 mr-2" />
            <span className="font-medium">
              Best price! Save ${Math.min(...allResults.filter(r => r !== result).map(r => r.price)) - result.price} compared to others
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              Great Deal
            </Badge>
          </div>
        </div>
      </div>
    )}
  </div>
);


const FlightCard = ({
  result,
  isCheapest,
  departureCity,
  destinationCity,
  allResults,
  onBookNow
}: {
  result: SearchResult;
  isCheapest: boolean;
  departureCity: string;
  destinationCity: string;
  allResults: SearchResult[];
  onBookNow: (provider: string, price: number, result: SearchResult) => void;
}) => (
  <div className={`border rounded-lg p-6 transition-colors ${isCheapest ? 'border-green-500 bg-green-50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700'
    }`}>
    <div className="flex justify-between items-start">
      <div className="flex-1">
        {/* Airline Info */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <PlaneTakeoff className="w-8 h-8 text-gray-700 dark:text-gray-300" />
          </div>
          <div>
            <div className="font-semibold text-lg">{result.provider}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Flight {result.flightNumber}
            </div>
          </div>
        </div>

        {/* Flight Route */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="font-bold text-xl">{result.departureTime}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{departureCity}</div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              <div className="mx-4 flex flex-col items-center">
                <Clock className="h-5 w-5 text-gray-400 mb-1" />
                <span className="text-sm text-gray-500">{result.duration}</span>
                <span className="text-xs text-gray-400 mt-1">
                  {result.stops === 0 ? 'Nonstop' : `${result.stops} stop${result.stops > 1 ? 's' : ''}`}
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>

            <div className="text-center flex-1">
              <div className="font-bold text-xl">{result.arrivalTime}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{destinationCity}</div>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <PlaneTakeoff className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-gray-500 dark:text-gray-400">Aircraft</div>
              <div className="font-medium">{result.aircraft}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Luggage className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-gray-500 dark:text-gray-400">Baggage</div>
              <div className="font-medium">{result.baggageAllowance}</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-gray-400" />
            <div>
              <div className="text-gray-500 dark:text-gray-400">Status</div>
              <div className="font-medium">{result.refundable ? 'Refundable' : 'Non-refundable'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Price and Booking */}
      <div className="ml-8 text-right border-l pl-8 border-gray-200 dark:border-gray-700">
        <div className="text-3xl font-bold text-brand-purple">${result.price}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {result.cabinClass}
        </div>
        <Button
          size="lg"
          variant="default"
          className="w-full bg-brand-purple hover:bg-brand-purple-dark"
          onClick={() => onBookNow(result.provider, result.price, result)}
        >
          Book Now
        </Button>
      </div>
    </div>

    {isCheapest && (
      <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-green-700 dark:text-green-400">
            <Star className="h-5 w-5 mr-2" />
            <span className="font-medium">
              Best price! Save ${Math.min(...allResults.filter(r => r !== result).map(r => r.price)) - result.price} compared to others
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
              {result.stops === 0 ? 'Nonstop' : `${result.stops} stop${result.stops > 1 ? 's' : ''}`}
            </Badge>
            {result.refundable && (
              <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                Refundable
              </Badge>
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);

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

  const [filters, setFilters] = useState<FlightFilter>({
    sortBy: 'price',
    sortOrder: 'asc',
    stops: 'all'
  });

  const getFilteredAndSortedResults = (results: SearchResult[]) => {
    let filtered = [...results];

    // Apply stops filter
    if (filters.stops !== 'all') {
      filtered = filtered.filter(result =>
        filters.stops === 'nonstop' ? result.stops === 0 : result.stops === 1
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const multiplier = filters.sortOrder === 'asc' ? 1 : -1;
      switch (filters.sortBy) {
        case 'price':
          return (a.price - b.price) * multiplier;
        case 'duration':
          return (parseInt(a.duration || '0') - parseInt(b.duration || '0')) * multiplier;
        case 'departure':
          return (a.departureTime || '').localeCompare(b.departureTime || '') * multiplier;
        default:
          return 0;
      }
    });

    return filtered;
  };

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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex justify-between items-center">
              <span className="text-xl">
                {activeTab === "flights" ? (
                  <div className="flex items-center space-x-2">
                    <span>{departureCity}</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>{destinationCity}</span>
                  </div>
                ) : `Hotels in ${hotelLocation}`}
              </span>
              {cheapestOption && (
                <span className="text-sm bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1 rounded-full">
                  Best Deal: ${cheapestOption.price} ({cheapestOption.provider})
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {activeTab === 'flights' && (
            <div className="flex items-center space-x-4 mb-4 flex-shrink-0">
              <Select
                value={filters.sortBy}
                onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as FlightFilter['sortBy'] }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' }))}
              >
                {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>

              <Select
                value={filters.stops}
                onValueChange={(value) => setFilters(prev => ({ ...prev, stops: value as FlightFilter['stops'] }))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by stops" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Flights</SelectItem>
                  <SelectItem value="nonstop">Nonstop Only</SelectItem>
                  <SelectItem value="1stop">1 Stop Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="overflow-y-auto flex-1 pr-2 space-y-4">
            {searchResults.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No results found. Try different search criteria.</p>
            ) : activeTab === 'flights' ? (
              getFilteredAndSortedResults(searchResults).map((result, index) => (
                <FlightCard
                  key={index}
                  result={result}
                  isCheapest={cheapestOption === result}
                  departureCity={departureCity}
                  destinationCity={destinationCity}
                  allResults={searchResults}
                  onBookNow={handleBookNow}
                />
              ))
            ) : (
              searchResults.map((result, index) => (
                <HotelCard
                  key={index}
                  result={result}
                  isCheapest={cheapestOption === result}
                  allResults={searchResults}
                  onBookNow={handleBookNow}
                />
              ))
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4 flex-shrink-0">
            Prices and availability from Amadeus Travel API. Safety information provided alongside booking details.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;
