import React, {useCallback, useEffect, useState } from 'react';
import ReactMapGL,{Marker, Popup} from 'react-map-gl';
import api from '@/services/api';
import Pins from '@/components/pins';
import StationInfo from '@/components/stationInfo';

const map: React.FC = () => {
  const [networks,setNetworks]=useState([]);
  const[popupInfo, setPopupInfo]=useState(null);

  const[viewport, setViewport]=useState(
     {
      width: '100vw',
      height: '100vh',
      // latitude: 37.175296,
      // longitude: -3.489792,
      // zoom: 13
      latitude: 40,
      longitude: -100,
      zoom: 3.5,
      bearing: 0,
      pitch: 0
    }
  );

  const getDataApi=useCallback(async()=>{
    try{
      const response = await api.get('/networks');
      console.log(response.data.networks);       
      setNetworks(response.data.networks)
    }catch(err){
      console.log(err, 'ERROR')
    }
  },[]);

  useEffect(()=>{
    getDataApi();
  },[]);

  return (
    <ReactMapGL
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_API_MAP_BOX}`}
        onViewportChange={(viewport) => setViewport(viewport )}
        {...viewport}
      >
         <Pins data={networks} onClick={setPopupInfo} />
         {popupInfo && (
          <Popup
            className="custom-popup"                       
            tipSize={5}
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            closeOnClick={false}
            onClose={setPopupInfo}
            closeButton={false}
          >
            <StationInfo info={popupInfo} />
          </Popup>
        )}      
      </ReactMapGL>
  );
}

export default map;
