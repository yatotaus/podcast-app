import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Import components
import Content from "./Content";
import SearchContainer from "./components/Search-section/SearchContainer";

// Import CSS
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PodcastPreview from "./components/PodcastPreview/PodcastPreview";

const THEME = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Quicksand",
    },
  },
  TableCell: {
    root: {
      color: "white",
      opacity: 0.6,
    },
  },
});

function App() {
  const [podcasts, setPodcasts] = useState(); // useState to save the list of podcasts
  const [listEpisodes, setEpisodes] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch the list of podcasts
  const fetchOutput = async () => {
    const result = await fetch(
      //list of podcast
      `https://itunes.apple.com/search?term=${searchTerm}&media=podcast&limit=25`
    ); // Make the API call
    const data = await result.json(); // Change the result into json format
    setPodcasts(data.results); // Save the data in 'podcast'

    fetchEpisodes();
  };

  const fetchEpisodes = async () => {
    const result = await fetch(
      //list of episodes
      `https://itunes.apple.com/search?term=${searchTerm}&media=podcast&entity=podcastEpisode&limit=25`
    ); // Make the API call
    const data = await result.json(); // Change the result into json format

    setEpisodes(data.results); // Save the data in 'podcast'
  };

  return (
    <ThemeProvider theme={THEME}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Content {...{ setSearchTerm, fetchOutput }}>
                  <SearchContainer
                    {...{
                      podcastUploaded: { podcasts, listEpisodes },
                    }}
                  />
                </Content>
              }
            />
            <Route
              path="/preview"
              element={
                <Content>
                  <PodcastPreview {...{ listEpisodes }} />
                </Content>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
