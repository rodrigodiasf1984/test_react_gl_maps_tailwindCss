import React from 'react';
import dynamic from 'next/dynamic';

const Maps: React.FC = () => {
  const MapWithNoSSR = dynamic(() => import('@/components/map'), {
    ssr: false,
  });

  return (
    <>
      <div className="w-screen h-screen flex font-Roboto flex-row ">
        <aside className="w-3/12 h-full bg-gradient-to-b from-green-600 to-green-50 p-20 flex flex-col justify-between">
          <header>
            <div className="max-w-xs flex flex-row items-center h-40 w-40">
              <img src="/img/bike.png" alt="Bike" />
              <span className="mt-14 text-4xl font-bold text-yellow-light">
                Bike sharing
              </span>
            </div>
            <h2 className="text-2xl font-bold mt-16 leading-10 text-green-700">
              Pick up a marker on the map.
            </h2>
            <p className="mt-6 leading-7  text-green-700">
              We have a lot of bikes ready to ride, it just waiting for you.
            </p>
          </header>
        </aside>
        <div className="flex w-3/4 h-full">
          <MapWithNoSSR />
        </div>
      </div>
    </>
  );
};

export default Maps;
