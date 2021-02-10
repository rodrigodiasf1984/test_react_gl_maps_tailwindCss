import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-b from-green-600 to-green-50">
      <div
        style={{ backgroundPosition: '80% center' }}
        className="mb-10 md:mb-0 px-4 w-full max-w-screen-xl h-full max-h-680px flex flex-col justify-between items-start relative bg-bike_sharing bg-contain bg-no-repeat bg-custom"
      >
        <div className="max-w-xs flex flex-row items-center h-40 w-40">
          <img src="/img/bike.png" alt="Bike" />
          <span className="mt-14 text-xl md:text-4xl font-bold font-Roboto text-yellow-light">
            Bike sharing
          </span>
        </div>
        <main className="max-w-xs px-4 mb-14">
          <h1 className="text-2xl md:text-7xl font-bold font-Roboto  text-green-700">
            Convenient & Simple
          </h1>
          <p className="mt-2 md:mt-10 text-xl  md:text-3xl font-Roboto text-green-700">
            Find an station, unlock the bike and ride.
          </p>
        </main>
        <a
          className="absolute right-0 bottom-0 h-20 w-20 bg-yellow-50 hover:bg-yellow-100 transition ease-out duration-500 flex items-center justify-center rounded-full"
          href="/maps"
        >
          <svg
            className="w-8 h-8 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
export default Home;
