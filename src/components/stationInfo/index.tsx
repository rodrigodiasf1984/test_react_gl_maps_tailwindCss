import React,{memo} from 'react';

function StationInfo(props) {
  console.log(props, 'alkndfknasdéklnf')
  const {info} = props;
  const displayInfo = `City: ${info.city}, Country: ${ info.country}`; 
  return (
    <div>
      <span>{displayInfo}</span>   
    </div>
  );
}

export default memo(StationInfo);