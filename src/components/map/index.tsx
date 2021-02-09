import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import api from '@/services/api';
import StationInfo from '@/components/stationInfo';
import useSupercluster from 'use-supercluster';
import Pins from '@/components/pins';
import { InfoProps, ViewportTypes } from '@/types';

const Map: React.FC = () => {
  const [points, setPoints] = useState([]);
  const [radius, setRadius] = useState(75);
  const [layerId, setLayerId] = useState<string>('one');
  const [selectedStation, setSelectedStation] = useState<InfoProps>(null);
  const [zoom, setZoom] = useState(1);
  const [viewport, setViewport] = useState<ViewportTypes>({
    width: '100vw',
    height: '100vh',
    latitude: 40,
    longitude: -100,
    zoom,
  });

  const mapRef = useRef(null);
  const layers = {
    one: { radius, maxZoom: 20 },
    two: { radius, maxZoom: 20 },
  };

  const getDataApi = async () => {
    try {
      const response = await api.get('/networks');
      const networks = response.data.networks.map(network => ({
        type: 'Feature',
        properties: {
          cluster: false,
          networkId: network.id,
          country: network.location.country,
          city: network.location.city,
          name: network.name,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(network.location.longitude),
            parseFloat(network.location.latitude),
          ],
        },
      }));
      setPoints(networks);
    } catch (err) {
      console.log(err, 'Error networks');
    }
  };

  const getStations = useCallback(async network_id => {
    try {
      const response = await api.get(`/networks/${network_id}`);
      if (response.data.network.stations.length > 0) {
        const respStations = response.data.network.stations.map(station => ({
          type: 'Feature',
          properties: {
            cluster: false,
            name: station.name,
            free_bikes: station.free_bikes,
            address: station.extra.address,
          },
          geometry: {
            type: 'Station',
            coordinates: [
              parseFloat(station.longitude),
              parseFloat(station.latitude),
            ],
          },
        }));
        setPoints(respStations);
        setLayerId('two');
        setZoom(13);
        setRadius(100);
      } else {
        alert('No stations found ');
      }
    } catch (error) {
      console.log(error, 'Error stations');
    }
  }, []);

  const handleOnCLick = data => {
    getStations(data.properties.networkId);
  };

  useEffect(() => {
    getDataApi();
    const listener = (e: { key: string }) => {
      if (e.key === 'Escape') {
        setSelectedStation(null);
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const options = `${layerId === 'one' ? layers.one : layers.two}`;
  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options,
  });

  const handleBackNetworks = () => {
    setSelectedStation(null);
    getDataApi();
    setLayerId('one');
    setViewport({
      ...viewport,
      zoom: 1,
      latitude: 40,
      longitude: -100,
    });
  };
  return (
    <ReactMapGL
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={`${process.env.NEXT_PUBLIC_API_MAP_BOX}`}
      onViewportChange={(newViewport: ViewportTypes) =>
        setViewport({ ...newViewport })
      }
      {...viewport}
      maxZoom={20}
    >
      {clusters.length > 0 &&
        clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;
          const point_size = `${30 + (pointCount / points.length) * 20}px`;
          if (isCluster) {
            const bg_point = `${
              layerId === 'two' ? 'bg-blue-600' : 'bg-green-600'
            }`;
            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
              >
                <button
                  type="button"
                  className={`point ${bg_point}`}
                  style={{ height: point_size, width: point_size }}
                  onClick={() => {
                    const expZoom = layerId === 'two' ? 13 : 2;
                    const expansionZoom = Math.max(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      expZoom,
                    );
                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                    });
                  }}
                >
                  {pointCount}
                </button>
              </Marker>
            );
          }
          return (
            <Marker
              key={cluster.properties.networkId}
              latitude={latitude}
              longitude={longitude}
            >
              {layerId === 'one' ? (
                <button type="button" onClick={() => handleOnCLick(cluster)}>
                  <Pins layerNumber={layerId} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedStation(cluster)}
                >
                  <Pins layerNumber={layerId} />
                </button>
              )}
            </Marker>
          );
        })}
      {selectedStation ? (
        <Popup
          className="custom-popup"
          tipSize={5}
          anchor="top"
          longitude={selectedStation.geometry.coordinates[0]}
          latitude={selectedStation.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => setSelectedStation(null)}
          closeButton
        >
          <StationInfo info={selectedStation} />
        </Popup>
      ) : null}
      {layerId === 'two' ? (
        <aside className="flex">
          <button
            type="button"
            className="btn-network"
            onClick={() => handleBackNetworks()}
          >
            <strong className="font-bold">Networks</strong>
          </button>
        </aside>
      ) : null}
      ;
    </ReactMapGL>
  );
};

export default Map;
