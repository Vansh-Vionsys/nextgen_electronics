import React from "react";

const About = () => {
  return (
    <div>
      <div className="w-full lg:h-screen h-full m-auto flex items-center justify-center py-20 bg-gray-50 dark:bg-gray-900">
        <div className="w-full h-full flex flex-col justify-center items-center sm:px-4 px-2">
          <div className="lg:w-[90%] w-full mx-auto flex flex-col lg:gap-6 lg:flex-row items-center justify-center ">
            <div className="relative">
              <img
                className="absolute z-20 lg:left-[2rem] -top-4 left-[1rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"
                src="https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Side Image"
              />

              <img
                className="absolute z-20 lg:top-[12rem] sm:top-[11rem] top-[5rem] sm:-left-[3rem] -left-[2rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"
                src="https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Side Image 2"
              />

              <img
                className="absolute z-20 lg:top-[23rem] sm:top-[20.5rem] top-[10.5rem] left-[2rem] lg:w-[8rem] lg:h-[8rem] sm:w-[6rem] sm:h-[6rem] w-[3rem] h-[3rem] rounded-full"
                src="https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=20"
                alt="Side Image 3"
              />

              <img
                className="rounded-full relative object-cover right-0 lg:w-[30rem] lg:h-[30rem] sm:w-[25rem] sm:h-[25rem] w-[12rem] h-[12rem] outline sm:outline-offset-[.77em] outline-offset-[.37em] outline-green-500"
                src="https://images.pexels.com/photos/1105379/pexels-photo-1105379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="About us"
              />
            </div>
            <div className="lg:w-[60%] p-4 w-full h-full shadow-xl shadow-green-300/40 flex flex-col justify-center items-center sm:px-6 px-4 rounded-xl">
              <h2 className="text-4xl text-center text-green-600 dark:text-green-400 font-bold px-4 py-1 md:mt-0 mt-10">
                About Us
              </h2>
              <p className="md:text-3xl text-2xl text-center text-gray-800 dark:text-gray-200 font-bold my-5">
                We are Petal Haven S.C.
              </p>
              <p className="md:text-xl sm:text-lg text-base mt-2 text-justify sm:px-2 dark:text-gray-300">
                At Petal Haven, we believe in the transformation power of
                flowers. Our blooms are not just arrangements; they are
                expressions of beauty, joy, and emotion. From elegant bouquets
                to enchanting floral designs, we curate every creation with
                precision and care. Whether it's a celebration, a gesture of
                love, or a moment of solace, Petal Haven's exquisite flowers
                speak a language of their own, bringing nature's beauty to your
                doorstep. Experience the enchantment of Petal Haven and let
                flowers tell your story.
              </p>

              <button className="lg:mt-10 mt-6 lg:px-6 px-2 lg:py-4 py-2 bg-green-600 lg:text-xl text-lg text-white font-semibold rounded-full">
                Know more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
