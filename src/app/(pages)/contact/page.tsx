import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>

      <section className="mb-32">
        <div
          id="map"
          className="relative h-[300px] overflow-hidden bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus')",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11672.945750644447!2d-122.42107853750231!3d37.7730507907087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858070cc2fbd55%3A0xa71491d736f62d5c!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>

        <div className="container px-6 md:px-12 mt-[-100px]">
          <div className="bg-gray-800 p-12 rounded-lg shadow-lg backdrop-blur-lg border border-gray-700">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <form>
                  <div className="relative mb-6">
                    <input
                      type="text"
                      className="peer block w-full bg-transparent border-2 border-gray-500 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      id="exampleInput90"
                      placeholder="Name"
                    />
                  </div>
                  <div className="relative mb-6">
                    <input
                      type="email"
                      className="peer block w-full bg-transparent border-2 border-gray-500 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      id="exampleInput91"
                      placeholder="Email"
                    />
                  </div>
                  <div className="relative mb-6">
                    <textarea
                      className="peer block w-full bg-transparent border-2 border-gray-500 text-white py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                      id="exampleFormControlTextarea1"
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <div className="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-sky-500 border-gray-500 rounded-md"
                      id="exampleCheck96"
                    />
                    <label
                      className="ml-2 text-sm text-neutral-300"
                      htmlFor="exampleCheck96"
                    >
                      Send me a copy of this message
                    </label>
                  </div>
                  <button
                    type="button"
                    className="w-full bg-sky-500 text-white py-2 px-6 rounded-md hover:bg-sky-600 transition-colors"
                  >
                    <FaRegPaperPlane className="inline-block mr-2" />
                    Send
                  </button>
                </form>
              </div>

              <div className="w-full lg:w-6/12 mt-12 lg:mt-0">
                <div className="flex flex-col space-y-6">
                  <div className="flex items-center">
                    <div className="text-sky-500 p-3 rounded-md bg-gray-700">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div className="ml-6">
                      <p className="font-bold">Email</p>
                      <p className="text-sm">example@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sky-500 p-3 rounded-md bg-gray-700">
                      <FaPhone className="text-xl" />
                    </div>
                    <div className="ml-6">
                      <p className="font-bold">Phone</p>
                      <p className="text-sm">1-600-890-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sky-500 p-3 rounded-md bg-gray-700">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div className="ml-6">
                      <p className="font-bold">Address</p>
                      <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
