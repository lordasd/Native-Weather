import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.API_KEY;

if (!API_KEY) {
    console.error("API_KEY was not found in Constants.expoConfig.extra");
}

export { API_KEY };