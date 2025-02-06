// HomeScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { WeatherData } from '@/src/types/weather';
import WeatherChart from '@/src/components/WeatherChart';
import WeatherMetrics from '@/src/components/WeatherMetrics';
import WeatherWeekly from '@/src/components/WeatherWeekly';
import LottieView from 'lottie-react-native';
import getWeatherAnimation from '@/src/utils/weatherAnimation';
import CurrentWeather from './CurrentWeather';
import getLocation from '../utils/location';
import getWeather from '../api/weather';
import { getCoordinatesFromName } from '../utils/geocoding';

type HomeScreenRouteParams = {
    address?: string;
};

const HomeScreen = () => {
  // If an "address" param is passed in (from the drawer), use that; otherwise, it remains undefined.
  const route = useRoute<RouteProp<{ params: HomeScreenRouteParams }, 'params'>>();
  const { address } = route.params;

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animation = useRef<LottieView>(null);

  // Fetch weather data given coordinates
  const fetchWeather = async (lat: number, lon: number) => {
    setError(null);
    setIsRefreshing(true);
    try {
      const weatherData = await getWeather(lat, lon);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRefreshing(false);
    }
  };

  // If an address is provided via route params, use geocoding;
  // otherwise, fall back to using the device's current location.
  const fetchWeatherData = async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      if (address) {
        // Geocode the address to get coordinates
        const { latitude, longitude } = await getCoordinatesFromName(address);
        await fetchWeather(latitude, longitude);
      } else {
        // Use the current device location
        const locationData = await getLocation();
        if (!locationData) throw new Error('Unable to get location');
        await fetchWeather(locationData.latitude, locationData.longitude);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    void fetchWeatherData();
    // Auto-play background animation on mount
    animation.current?.play();
  }, [address]); // Re-run if the route param "address" changes

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {weather ? (
        <>
          {/* Background Animation */}
          <LottieView
            autoPlay
            loop
            ref={animation}
            style={styles.backgroundAnimation}
            source={getWeatherAnimation(weather.weather.description)}
          />
          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.weatherContainer}>
              <CurrentWeather
                weather={weather}
                isRefreshing={isRefreshing}
                fetchLocationAndWeather={fetchWeatherData}
              />
              <WeatherChart hourlyForecast={weather.hourlyForecast} />
              <WeatherMetrics weather={weather} />
              <WeatherWeekly hourlyForecast={weather.hourlyForecast} />
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading weather...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundAnimation: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});

export default HomeScreen;
