// Import components from react
import React, { useState } from "react";

// Import CSS
import "./App.css";

function App() {
  const [podcast, setPodcast] = useState(); // useState to save the list of podcasts
  const [searchTerm, setSearchTerm] = useState("");

  // Function to fetch the list of podcasts
  const fetchFavourites = async () => {
    const result = await fetch(
      `https://itunes.apple.com/search?term=${searchTerm}&entity=podcast`
    ); // Make the API call
    const data = await result.json(); // Change the result into json format
    setPodcast(data.results); // Save the data in 'podcast'
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter search term"
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <button className="btn" onClick={() => fetchFavourites()}>
        Search
      </button>
      <hr></hr>

      {podcast?.length && (
        <table>
          <thead>
            <tr>
              <th>Artwork</th>
              <th>Host name</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {podcast?.map((episode) => {
              const list = (
                <>
                  <tr>
                    <td>
                      <img
                        src={episode.artworkUrl60}
                        alt={episode.artistName}
                      />
                    </td>
                    <td key={episode.artistId}>{episode.artistName}</td>
                    <td>{episode.trackCensoredName}</td>
                  </tr>
                </>
              );
              return list;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
