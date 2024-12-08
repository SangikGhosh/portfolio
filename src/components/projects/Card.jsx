import React, { useEffect, useState } from "react";

const Card = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation
    setIsVisible(true);

    // Automatically close after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Match the transition duration
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`bg-[#191a1d] text-white p-5 h-[23rem] w-[20rem] rounded-lg shadow-lg max-w-sm transform ${
          isVisible ? "scale-100" : "scale-95"
        } transition-transform duration-300`}
      >
        <img
          src="https://i.pinimg.com/originals/dc/09/1e/dc091eb254057bd858756726c88210e5.gif"
          alt="Review"
          className="w-full h-48 rounded-lg object-cover mb-4"
        />
        <h2 className="text-xl text-gray-300 bg-transparent font-light mb-2">Oops!</h2>
        <p className="text-gray-400 bg-transparent font-thin mb-4">
          {message || "Link is not available at this moment"}
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Match the transition duration
          }}
          className="bg-white text-black px-6 py-[0.4rem] rounded-md hover:bg-slate-200 transition duration-300"
        >
          Exit
        </button>
      </div>
    </div>
  );
};

export default Card;
