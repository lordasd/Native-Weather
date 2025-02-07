import Constants from 'expo-constants';

interface ExtraConfig {
    weatherApiKey: string;
    geoApifyKey: string;
}

const extra = Constants.expoConfig?.extra as ExtraConfig;

if (!extra?.weatherApiKey) {
    throw new Error('WEATHERAPI_KEY was not found in app config');
}

if (!extra?.geoApifyKey) {
    throw new Error('GEOAPIFY_KEY was not found in app config');
}

export const WEATHERAPI_KEY = extra.weatherApiKey;
export const GEOAPIFY_KEY = extra.geoApifyKey;