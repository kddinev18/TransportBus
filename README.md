# TransportBus: Bus Route Visualizer & Navigator

**TransportBus** is a comprehensive bus route visualizer and navigator designed specifically for Buras. It aims to enhance the public transportation experience by providing detailed and interactive map visualizations of bus routes and stops, alongside an intuitive navigation system. The platform is equipped with an admin panel that allows for dynamic management of bus routes, stops, and administrators.

## Key Features

- **Bus Route & Stop Visualization**: Real-time, interactive maps display bus routes and stops, enabling users to plan their journeys efficiently.
- **Navigation System**: The system provides detailed navigation, helping users to find the best routes for traveling within the city using public transportation.
- **Admin Panel**: Administrators can manage bus routes, add or remove stops, and administer other users, ensuring the data stays up-to-date and accurate.
- **Multi-Language Support**: The platform is designed with internationalization (i18n) in mind, allowing users to access the application in multiple languages.
- **Interactive Map**: The application integrates Google Maps and Mapbox APIs to provide an interactive and visually rich map experience.

## Technology Stack

The project utilizes modern web technologies for both the front-end and back-end:

### Front-End
- **Vue.js**: A progressive JavaScript framework used for building the user interface.
- **Vuetify**: A material design framework for Vue.js.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vue Router**: Manages routing within the application.
- **Pinia Store**: State management solution for Vue 3.
- **i18n**: Plugin for internationalization support.
- **Google Maps API**: Provides interactive mapping capabilities.
- **Mapbox/Polyline**: Used for decoding polyline data to render bus routes accurately.
- **Vue-Loading-Overlay & Vue3-Snackbar**: For providing loading indicators and notifications.
- **Axios**: Used for making HTTP requests.

### Back-End
- **JSON-Server**: A mock backend service that simulates a RESTful API for bus routes, stops, and user information.

## Project Structure

The frontend is organized into three primary modules:

1. **Core**: Contains shared components, services, and utilities.
2. **Public**: Handles user-facing pages for bus routes, stops, and navigation.
3. **Administrative**: Manages the admin panel for routes, stops, and user management.

## Installation Guide

### Backend Setup
1. Navigate to the `TransportBus.API` directory:
```bash
   cd TransportBus.API
```
2. Install dependencies:
```bash
   npm install
```
3. Start the server:
```bash
   npm start
```
The backend will now be available and provide data to the frontend.

### Frontend Setup
1. Navigate to the `TransportBus.WEB` directory:
```bash
   cd TransportBus.WEB
```
2. Install dependencies:
```bash
   npm install
```
3. Start the development server:
```bash
   npm run serve
```

## Google API Key
This project utilizes the Google Maps API for interactive maps and geolocation features. The API key is **not included** in the repository for security reasons. To use this project, you will need to obtain your own Google API key from [Google Cloud](https://cloud.google.com/maps-platform).
Please ensure that your API key is properly configured in the project to enable Google Maps functionality.
### Steps:
1. Create a `.env` file in the root of the project.
2. Add the following content to the `.env` file:

   ```env
   VUE_APP_GOOGLE_MAPS_API_KEY=your-api-key
   ```
3. Replace `your-api-key` with your actual Google API key.
