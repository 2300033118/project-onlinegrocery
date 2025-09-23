import React from "react";
import "./Loader.css"; // your animation CSS file

export default function Loader() {
  return (
    <div className="loader-container">
      <div class="loader">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
        </div>
      <div className="loader"></div>
    </div>
  );
}
