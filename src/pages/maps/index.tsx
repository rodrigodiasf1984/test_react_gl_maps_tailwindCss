import React from 'react';
import dynamic from 'next/dynamic';

const Maps: React.FC = () => {
  const MapWithNoSSR = dynamic(() => import('@/components/map'), {
    ssr: false,
  });

  return (
    <>
      <div className="w-screen h-screen flex flex-col font-Roboto xl:flex-row ">
        <aside className="w-screen h-2/4 xl:w-3/12 xl:h-full bg-gradient-to-b from-green-600 to-green-50 xl:px-2 flex flex-col items-center justify-center">
          <header>
            <div className="xl:max-w-xs flex flex-row justify-center items-center m-auto px-4 xl:px-0 h-2/4 xl:h-60 w-screen xl:w-full">
              <img className="w-1/4 xl:w-6/12" src="/img/bike.png" alt="Bike" />
              <span className="mt-10 md:mt-24 lg:mt-32 xl:mt-16 text-xl md:text-4xl xl:text-2xl font-bold text-yellow-light">
                Bike sharing
              </span>
            </div>
            <div className="text-center text-green-700">
              <h2 className="text-lg mt-4 md:text-2xl lg:text-4xl xl:text-2xl font-bold md:mt-10 leading-10 ">
                Pick up a marker on the map.
              </h2>
              <p className="md:mt-6 leading-7 md:text-2xl lg:text-4xl xl:text-2xl">
                We have a lot of bikes ready to ride, it just waiting for you.
              </p>
            </div>
          </header>
        </aside>
        <div className="flex w-screen h-2/4 xl:w-3/4 md:h-full">
          <MapWithNoSSR />
        </div>
      </div>
    </>
  );
};

export default Maps;
