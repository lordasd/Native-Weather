import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import HomeScreen from '../../../components/HomeScreen'; // your HomeScreen component
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '@/src/components/navigation/CustomDrawerContent'; // see next step

const Drawer = createDrawerNavigator();

// Define the type for a location
export type Location = {
  name: string;
  // If provided, the HomeScreen will use this string to geocode the location.
  address?: string;
};

const App = () => {
  // "My Location" is always present; it will use the device's location (no address)
  const [locations, setLocations] = useState<Location[]>([
    { name: 'My Location' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="skyblue" barStyle="dark-content" />
      <Drawer.Navigator
        initialRouteName="My Location"
        // Pass the locations and setter to our custom drawer content.
        drawerContent={(props) => (
          <CustomDrawerContent {...props} locations={locations} setLocations={setLocations} />
        )}
      >
        {locations.map((loc) => (
          <Drawer.Screen
            key={loc.name}
            name={loc.name}
            component={HomeScreen}
            // If the location has an address, pass it as a param.
            initialParams={loc.address ? { address: loc.address } : {}}
          />
        ))}
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'powderblue', // sets the background color for the entire app
  },
});

export default App;
