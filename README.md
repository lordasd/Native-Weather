# Native-Weather App

A simple and intuitive weather application built with React Native and Expo. This app allows users to view current weather conditions and forecasts for multiple locations, including their current location. Locations can be easily added and managed through a user-friendly drawer navigation.

> **Note:** The project now consists of two parts: a **Frontend** (React Native/Expo) and a **Backend** (Node.js/Express). The frontend no longer holds sensitive API keys. Instead, all API keys are now managed on the backend.

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

## Architecture Overview

This project consists of two main components:

1. **Frontend:**  
   Built with React Native and Expo. It fetches data from the backend rather than directly calling external APIs.  
   **Important:** You need to configure the API base URL in the frontend via a `.env` file to point to your local machine’s IP address (obtained via `ipconfig` on Windows or `ifconfig` on macOS/Linux) until you deploy a production server.

2. **Backend:**  
   Built with Node.js and Express, the backend handles calls to external APIs (OpenWeatherMap and Geoapify) and serves the processed data to the frontend. All sensitive API keys are stored in a `.env` file in the backend.

## Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lordasd/native-weather.git
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd native-weather/frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install  # or yarn install
   ```

4. **Create a `.env` file with your API Base URL:**

   In the frontend directory, create a file named `.env` and add the following line:
   ```env
   API_BASE_URL=http://YOUR_LOCAL_IP:5000/api
   ```
   Replace `YOUR_LOCAL_IP` with your actual local machine’s IP address. (You can find it by running `ipconfig` on Windows or `ifconfig` on macOS/Linux.) This configuration allows your app to fetch data from your backend server. Each developer will need to update this value until a production server is deployed.

   > **Note:**  
   > To use environment variables in your Expo app, consider using a Babel plugin like `react-native-dotenv` or configure your `app.config.js`/`app.config.ts` to load these values. For example, you might import your variable like:
   > ```js
   > import { API_BASE_URL } from '@env';
   > ```
   > Make sure to follow the plugin’s setup instructions if you choose this method.

5. **Start the development server:**
   ```bash
   npx expo start  # or expo start
   ```

6. **Run the app on a simulator or physical device:**  
   Follow the instructions provided by Expo CLI.

## Backend Setup

The backend handles all external API requests and stores sensitive API keys. It exposes two main endpoints:

- **Weather Data:** `GET /api/weather?lat=<latitude>&lon=<longitude>`
- **Location Search:** `GET /api/search?query=<location>&limit=<number>`

### Steps

1. **Navigate to the backend directory:**
   ```bash
   cd native-weather/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend directory and add your API keys:**
   ```dotenv
   WEATHERAPI_KEY=your_openweather_api_key
   GEOAPIFY_KEY=your_geoapify_api_key
   PORT=5000  # optional, defaults to 5000 if not provided
   ```

4. **Start the backend server:**
   ```bash
   node server.js
   ```
   You should see a message similar to:
   ```
   Server running on port 5000
   ```

### Backend Code Structure

- **server.js:**  
  Sets up the Express server with CORS and JSON parsing, and registers the API routes.

- **Routes:**
  - `routes/weather.js`: Defines the `/api/weather` endpoint and forwards requests to `weatherController`.
  - `routes/geocoding.js`: Defines the `/api/search` endpoint and forwards requests to `geocodingController`.

- **Controllers:**
  - `controllers/weatherController.js`:  
    Fetches current weather and forecast data from the OpenWeatherMap API, processes the data (e.g., converts Celsius to Fahrenheit), and formats the response to include details like temperature, humidity, wind speed, sunrise/sunset times, and an hourly forecast.
  
  - `controllers/geocodingController.js`:  
    Processes location search queries using the Geoapify API and returns matching location data.

## Screenshots

<div style="display: flex; flex-wrap: wrap; justify-content: center;"> 
  <img src="/frontend/src/assets/images/screenshots/loading-app.png" alt="Loading Screen" width="250" style="margin: 5px;">
  <img src="/frontend/src/assets/images/screenshots/main-screen.png" alt="Main Screen" width="250" style="margin: 5px;">
  <img src="/frontend/src/assets/images/screenshots/add-location.png" alt="Add Location" width="250" style="margin: 5px;">
</div>

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for details.
