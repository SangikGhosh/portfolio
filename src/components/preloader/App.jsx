import React, { useEffect, useState } from "react";

const Preloader = () => {
  const [scale, setScale] = useState(1); // Initial scale

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prevScale) => (prevScale === 1 ? 1.5 : 1)); // Toggle scale
    }, 750); // Adjust duration for smooth transition

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "black",
  };

  const circleStyle = {
    width: "40px",
    height: "40px",
    backgroundColor: `rgba(255, 255, 255, ${2 - scale})`, // Adjust brightness with scale
    borderRadius: "50%",
    transform: `scale(${scale})`,
    transition: "transform 0.75s ease-in-out, background-color 0.75s ease-in-out", // Smooth brightness transition
  };

  return (
    <div style={containerStyle}>
      <div style={circleStyle}></div>
    </div>
  );
};

export default Preloader;
