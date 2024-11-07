import React, { useState, useEffect } from "react";

const gifs = [
  "https://i.pinimg.com/originals/e1/a7/81/e1a781c2cfc49e4f02cc72293e853b05.gif",
  "https://i.pinimg.com/originals/a4/51/39/a451393c169a91586312551109361064.gif",
  "https://i.pinimg.com/originals/11/b4/04/11b40409f4192832c8a8124e253631d1.gif",
  "https://i.pinimg.com/originals/0a/f2/c9/0af2c9dcb15d558c3695608bcc8c68ae.gif",
  "https://i.pinimg.com/originals/20/ed/06/20ed06db283022697f34602fdba35ae3.gif",
  "https://i.pinimg.com/originals/f5/8a/37/f58a37e92275010d4725b957b50b87e6.gif",
  "https://i.pinimg.com/originals/9f/c2/12/9fc2126eec2c0a3876e3f2097af9b983.gif",
  "https://i.pinimg.com/originals/b2/32/55/b2325557a903fdf56b50da4656da9221.gif",
  "https://i.pinimg.com/originals/d0/c6/04/d0c60459431b6ffaecf92fc902ca996d.gif",
  "https://i.pinimg.com/originals/a3/9f/fc/a39ffc88945488d3620261811a408dc5.gif",
  "https://i.pinimg.com/originals/81/20/9d/81209d5f989997e6dd1551677095b029.gif",
  "https://i.pinimg.com/originals/ab/7e/3f/ab7e3f409221e14d0ce9c1784e224185.gif",
  "https://i.pinimg.com/originals/26/bb/4f/26bb4f08d445790b80e7a1d90dfb65ab.gif",
  "https://i.pinimg.com/originals/d6/af/b6/d6afb6c5702631ed7e304d2ac40fb4f2.gif",
  "https://i.pinimg.com/originals/7a/70/82/7a7082d2d73b6c995db6da795b66ae85.gif",
  "https://i.pinimg.com/originals/58/39/de/5839de9f2619af75f2828e8b57cd6eb9.gif",
  "https://i.pinimg.com/originals/5c/a2/2b/5ca22b69deaa61ff5589bd6368a59699.gif",
  "https://i.pinimg.com/originals/21/4e/87/214e87493439bc1970c309d26f546a73.gif"
];

const Landing = () => {
  const [result, setResult] = useState("");
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  // Cycle through GIFs every 6 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  // Remove the result message after 5 seconds
  useEffect(() => {
    if (result === "Form Submitted Successfully") {
      const timer = setTimeout(() => setResult(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "987eaf20-883f-4372-a319-b9deaedef032");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div id="contact" className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex sm:w-5/6 md:w-5/6 w-11/12 max-w-5xl bg-white rounded-xl shadow-lg flex-col md:flex-row">
        
        {/* GIF Section */}
        <div className="w-full lg:w-1/2 h-64 sm:h-72 md:h-auto rounded-t-xl overflow-hidden md:rounded-l-xl md:rounded-tr-none">
          <img
            src={gifs[currentGifIndex]}
            alt="Rotating GIFs"
            className="object-cover w-full h-full"
          />
        </div>


        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-gray-100 rounded-b-xl md:rounded-r-xl">
          <form onSubmit={onSubmit} className="space-y-6 bg-gray-100">
            <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600  text-center mb-6 bg-clip-text text-transparent">Let's Connect!</div>
            
            {/* Name Field */}
            <div className="bg-gray-100">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="block w-full py-2 px-4 md:py-3 md:px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Email Field */}
            <div className="bg-gray-100">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="block w-full py-2 px-4 md:py-3 md:px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"                
                required
              />
            </div>
            
            
            
            
            {/* Message Field */}
            <div  className="bg-gray-100">
              <textarea
                name="message"
                placeholder="Message"
                className="block w-full py-2 px-4 md:py-3 md:px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            
            {/* Result Message Placeholder */}
            <div className="h-[0.1rem] md:h-6 text-center bg-gray-100 text-green-600">
              {result || <span></span>}
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center bg-gray-100">
              <button
                type="submit"
                className="px-5 py-2 md:px-8 md:py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:brightness-90 transition transform duration-300"
              >
                Wave Me👋
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
