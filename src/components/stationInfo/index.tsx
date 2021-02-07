import React,{memo} from 'react';

function StationInfo({info}) {
  // console.log(info, 'alkndfknasdéklnf222')
  const {properties} =info;

  const displayInfo = `City: ${properties.city}, Country: ${ properties.country}`;
  return (
    <div>
      <span>{displayInfo}</span>
      <span className="flex justify-center">{properties.name}</span>

    </div>
  );
}

export default memo(StationInfo);
