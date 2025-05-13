
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAssistant from '@/components/AIAssistant';
import DestinationCard from '@/components/DestinationCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ShieldCheck, Search, MapPin, Globe } from 'lucide-react';
import { featuredDestinations, Destination } from '@/data/destinations';

const DestinationsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [safetyFilter, setSafetyFilter] = useState<string>('all');
  const [region, setRegion] = useState<string>('all');

  // Filter destinations based on search term and filters
  const filteredDestinations = featuredDestinations.filter((destination) => {
    const matchesSearch = 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSafety = 
      safetyFilter === 'all' || 
      destination.safetyLevel === safetyFilter;
    
    // In a real app, we'd have region data. For now, all match
    const matchesRegion = true;
    
    return matchesSearch && matchesSafety && matchesRegion;
  });

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
                      placeholder="Search destinations or countries" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                  <Button className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white">
                    <Search className="h-4 w-4 mr-2" />
                    Filter Results
                  </Button>
                </div>
              </div>
            </div>
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
