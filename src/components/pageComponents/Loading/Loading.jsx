import React, { useState, useEffect } from "react";
import "./Loading.css";

const Loading = () => {
  const [filled, setFilled] = useState(70);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 50);
    }
  }, [filled, isRunning]);
  window.onload = function () {
    setIsRunning(true);
  };
  return (
    <div className="App">
      <h1>Loading</h1>
      <div className="progressbar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#a66cff",
            transition: "width 0.5s",
          }}
        ></div>
        <span className="progressPercent">{filled}%</span>
      </div>
    </div>
  );
};

export default Loading;
