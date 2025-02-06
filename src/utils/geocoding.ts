// src/utils/geocoding.ts
import {GEOAPIFY_KEY} from "../constants/keys";


type GeocodingResult = {
    latitude: number;
    longitude: number;
    formatted: string;
    country: string;
    city?: string;
    state?: string;
};

export const getCoordinatesFromName = async (address: string): Promise<GeocodingResult> => {
    try {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${GEOAPIFY_KEY}&limit=1`;

        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`Geocoding failed: ${response.statusText}`);

        const data = await response.json();

        if (!data.features || data.features.length === 0)
            throw new Error('No location found');

        const {lat, lon, formatted, country, city, state} = data.features[0].properties;

        return {
            latitude: lat,
            longitude: lon,
            formatted,
            country,
            city,
            state
        };
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to geocode address');
    }
};