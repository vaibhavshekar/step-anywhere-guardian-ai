const AMADEUS_API_KEY = 'xNb1OTjIK17JNZNdMMWCTkDHTquop50O';
const AMADEUS_CLIENT_SECRET = 'RX5jCftISZiXPlh6';
const AMADEUS_BASE_URL_HOTELS = 'https://test.api.amadeus.com';
const AMADEUS_BASE_URL_FLIGHTS = 'https://test.api.amadeus.com/v2';

// Get access token for Amadeus API
const getAccessToken = async (): Promise<string> => {
  console.log('Requesting Amadeus access token...');
  
  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: AMADEUS_API_KEY,
      client_secret: AMADEUS_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Token request failed:', errorData);
    throw new Error(`Failed to get access token: ${errorData.error_description || response.statusText}`);
  }

  const data = await response.json();
  console.log('Access token obtained successfully');
  return data.access_token;
};

// Utility function to convert date format with validation
const convertToAmadeusDateFormat = (dateString: string): string => {
  // Already in correct format
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;

  // Handle MM/DD/YYYY or DD/MM/YYYY formats
  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts.length !== 3) throw new Error(`Invalid date format: ${dateString}. Use YYYY-MM-DD, MM/DD/YYYY, or DD/MM/YYYY.`);
    
    // Detect format (if first part > 12, it's DD/MM/YYYY)
    if (parseInt(parts[0]) > 12 && parseInt(parts[1]) <= 12) {
      return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
    // Default to MM/DD/YYYY
    return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
  }
  
  throw new Error(`Invalid date format: ${dateString}. Use YYYY-MM-DD, MM/DD/YYYY, or DD/MM/YYYY.`);
};

// Validate date range
const validateDateRange = (checkInDate: string, checkOutDate: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time component
  
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  console.log(checkIn, checkOut);

  if (checkIn >= checkOut) {
    throw new Error("checkOutDate must be after checkInDate");
  }

  if (checkIn < today) {
    throw new Error("checkInDate cannot be in the past");
  }
};

// Search hotels using Hotel List API
export const searchAmadeusHotels = async (
  cityCode: string,
  checkInDate: string,
  checkOutDate: string,
  adults: number = 2
) => {
  try {
    // Clean and validate city code
    const cleanCityCode = cityCode
      .toUpperCase()
      .replace(/[^A-Z]/g, '') // Remove non-letters
      .substring(0, 3); // Take first 3 letters

    if (cleanCityCode.length !== 3) {
      throw new Error("Invalid city code. Must be 3 letters (e.g., NYC, LON)");
    }
    
    console.log(`Searching hotels in ${cleanCityCode} for ${adults} adults`);
    const token = await getAccessToken();
    
    // Convert dates to Amadeus format
    const formattedCheckInDate = convertToAmadeusDateFormat(checkInDate);
    const formattedCheckOutDate = convertToAmadeusDateFormat(checkOutDate);
    
    // Validate date range
    validateDateRange(formattedCheckInDate, formattedCheckOutDate);
    
    // CORRECTED ENDPOINT - using v1 reference data API
    const params = new URLSearchParams({
      cityCode: cleanCityCode,
      radius: '50', // Default radius in KM
      radiusUnit: 'KM',
      hotelSource: 'ALL'
    });

    console.log('Hotel search params:', params.toString());

    // CORRECTED API ENDPOINT
    const response = await fetch(`${AMADEUS_BASE_URL_HOTELS}/v1/reference-data/locations/hotels/by-city?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Handle API-specific errors
    if (!response.ok) {
      let errorMsg = `Hotel search failed: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.errors?.[0]?.detail || errorMsg;
      } catch (e) {}
      throw new Error(errorMsg);
    }

    const data = await response.json();
    console.log(`Found ${data.data?.length || 0} hotel references`);
    
    // Format hotel data to match our UI expectations
    return data.data.map((hotel: any) => ({
      provider: 'Amadeus',
      price: 0, // Placeholder - actual pricing needs separate offer API
      logo: 'https://via.placeholder.com/40x20?text=Amadeus',
      hotel: {
        name: hotel?.name || 'Unknown Hotel',
        rating: 0, // Placeholder - ratings need separate API
        facilities: '', // Placeholder
        website: `https://amadeus.com/hotel/${hotel?.hotelId}`,
      },
      rawData: hotel,
    }));
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};

