
// CSV data utility functions for parsing and filtering hotel and flight data

export interface HotelData {
  countyCode: string;
  countyName: string;
  cityCode: string;
  cityName: string;
  HotelCode: string;
  hotel_name: string;
  HotelRating: number;
  Address: string;
  Attractions: string;
  Description: string;
  FaxNumber: string;
  HotelFacilities: string;
  Map: string;
  PhoneNumber: string;
  PinCode: string;
  HotelWebsiteUrl: string;
}

export interface FlightData {
  id: string;
  year: number;
  month: number;
  day: number;
  dep_time: string;
  sched_dep_time: string;
  dep_delay: number;
  arr_time: string;
  sched_arr_time: string;
  arr_delay: number;
  carrier: string;
  flight: string;
  tailnum: string;
  origin: string;
  dest: string;
  air_time: number;
  distance: number;
  hour: number;
  minute: number;
  time_hour: string;
  name: string;
}

// Parse CSV content into array of objects
export const parseCSV = (csvContent: string): any[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(header => header.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(value => value.trim().replace(/"/g, ''));
    const obj: any = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  });
};

// Search hotels by location
export const searchHotels = (
  hotelsData: HotelData[], 
  location: string, 
  checkIn: string, 
  checkOut: string
): HotelData[] => {
  if (!hotelsData || hotelsData.length === 0) return [];
  
  const searchTerm = location.toLowerCase();
  
  return hotelsData.filter(hotel => 
    hotel.cityName.toLowerCase().includes(searchTerm) ||
    hotel.countyName.toLowerCase().includes(searchTerm) ||
    hotel.hotel_name.toLowerCase().includes(searchTerm)
  ).slice(0, 10); // Limit to 10 results for performance
};

// Search flights by origin and destination
export const searchFlights = (
  flightsData: FlightData[],
  origin: string,
  destination: string,
  departureDate: string
): FlightData[] => {
  if (!flightsData || flightsData.length === 0) return [];
  
  const originTerm = origin.toLowerCase();
  const destTerm = destination.toLowerCase();
  
  return flightsData.filter(flight => 
    (flight.origin.toLowerCase().includes(originTerm) || 
     flight.origin.toLowerCase() === originTerm.substring(0, 3)) &&
    (flight.dest.toLowerCase().includes(destTerm) || 
     flight.dest.toLowerCase() === destTerm.substring(0, 3))
  ).slice(0, 10); // Limit to 10 results for performance
};

// Generate mock prices for demonstration (in real scenario, you'd have price data)
export const generateMockPrice = (type: 'hotel' | 'flight', seed: string): number => {
  const hash = seed.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  if (type === 'hotel') {
    return Math.abs(hash % 300) + 80; // Hotel prices between $80-$380
  } else {
    return Math.abs(hash % 500) + 150; // Flight prices between $150-$650
  }
};

// Format time from HHMM to HH:MM
export const formatTime = (time: string): string => {
  if (!time || time.length < 3) return time;
  const hours = time.slice(0, -2).padStart(2, '0');
  const minutes = time.slice(-2);
  return `${hours}:${minutes}`;
};

// Calculate flight duration in hours and minutes
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
