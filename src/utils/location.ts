import * as Location from 'expo-location';

export default async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log("Permission denied");
        return;
    }
    
    let location = await Location.getCurrentPositionAsync({});
    return location.coords;
}