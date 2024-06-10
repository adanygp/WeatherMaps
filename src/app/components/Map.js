"use client";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import DraggableMarker from "./DraggableMarker";


export default function Map ({cordinates, changeCordinates}) {
    const MapEvents = () => {
        useMapEvents({
            dblclick(e) {
            const { lat, lng } = e.latlng;
            changeCordinates({lat:lat, lng:lng});
            }
        });
        return null;
    };
  
  return (
    <MapContainer className="container m-auto" center={cordinates} zoom={6} scrollWheelZoom={false} doubleClickZoom={false} id="map">
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <DraggableMarker cordinates={cordinates} changeCordinates={changeCordinates}/>
        <MapEvents />
    </MapContainer>
  );
}
