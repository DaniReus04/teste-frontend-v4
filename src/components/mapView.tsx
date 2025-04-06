import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

interface MapViewProps {
  lat: number;
  lon: number;
  color?: string;
}

const containerStyle = {
  width: '100%',
  height: '60vh',
};

const MapView = ({ lat, lon, color }: MapViewProps) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = {
    lat,
    lng: lon,
  };

  const markerIcon = {
    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    scale: 5,
    fillColor: color,
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: '#333',
  };

  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
      <Marker position={center} icon={markerIcon} />
    </GoogleMap>
  );
};

export default MapView;
