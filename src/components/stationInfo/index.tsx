import React, { memo } from 'react';
import { InfoProps } from '@/types';

interface StationInfoProps {
  info: InfoProps;
}

const StationInfo: React.FC<StationInfoProps> = ({ info }) => {
  const displayInfo = `Station: ${info.properties.name}`;
  return (
    <div className="flex flex-col text-center px-4 m-auto">
      <h6>{displayInfo}</h6>
      <span className="flex justify-center">
        Adress:&nbsp;
        {info.properties.address}
        <br />
        Free_Bikes:
        {info.properties.free_bikes}
      </span>
    </div>
  );
};

export default memo(StationInfo);
