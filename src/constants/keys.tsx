import Constants from 'expo-constants';

interface ExtraConfig {
  apiKey: string;
}

const extra = Constants.expoConfig?.extra as ExtraConfig;

if (!extra?.apiKey) {
  throw new Error('API_KEY was not found in app config');
}

export const API_KEY = extra.apiKey;