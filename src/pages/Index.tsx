
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import DestinationCard from '@/components/DestinationCard';
import SafetyIndicator from '@/components/SafetyIndicator';
import BadgeDisplay from '@/components/BadgeDisplay';
import AIAssistant from '@/components/AIAssistant';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShieldCheck, MapPin, Ticket, Map, Bell, BadgeCheck, Globe, Sparkles, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Import data from our data file
import { featuredDestinations } from '@/data/destinations';

// Sample badges data
const sampleBadges = [{
  id: '1',
  type: 'visit' as const,
  title: 'Paris Explorer',
  description: 'Visited Paris, France',
  icon: 'location' as const,
  earned: true,
  date: 'May 2024'
}, {
  id: '2',
  type: 'comment' as const,
  title: 'Helpful Guide',
  description: 'Left 5 helpful comments',
  icon: 'comment' as const,
  earned: true,
  date: 'April 2024'
}, {
  id: '3',
  type: 'visit' as const,
  title: 'Tokyo Traveler',
  description: 'Visited Tokyo, Japan',
  icon: 'location' as const,
  earned: false
}, {
  id: '4',
  type: 'comment' as const,
  title: 'Safety Expert',
  description: 'Left 10 safety tips',
  icon: 'comment' as const,
  earned: false
}];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-purple-light/20 to-brand-blue-light/30 dark:from-brand-purple/10 dark:to-brand-blue-light/10 pt-16 pb-24 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 transition-colors">
            <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> 
            Travel Safely with Confidence
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Explore the World with <br />
            <span className="bg-gradient-to-r from-brand-purple to-brand-purple-dark bg-clip-text text-transparent">
              Safety Insights
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Step Anywhere combines travel bookings with real-time safety information, current events, and personalized recommendations for your worry-free adventure.
          </p>
          
          <SearchBar />
        </div>
        
        {/* Features Pills */}
        <div className="container max-w-4xl mx-auto mt-12">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-brand-purple mr-2" />
              <span className="text-sm font-medium">Safety Ratings</span>
            </div>
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <Bell className="h-5 w-5 text-brand-purple mr-2" />
              <span className="text-sm font-medium">Event Alerts</span>
            </div>
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <Ticket className="h-5 w-5 text-brand-purple mr-2" />
              <span className="text-sm font-medium">Flight Booking</span>
            </div>
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <BadgeCheck className="h-5 w-5 text-brand-purple mr-2" />
              <span className="text-sm font-medium">Travel Badges</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safety Overview Section */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Keep You Safe</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Step Anywhere goes beyond standard travel booking by providing essential 
              safety information and real-time updates for your peace of mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-purple/5 dark:bg-brand-purple/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Destination Ratings</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every destination is carefully rated based on current safety data, 
                health risks, natural hazards, and local conditions.
              </p>
            </div>
            
            <div className="bg-brand-purple/5 dark:bg-brand-purple/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Alerts</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Stay informed about current events, weather conditions, 
                transportation disruptions, and safety advisories.
              </p>
            </div>
            
            <div className="bg-brand-purple/5 dark:bg-brand-purple/10 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-purple/10 dark:bg-brand-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Insights</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access traveler experiences and safety tips from our community 
                to make informed decisions about your next adventure.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Destinations */}
      <div className="py-16 px-4 bg-amber-100 dark:bg-amber-900/20">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Destinations</h2>
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link to="/destinations">
                <Globe className="h-4 w-4 mr-2" /> 
                View All Destinations
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.slice(0, 4).map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link to="/destinations">
                <Globe className="h-4 w-4 mr-2" /> 
                View All Destinations
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Badge Showcase */}
      <div className="py-16 px-4 bg-white dark:bg-gray-900">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Earn Travel Badges</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Collect badges by visiting new places and sharing helpful information with fellow travelers.
              Build your profile and showcase your travel experiences.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <BadgeCheck className="h-6 w-6 text-brand-purple" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Your Travel Collection</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2 badges earned</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-brand-purple border-brand-purple/30 hover:bg-brand-purple/10"
                asChild
              >
                <Link to="/badges">
                  <Sparkles className="h-4 w-4 mr-2" /> 
                  View All Badges
                </Link>
              </Button>
            </div>
            
            <Separator className="mb-6" />
            
            <BadgeDisplay badges={sampleBadges} />
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-4 bg-gradient-to-br from-brand-purple-light/30 to-brand-blue-light/40 dark:from-brand-purple/20 dark:to-brand-blue-light/20">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Step Anywhere?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 max-w-2xl mx-auto">
            Start exploring with confidence knowing you have up-to-date safety information
            and personalized recommendations for your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white" asChild>
              <Link to="/destinations">
                <Map className="h-4 w-4 mr-2" /> Explore Safe Destinations
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/flights">
                <Ticket className="h-4 w-4 mr-2" /> Book a Flight
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Index;
