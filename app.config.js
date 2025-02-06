import 'dotenv/config';

if (!process.env.WEATHERAPI_KEY ) {
    throw new Error('WEATHERAPI_KEY is missing from .env file');
}
if (!process.env.GEOAPIFY_KEY ) {
    throw new Error('GEOAPIFY_KEY is missing from .env file');
}

export default {
    expo: {
        name: "native-demo",
        slug: "native-demo",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./src/assets/images/icon.png",
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: "./src/assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff"
            }
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: ".src/assets/images/favicon.png"
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./src/assets/images/splash-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#ffffff"
                }
            ]
        ],
        experiments: {
            typedRoutes: true
        },
        extra: {
            weatherApiKey: process.env.WEATHERAPI_KEY,
            geoApifyKey: process.env.GEOAPIFY_KEY,
        },
    }
};