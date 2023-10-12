// Import components from react
import React, { useState } from "react";

//Import components
import SearchContainer from "./components/Search-section/SearchContainer";

// Import CSS
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

  // Function to handle the search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // If there is no value within the search term input...
    if (searchTerm === "") {
      // then alert the user to enter a search term before searching...
      alert(`Please enter a term before searching`);
    } else {
      // , else run 'fetchOutput()' to make the API call
      fetchOutput();
    }
  };

  // Function to handle the search term change
  const handleTermChange = (e) => {
    setSearchTerm(e.target.value); // Get the value from the input and save it in 'searchTerm'
  };

  return (
    <ThemeProvider theme={THEME}>
      <div className="App">
        <input
          type="text"
          placeholder="Enter search term"
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button className="btn" onClick={() => fetchOutput()}>
          Search
        </button>
        <SearchContainer {...{ podcastUploaded: { podcasts, listEpisodes } }} />
      </div>
    </ThemeProvider>
  );
}

export default App;
