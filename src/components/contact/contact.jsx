import React, { useState } from "react";
import img from "../../assets/removebg.png"
const Landing = () => {
  const [result, setResult] = useState("");

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
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex w-full max-w-5xl bg-white rounded-lg shadow-lg lg:flex">
        
        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src= {img}// Replace with actual image URL
            alt="Person"
            className="object-cover w-full h-full bg-zinc-900 rounded-l-lg"
          />
        </div>
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-gray-100 rounded-r-lg">
          <form onSubmit={onSubmit} className="space-y-6 bg-gray-100">
            <div className="text-3xl font-bold text-gray-800 bg-gray-100 text-center mb-6">Let's Connect!</div>
            
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="block w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            
            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="block w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            
            {/* Subject Field */}
            <div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="block w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            
            {/* Message Field */}
            <div>
              <textarea
                name="message"
                placeholder="Message"
                className="block w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows="4"
                required
              ></textarea>
            </div>
            
            {/* Result Message Placeholder */}
            <div className="h-6 text-center text-gray-700 bg-gray-100">
              {result || <span>&nbsp;</span>}
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center bg-gray-100">
              <button
                type="submit"
                className="px-8 py-3 font-semibold text-white bg-yellow-500 rounded-full shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Landing;
