
import { useState, useEffect } from 'react';
import { parseCSV, HotelData, FlightData } from '@/utils/csvDataUtils';

export const useCSVData = () => {
  const [hotelsData, setHotelsData] = useState<HotelData[]>([]);
  const [flightsData, setFlightsData] = useState<FlightData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        setLoading(true);
        
        // For now, we'll use a sample subset of data since we don't have the actual CSV files uploaded
        // In a real implementation, you would fetch the CSV files from your server or upload them
        
        // Mock sample data structure based on your CSV schema
        const sampleHotels: HotelData[] = [
          {
            countyCode: 'US',
            countyName: 'United States',
            cityCode: 'NYC',
            cityName: 'New York',
            HotelCode: 'NYC001',
            hotel_name: 'Grand Central Hotel',
            HotelRating: 4,
            Address: '123 Main St, New York, NY',
            Attractions: 'Central Park, Times Square',
            Description: 'Luxury hotel in downtown Manhattan',
            FaxNumber: '+1-555-0123',
            HotelFacilities: 'WiFi, Pool, Gym, Restaurant',
            Map: '40.7589,-73.9851',
            PhoneNumber: '+1-555-0124',
            PinCode: '10001',
            HotelWebsiteUrl: 'https://grandcentral.com'
          },
          {
            countyCode: 'US',
            countyName: 'United States',
            cityCode: 'LAX',
            cityName: 'Los Angeles',
            HotelCode: 'LAX001',
            hotel_name: 'Beverly Hills Resort',
            HotelRating: 5,
            Address: '456 Sunset Blvd, Los Angeles, CA',
            Attractions: 'Hollywood, Beverly Hills',
            Description: 'Premium resort in Beverly Hills',
            FaxNumber: '+1-555-0125',
            HotelFacilities: 'WiFi, Pool, Spa, Restaurant, Valet',
            Map: '34.0522,-118.2437',
            PhoneNumber: '+1-555-0126',
            PinCode: '90210',
            HotelWebsiteUrl: 'https://beverlyhillsresort.com'
          }
        ];

        const sampleFlights: FlightData[] = [
          {
            id: '1',
            year: 2024,
            month: 12,
            day: 15,
            dep_time: '0815',
            sched_dep_time: '0800',
            dep_delay: 15,
            arr_time: '1030',
            sched_arr_time: '1015',
            arr_delay: 15,
            carrier: 'AA',
            flight: 'AA1234',
            tailnum: 'N123AA',
            origin: 'NYC',
            dest: 'LAX',
            air_time: 315,
            distance: 2475,
            hour: 8,
            minute: 0,
            time_hour: '2024-12-15 08:00:00',
            name: 'American Airlines'
          },
          {
            id: '2',
            year: 2024,
            month: 12,
            day: 15,
            dep_time: '1045',
            sched_dep_time: '1030',
            dep_delay: 15,
            arr_time: '1315',
            sched_arr_time: '1300',
            arr_delay: 15,
            carrier: 'DL',
            flight: 'DL5678',
            tailnum: 'N456DL',
            origin: 'NYC',
            dest: 'LAX',
            air_time: 330,
            distance: 2475,
            hour: 10,
            minute: 30,
            time_hour: '2024-12-15 10:30:00',
            name: 'Delta Airlines'
          }
        ];

        setHotelsData(sampleHotels);
        setFlightsData(sampleFlights);
        setError(null);
      } catch (err) {
        setError('Failed to load CSV data');
        console.error('Error loading CSV data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCSVData();
  }, []);

  return { hotelsData, flightsData, loading, error };
};
