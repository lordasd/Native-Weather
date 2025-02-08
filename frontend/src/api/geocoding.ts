// src/api/geocoding.ts

import Constants from 'expo-constants';

export type GeocodingFeature = {
    properties: {
        formatted: string;
        name: string;
        country: string;
        state?: string;
        city?: string;
        lat: number;
        lon: number;
        [key: string]: any;
    };
};

export type GeocodingResult = {
    latitude: number;
    longitude: number;
    formatted: string;
    country: string;
    city?: string;
    state?: string;
};


const { API_BASE_URL } = Constants.expoConfig?.extra || {};

export const geocodingService = {
    // Search for locations with autocomplete
    searchLocations: async (query: string, limit: number = 5): Promise<GeocodingFeature[]> => {
        if (query.trim().length < 2) {
            return [];
        }

        try {
            const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}&limit=${limit}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch locations');
            }

            const data = await response.json();
            return data.features || [];
        } catch (error) {
            console.error('Error searching locations:', error);
            throw new Error('Failed to search locations');
        }
    },

    getCoordinates: async (address: string): Promise<GeocodingResult> => {
        const features = await geocodingService.searchLocations(address, 1);

        if (features.length === 0) {
            throw new Error('No location found');
        }

        const { lat, lon, formatted, country, city, state } = features[0].properties;

        return {
            latitude: lat,
            longitude: lon,
            formatted,
            country,
            city,
            state
        };
    }
};