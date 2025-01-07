import React from "react";

const Contact = () => {
  return (
    <div>
    
      {/* Page Banner */}
      <div className="bg-cover bg-center h-48 flex items-center justify-center" 
      style={{ backgroundImage: "url('/images/banner.png')" }}
      >
        <h2 className="text-3xl font-bold text-gray-800">Contact</h2>
        
        
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-4">
        <p className="text-sm text-gray-600">
          Home &gt; <span className="text-gray-900">Contact</span>
        </p>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-12 w-[5]">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Get In Touch With Us</h2>
        <p className="text-center text-gray-600 mb-8">
          For more information about our product & services, please feel free to drop us an email. Our staff always be there to help you out. Do not hesitate!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="text-black text-2xl">📍</div>
              <div>
                <p className="font-bold text-gray-900">Address</p>
                <p>236 5th SE Avenue, New York NY10000, United States</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-black text-2xl">📞</div>
              <div>
                <p className="font-bold text-gray-900">Phone</p>
                <p>Mobile: (+84) 546-6789</p>
                <p>Hotline: (+84) 456-6789</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-black text-2xl">⏰</div>
              <div>
                <p className="font-bold text-gray-900">Working Time</p>
                <p>Monday-Friday: 9:00 - 22:00</p>
                <p>Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700" htmlFor="name">
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="Abc"
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="email">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="Abc@def.com"
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="This is an optional"
              />
            </div>
            <div>
              <label className="block text-gray-700" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                placeholder="Hi! I’d like to ask about"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#b88e2f] text-white font-bold rounded-md py-2 hover:bg-yellow-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

     
    </div>
  );
};

export default Contact;