// Search flights using Flight Offers Search API
export const searchAmadeusFlights = async (
  originCode: string,
  destinationCode: string,
  departureDate: string,
  adults: number = 1,
  returnDate?: string
) => {
  try {
    // Validate airport codes
    if (!/^[A-Za-z]{3}$/.test(originCode) || !/^[A-Za-z]{3}$/.test(destinationCode)) {
      throw new Error("Invalid airport code. Use 3-letter IATA codes (e.g., 'JFK').");
    }
    
    console.log(`Searching flights from ${originCode} to ${destinationCode} for ${adults} adults`);
    const token = await getAccessToken();
    
    const params = new URLSearchParams({
      originLocationCode: originCode.toUpperCase(),
      destinationLocationCode: destinationCode.toUpperCase(),
      departureDate: convertToAmadeusDateFormat(departureDate),
      adults: adults.toString(),
      currencyCode: 'USD',
      max: '10',
    });

    if (returnDate) {
      params.append('returnDate', convertToAmadeusDateFormat(returnDate));
    }

    console.log('Flight search params:', params.toString());

    const response = await fetch(`${AMADEUS_BASE_URL_FLIGHTS}/shopping/flight-offers?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      let errorMsg = `Flight search failed: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMsg = errorData.errors?.[0]?.detail || errorMsg;
      } catch (e) {}
      throw new Error(errorMsg);
    }

    const data = await response.json();
    console.log(`Found ${data.data?.length || 0} flight offers`);
    return data.data || [];
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

// Format Amadeus hotel data for our UI
export const formatAmadeusHotelData = (hotelOffer: any) => {
  const hotel = hotelOffer.hotel;
  const offer = hotelOffer.offers?.[0];
  
  return {
    provider: 'Amadeus',
    price: offer?.price?.total ? parseFloat(offer.price.total) : 0,
    logo: 'https://via.placeholder.com/40x20?text=Amadeus',
    hotel: {
      name: hotel?.name || 'Unknown Hotel',
      rating: hotel?.rating || 0,
      facilities: hotel?.amenities?.join(', ') || '',
      website: `https://amadeus.com/hotel/${hotel?.hotelId}`,
    },
    rawData: hotelOffer,
  };
};

// Format Amadeus flight data for our UI
export const formatAmadeusFlightData = (flightOffer: any) => {
  const firstSegment = flightOffer.itineraries?.[0]?.segments?.[0];
  const lastSegment = flightOffer.itineraries?.[0]?.segments?.slice(-1)[0];
  const price = flightOffer.price?.total ? parseFloat(flightOffer.price.total) : 0;
  
  // Calculate duration
  const duration = flightOffer.itineraries?.[0]?.duration || 'PT0H0M';
  const durationMatch = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  const hours = durationMatch?.[1] ? parseInt(durationMatch[1]) : 0;
  const minutes = durationMatch?.[2] ? parseInt(durationMatch[2]) : 0;
  const formattedDuration = `${hours}h ${minutes}m`;
  
  return {
    provider: firstSegment?.carrierCode || 'Unknown',
    price,
    logo: `https://via.placeholder.com/40x20?text=${firstSegment?.carrierCode}`,
    duration: formattedDuration,
    stops: (flightOffer.itineraries?.[0]?.segments?.length || 1) - 1,
    departureTime: firstSegment?.departure?.at ? new Date(firstSegment.departure.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
    arrivalTime: lastSegment?.arrival?.at ? new Date(lastSegment.arrival.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '',
    rawData: flightOffer,
  };
};