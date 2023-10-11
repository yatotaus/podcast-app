import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Song Finder</h1>
      <input
        type="text"
        placeholder="Enter search term"
        // onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <button className="btn">Search</button>
      <hr></hr>
    </div>
  );
}

export default App;
