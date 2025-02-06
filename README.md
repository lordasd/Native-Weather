# Native-Weather App

A simple and intuitive weather application built with React Native and Expo.  This app allows users to view current weather conditions and forecasts for multiple locations, including their current location.  Locations can be easily added and managed through a user-friendly drawer navigation.

## Features

- **Current Weather:** Displays current temperature, feels-like temperature, weather description, humidity, wind speed, sunrise, and sunset times.
- **Hourly Forecast:** Provides an hourly forecast for the next 8 hours, including temperature and weather icons.
- **Weekly Forecast:** Shows a 5-day forecast with daily high and low temperatures and weather icons.
- **Multiple Locations:** Users can add and manage multiple locations to view weather information for different places.
- **Location Search:** Integrated search functionality to easily find and add new locations using Geoapify.
- **Animated Weather Icons:** Dynamic background animations based on the current weather conditions.
- **Refresh Functionality:** A refresh button allows users to update weather data on demand.
- **Drawer Navigation:** Easy access to added locations through a drawer navigation menu.
- **Current Location:** Automatically detects and displays weather for the user's current location.

## Screenshots

<div style="display: flex; flex-wrap: wrap; justify-content: center;"> 
  <img src="/src/assets/images/screenshots/loading-app.png" alt="Loading Screen" width="250" style="margin: 5px;">
  <img src="/src/assets/images/screenshots/main-screen.png" alt="Main Screen" width="250" style="margin: 5px;">
  <img src="/src/assets/images/screenshots/add-location.png" alt="Add Location" width="250" style="margin: 5px;">
</div>

## Technologies

- **React Native:**  A framework for building native mobile apps using JavaScript.
- **Expo:** A framework and platform for universal React apps.
- **OpenWeatherMap API:**  Provides weather data.
- **Geoapify API:** Provides geocoding services for location search.
- **Lottie:** Used for animated weather icons.
- **React Navigation:** Used for navigation between screens.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lordasd/native-weather.git

2.  **Navigate to the project directory:**

    ```bash
    cd native-weather
    ```

3.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

4.  **Install Expo CLI (if you don't have it already):**

    ```bash
    npm install -g expo-cli
    ```

## Usage

1.  **Set up Environment Variables:**  Create a `.env` file in the root of the project and add your API keys (see [Environment Variables](https://www.google.com/url?sa=E&source=gmail&q=#environment-variables) section for details).

2.  **Start the development server:**

    ```bash
    npx expo start  # or expo start
    ```

3.  **Run the app on a simulator or physical device:** Follow the instructions provided by Expo CLI to run the app.


## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
WEATHERAPI_KEY=your_openweather_api_key
GEOAPIFY_KEY=your_geoapify_api_key
```

Replace `your_openweather_api_key` and `your_geoapify_api_key` with your actual API keys.  You will need to obtain these keys from the respective API providers.

## Contributing

Contributions are welcome\! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
