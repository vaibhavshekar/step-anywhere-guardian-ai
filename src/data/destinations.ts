
// Define the destination interface
export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  safetyLevel: 'safe' | 'moderate' | 'unsafe';
  safetyReason?: string;
  flightPrice?: number;
  hotelPrice?: number;
  popularityScore?: number;
  currentEvents?: string[];
}

// Sample destinations data
export const featuredDestinations: Destination[] = [{
  id: '1',
  name: 'Paris',
  country: 'France',
  image: 'https://images.unsplash.com/photo-1499856871958-5b9357976b82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  safetyLevel: 'moderate',
  safetyReason: 'Exercise caution due to occasional protests and pickpocketing in tourist areas.',
  flightPrice: 499,
  hotelPrice: 120,
  popularityScore: 9.2,
  currentEvents: ['Fashion Week', 'Museum Exhibition']
}, {
  id: '2',
  name: 'Tokyo',
  country: 'Japan',
  image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80',
  safetyLevel: 'safe',
  safetyReason: 'Very low crime rate and excellent healthcare facilities.',
  flightPrice: 899,
  hotelPrice: 150,
  popularityScore: 9.5,
  currentEvents: ['Cherry Blossom Festival', 'Tech Expo']
}, {
  id: '3',
  name: 'Cairo',
  country: 'Egypt',
  image: 'https://images.unsplash.com/photo-1568322445389-f9e7bd640ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
  safetyLevel: 'moderate',
  safetyReason: 'Avoid certain areas and follow local guidance. Tourist areas have increased security.',
  flightPrice: 599,
  hotelPrice: 75,
  popularityScore: 7.8,
  currentEvents: ['Archaeological Exhibition']
}, {
  id: '4',
  name: 'Bali',
  country: 'Indonesia',
  image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1038&q=80',
  safetyLevel: 'safe',
  safetyReason: 'Generally safe with friendly locals. Some areas have natural hazards like rip tides.',
  flightPrice: 799,
  hotelPrice: 90,
  popularityScore: 8.9,
  currentEvents: ['Cultural Festival', 'Surf Competition']
}, {
  id: '5',
  name: 'New York',
  country: 'United States',
  image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  safetyLevel: 'moderate',
  safetyReason: 'Exercise normal precautions in tourist areas. Some neighborhoods require extra vigilance.',
  flightPrice: 349,
  hotelPrice: 200,
  popularityScore: 9.0,
  currentEvents: ['Broadway Shows', 'Art Exhibitions']
}, {
  id: '6',
  name: 'Bangkok',
  country: 'Thailand',
  image: 'https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1450&q=80',
  safetyLevel: 'moderate',
  safetyReason: 'Be aware of scams targeting tourists and exercise caution in crowded areas.',
  flightPrice: 699,
  hotelPrice: 60,
  popularityScore: 8.7,
  currentEvents: ['Water Festival', 'Food Fair']
}];
