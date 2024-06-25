import logo from "./logo.svg";
import "./App.css";
import MyApp from "./components/MyApp";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <h2 style={{marginLeft:"50px"}}>Todo table</h2>
      <div className="search-box">
        <label htmlFor="search">Type to search</label>
        <input id="search" onChange={(e) => setSearch(e.target.value)} type="search" placeholder="search title" />
      </div>
      <MyApp search={search} setSearch={setSearch} />
    </div>
  );
}

export default App;
