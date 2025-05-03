
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import DestinationCard from '@/components/DestinationCard';
import SafetyIndicator from '@/components/SafetyIndicator';
import BadgeDisplay from '@/components/BadgeDisplay';
import AIAssistant from '@/components/AIAssistant';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  MapPin, 
  Ticket, 
  Map, 
  Bell, 
  BadgeCheck,
  Globe, 
  Sparkles, 
  Users
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Sample data
const featuredDestinations = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9357976b82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    safetyLevel: 'moderate' as const,
    safetyReason: 'Exercise caution due to occasional protests and pickpocketing in tourist areas.',
    flightPrice: 499,
    hotelPrice: 120,
    popularityScore: 9.2,
    currentEvents: ['Fashion Week', 'Museum Exhibition']
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80',
    safetyLevel: 'safe' as const,
    safetyReason: 'Very low crime rate and excellent healthcare facilities.',
    flightPrice: 899,
    hotelPrice: 150,
    popularityScore: 9.5,
    currentEvents: ['Cherry Blossom Festival', 'Tech Expo']
  },
  {
    id: '3',
    name: 'Cairo',
    country: 'Egypt',
    image: 'https://images.unsplash.com/photo-1568322445389-f9e7bd640ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    safetyLevel: 'moderate' as const,
    safetyReason: 'Avoid certain areas and follow local guidance. Tourist areas have increased security.',
    flightPrice: 599,
    hotelPrice: 75,
    popularityScore: 7.8,
    currentEvents: ['Archaeological Exhibition']
  },
  {
    id: '4',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1038&q=80',
    safetyLevel: 'safe' as const,
    safetyReason: 'Generally safe with friendly locals. Some areas have natural hazards like rip tides.',
    flightPrice: 799,
    hotelPrice: 90,
    popularityScore: 8.9,
    currentEvents: ['Cultural Festival', 'Surf Competition']
  }
];

const sampleBadges = [
  {
    id: '1',
    type: 'visit' as const,
    title: 'Paris Explorer',
    description: 'Visited Paris, France',
    icon: 'location' as const,
    earned: true,
    date: 'May 2024'
  },
  {
    id: '2',
    type: 'comment' as const,
    title: 'Helpful Guide',
    description: 'Left 5 helpful comments',
    icon: 'comment' as const,
    earned: true,
    date: 'April 2024'
  },
  {
    id: '3',
    type: 'visit' as const,
    title: 'Tokyo Traveler',
    description: 'Visited Tokyo, Japan',
    icon: 'location' as const,
    earned: false
  },
  {
    id: '4',
    type: 'comment' as const,
    title: 'Safety Expert',
    description: 'Left 10 safety tips',
    icon: 'comment' as const,
    earned: false
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-purple-light/20 to-brand-blue-light/30 pt-16 pb-24 px-4">
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
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Step Anywhere combines travel bookings with real-time safety information, 
            current events, and personalized recommendations for your worry-free adventure.
          </p>
          
          <SearchBar />
        </div>
        
        {/* Features Pills */}
        <div className="container max-w-4xl mx-auto mt-12">
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-brand-purple mr-2" />
              <span className="text-sm font-medium">Safety Ratings</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <Bell className="h-5 w-5 text-brand-purple mr-2" />
              <span className="text-sm font-medium">Event Alerts</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <Ticket className="h-5 w-5 text-brand-purple mr-2" />
              <span className="text-sm font-medium">Flight Booking</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
              <BadgeCheck className="h-5 w-5 text-brand-purple mr-2" />
              <span className="text-sm font-medium">Travel Badges</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safety Overview Section */}
      <div className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Keep You Safe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Step Anywhere goes beyond standard travel booking by providing essential 
              safety information and real-time updates for your peace of mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-brand-purple/5 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Destination Ratings</h3>
              <p className="text-gray-600">
                Every destination is carefully rated based on current safety data, 
                health risks, natural hazards, and local conditions.
              </p>
            </div>
            
            <div className="bg-brand-purple/5 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Alerts</h3>
              <p className="text-gray-600">
                Stay informed about current events, weather conditions, 
                transportation disruptions, and safety advisories.
              </p>
            </div>
            
            <div className="bg-brand-purple/5 rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Insights</h3>
              <p className="text-gray-600">
                Access traveler experiences and safety tips from our community 
                to make informed decisions about your next adventure.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Destinations */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Destinations</h2>
            <Button variant="outline" className="hidden md:flex">
              <Globe className="h-4 w-4 mr-2" /> 
              View All Destinations
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map(destination => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Button variant="outline">
              <Globe className="h-4 w-4 mr-2" /> 
              View All Destinations
            </Button>
          </div>
        </div>
      </div>
      
      {/* Badge Showcase */}
      <div className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Earn Travel Badges</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Collect badges by visiting new places and sharing helpful information with fellow travelers.
              Build your profile and showcase your travel experiences.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-12 h-12 rounded-full bg-brand-purple/20 flex items-center justify-center">
                  <BadgeCheck className="h-6 w-6 text-brand-purple" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Your Travel Collection</h3>
                  <p className="text-sm text-gray-500">2 badges earned</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-brand-purple border-brand-purple/30 hover:bg-brand-purple/10">
                <Sparkles className="h-4 w-4 mr-2" /> 
                View All Badges
              </Button>
            </div>
            
            <Separator className="mb-6" />
            
            <BadgeDisplay badges={sampleBadges} />
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 px-4 bg-gradient-to-br from-brand-purple-light/30 to-brand-blue-light/40">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Step Anywhere?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Start exploring with confidence knowing you have up-to-date safety information
            and personalized recommendations for your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white">
              <Map className="h-4 w-4 mr-2" /> Explore Safe Destinations
            </Button>
            <Button variant="outline">
              <Ticket className="h-4 w-4 mr-2" /> Book a Flight
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
