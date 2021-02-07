import React, {useCallback, useEffect, useRef, useState } from 'react';
import ReactMapGL,{Marker, FlyToInterpolator, Popup} from 'react-map-gl';
import api from '@/services/api';
import StationInfo from '@/components/stationInfo';
import useSupercluster from 'use-supercluster';

const Map: React.FC = () => {
  const [points, setPoints] = useState([]);
  const [selectedMarker, setSelectedMarker]= useState(null);
  const [viewport, setViewport]= useState(
     {
      width: '100vw',
      height: '100vh',
      latitude: 40,
      longitude: -100,
      zoom:1,
    }
  );

  const mapRef = useRef();

  const getDataApi = async() => {
    try{
      const response = await api.get('/networks');
      const networks = response.data.networks.map(network =>({
        type: "Feature",
        properties:{
          cluster:false,
          networkId: network.id,
          country: network.location.country,
          city: network.location.city,
          name: network.name,
        },
        geometry:{
          type: 'Point',
          coordinates:[
            parseFloat(network.location.longitude),
            parseFloat(network.location.latitude)
          ]
        }
      }));
      setPoints(networks);
      // console.log(response, 'data')
    }catch(err){
      console.log(err, 'Error networks')
    }
  }
  // },[]);

  const getStations = useCallback(async(network_id) => {
    try {
      const response = await api.get(`/networks/${network_id}`);

      const respStations = response.data.network.stations.map(station =>({
        type: "Feature",
        properties:{
          cluster:false,
          name: station.name,
          free_bikes: station.free_bikes
        },
        geometry:{
          type: 'Station',
          coordinates:[
            parseFloat(station.longitude),
            parseFloat(station.latitude)
          ]
        }
      }));
      console.log(respStations, 'STATIONS');
      setPoints(respStations);
    } catch (error) {
      console.log(error, 'Error stations')
    }
  },[]);

  const handleOnCLick=(data )=>{
    setSelectedMarker(data);
    getStations(data.properties.networkId);
  }

  useEffect(()=>{
    getDataApi();
    const listener = e => {
      if(e.key === "Escape"){
        setSelectedMarker(null)
      }
    };
    window.addEventListener("keydown", listener);
    return ()=>{
      window.removeEventListener("keydown", listener);
    }
  }),[];

  const bounds  = mapRef.current ? mapRef.current?.getMap().getBounds().toArray().flat() : null;
  const{clusters, supercluster}=useSupercluster({
    points,
    zoom:viewport.zoom,
    bounds,
    options:{radius:75, maxZoom:20}
  });
   console.log(clusters);
  return (
    <ReactMapGL
        ref={mapRef}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_API_MAP_BOX}`}
        onViewportChange={(newViewport) => setViewport({...newViewport })}
        {...viewport}
        maxZoom={20}
      >
        {clusters.map((cluster) => {
          const[longitude, latitude] = cluster.geometry.coordinates;
          const{cluster: isCluster, point_count: pointCount} = cluster.properties;
          const pointSize= `${30+ (pointCount /points.length) * 20}px`;
          if(isCluster){
              return(
                <Marker
                  key={cluster.id}
                  latitude={latitude}
                  longitude={longitude}
                >
                  <div className="point" style={{height:pointSize, width:pointSize}}
                    onClick={()=>{
                      const expansionZoom  = Math.min(supercluster.getClusterExpansionZoom(cluster.id),20);
                      setViewport({
                        ...viewport,
                        latitude,
                        longitude,
                        zoom: expansionZoom,
                      });
                    }}
                  >
                    {pointCount}
                  </div>
                </Marker>
              )
            }
            return(
              <Marker
                key={cluster.properties.networkId}
                latitude={latitude}
                longitude={longitude}
              >
                <button onClick={()=>handleOnCLick(cluster)}>
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </button>
              </Marker>
            );
          }
        )}
        {/* {
          selectedMarker ? (
            <Popup
              className="custom-popup"
              tipSize={5}
              anchor="top"
              longitude={selectedMarker.geometry.coordinates[0]}
              latitude={selectedMarker.geometry.coordinates[1]}
              closeOnClick={false}
              onClose={()=>setSelectedMarker(null)}
              closeButton={true}
            >
              <StationInfo info={selectedMarker} />
            </Popup>
          ) : null} */}

      </ReactMapGL>
  );
}

export default Map;
