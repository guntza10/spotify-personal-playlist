# Jammming

Jammming is a React web application that allows users to search the Spotify library, preview each track, create a custom playlist, save it to their Spotify account and view custom playlist after creation playlist. This project demonstrates how to integrate React components, state management, and API requests to create a functional and interactive web experience.

## Live Demo

`Url:` <a href="https://2morrowboyz-jammming.netlify.app" target="_blank" rel="noopener noreferrer">https://2morrowboyz-jammming.netlify.app</a>

`Note:` My Spotify app service is currently in development mode, which requires adding users to grant them access to the API. Therefore, I will provide a test account for you as follows:

```
Log in with Google Account

Email: tester.jammming@gmail.com
Password: @Test1234
```

## Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Usage](#usage)
5. [Technologies Used](#technologies-used)

## About the Project

Jammming is built using React to provide a seamless user experience for searching songs on Spotify, creating playlists, preview each track, saving them to a user's Spotify account and view custom playlist after creation. Users can search for songs by title, view detailed information about each song, and then compile their favorites into a playlist. This project showcases the practical implementation of working with APIs, React components, and state management.

## Features

- **Search Spotify's Library**: Users can search for songs by song title. You can also search by other attributes like artist's name or genre.
- **View Song Information**: Users can see details such as the title, artist, and album for each song returned in their search.
- **Preview each Song**: Users can preview listening each song when click the track.
- **Create,Export and View Playlists**: Users can compile a custom playlist from their search results and export it to their personal Spotify account. And after creation users can also view this custom playlist.

## Getting Started

These instructions will help you set up a local copy of the project for development and testing purposes.

### Prerequisites

- Node.js (>= 18.x, tested with v18.17.0)
- npm (>= 10.x, tested with v10.8.3) or yarn (>= 1.x)
- Spotify Developer account with a registered app (for client ID and secret)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/guntza10/spotify-personal-playlist.git
   ```
2. Navigate to the project directory:

   ```
   cd jammming
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or, if you're using yarn:

   ```
   yarn install
   ```

4. Create a .env file in the root directory and add your Spotify API credentials:

   ```
   REACT_APP_CLIENT_ID={your-client-id}
   REACT_APP_CLIENT_SECRET={your-client-secret}
   ```

5. Start the development server:

   ```
   npm start
   ```

   or, if you're using yarn:

   ```
   yarn start
   ```

6. Open your browser and go to http://localhost:3000.

### Usage

1. Log in with your Spotify account using the provided button.
2. Use the search bar to search for songs by title, artist, or genre.
3. Add selected songs to your custom playlist.
4. Once satisfied, click the "Save to Spotify" button to save the playlist to your Spotify account.

### Technologies Used

- React: A JavaScript library for building user interfaces.
- Spotify API: To search songs and create playlists.
- React Router: For navigating between different pages.
- Styled Components: For styling the application.
- normalize.css: For consistent cross-browser rendering.
- Git & GitHub: For version control and hosting the repository.
