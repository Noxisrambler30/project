import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const Map = ({ address }) => {
  const provider = new OpenStreetMapProvider();
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const results = await provider.search({ query: address });
        if (results && results.length > 0) {
          setCoordinates(results[0]);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchCoordinates();
  }, [address, provider]);

  return (
    <MapContainer
      center={coordinates ? [coordinates.y, coordinates.x] : [0, 0]}
      zoom={coordinates ? 15 : 3}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {coordinates && (
        <Marker position={[coordinates.y, coordinates.x]}>
          <Popup>{address}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default Map;
