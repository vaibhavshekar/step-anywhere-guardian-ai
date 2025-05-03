
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState("flights");

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
      <Tabs defaultValue="flights" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="flights" className="text-base">Flights</TabsTrigger>
          <TabsTrigger value="hotels" className="text-base">Hotels</TabsTrigger>
        </TabsList>
        
        <TabsContent value="flights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input className="pl-10" placeholder="Departure city" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input className="pl-10" placeholder="Destination city" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Departure</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input className="pl-10" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Return</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input className="pl-10" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Travelers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input className="pl-10" type="number" min="1" defaultValue="1" />
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
                <Input className="pl-10" placeholder="City or hotel name" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input className="pl-10" type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Check-out</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input className="pl-10" type="date" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rooms</label>
              <Input type="number" min="1" defaultValue="1" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Guests</label>
              <Input type="number" min="1" defaultValue="2" />
            </div>
          </div>
        </TabsContent>
        
        <div className="mt-6 flex items-center">
          <Button className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white">
            <Search className="h-4 w-4 mr-2" />
            Search {activeTab === "flights" ? "Flights" : "Hotels"} + Safety Info
          </Button>
        </div>
      </Tabs>
    </div>
  );
};

export default SearchBar;
