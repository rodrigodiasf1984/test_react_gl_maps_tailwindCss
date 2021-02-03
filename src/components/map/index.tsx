import React, {useCallback, useEffect, useState } from 'react';
import ReactMapGL,{Layer} from 'react-map-gl';
import api from '@/services/api';

const map: React.FC = () => {

  // const parkLayer = {
  //   id: 'velib',    
  //   source: '/v2/networks/velib',
  //   'source-layer': 'networks',
  //   // filter: ['==', 'class', 'park']
  // };

  // const [parkColor, setParkColor] =useState('#8fa');

  const[viewport, setViewport]=useState(
     {
      width: '100vw',
      height: '100vh',
      latitude: 37.175296,
      longitude: -3.489792,
      zoom: 13
    }
  );

  const getDataApi=useCallback(async()=>{
    try{
      const response = await api.get('/networks');
      console.log(response, 'RESPOSTA');
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
         {/* <Layer {...parkLayer} type="fill" paint={{'fill-color': parkColor}} /> */}
      </ReactMapGL>
  );
}

export default map;
