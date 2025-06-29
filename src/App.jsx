import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import MusicLibrary from "./MusicLibrary";

function App() {
  return (
    <div className="container">
      <MusicLibrary />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
