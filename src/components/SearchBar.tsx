
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs based on active tab
    if (activeTab === 'flights') {
      if (!departureCity || !destinationCity || !departureDate) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields to search for flights.",
          variant: "destructive"
        });
        return;
      }
      
      // Navigate to destinations page with search params as a simple implementation
      navigate(`/destinations?from=${departureCity}&to=${destinationCity}`);
    } else {
      if (!hotelLocation || !checkInDate || !checkOutDate) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields to search for hotels.",
          variant: "destructive"
        });
        return;
      }
      
      // Navigate to destinations page with hotel search params
      navigate(`/destinations?location=${hotelLocation}`);
    }
  };

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
                <label className="text-sm font-medium">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="Departure city" 
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="Destination city" 
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
                <label className="text-sm font-medium">Return</label>
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
                <label className="text-sm font-medium">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    className="pl-10" 
                    placeholder="City or hotel name" 
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
            >
              <Search className="h-4 w-4 mr-2" />
              Search {activeTab === "flights" ? "Flights" : "Hotels"} + Safety Info
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
};

export default SearchBar;
