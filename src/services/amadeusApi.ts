
const AMADEUS_API_KEY = 'xNb1OTjIK17JNZNdMMWCTkDHTquop50O';
const AMADEUS_BASE_URL_HOTELS = 'https://test.api.amadeus.com/v3';
const AMADEUS_BASE_URL_FLIGHTS = 'https://test.api.amadeus.com/v2';

// Get access token for Amadeus API
const getAccessToken = async (): Promise<string> => {
  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: AMADEUS_API_KEY,
      client_secret: AMADEUS_API_KEY, // Note: In production, you'd have separate client_secret
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
};

// Search hotels using Amadeus API
export const searchAmadeusHotels = async (
  cityCode: string,
  checkInDate: string,
  checkOutDate: string,
  adults: number = 2
) => {
  try {
    const token = await getAccessToken();
    
    const params = new URLSearchParams({
      cityCode: cityCode.toUpperCase(),
      checkInDate,
      checkOutDate,
      adults: adults.toString(),
      currency: 'USD',
      hotelSource: 'ALL',
    });

    const response = await fetch(`${AMADEUS_BASE_URL_HOTELS}/shopping/hotel-offers?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Hotel search failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};

// Search flights using Amadeus API
export const searchAmadeusFlights = async (
  originCode: string,
  destinationCode: string,
  departureDate: string,
  adults: number = 1,
  returnDate?: string
) => {
  try {
    const token = await getAccessToken();
    
    const params = new URLSearchParams({
      originLocationCode: originCode.toUpperCase(),
      destinationLocationCode: destinationCode.toUpperCase(),
      departureDate,
      adults: adults.toString(),
      currencyCode: 'USD',
      max: '10',
    });

    if (returnDate) {
      params.append('returnDate', returnDate);
    }

    const response = await fetch(`${AMADEUS_BASE_URL_FLIGHTS}/shopping/flight-offers?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Flight search failed: ${response.statusText}`);
    }

    const data = await response.json();
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
  const durationMatch = duration.match(/PT(\d+H)?(\d+M)?/);
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
