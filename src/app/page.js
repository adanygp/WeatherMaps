'use strict';
"use client"; 
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import DraggableMarker from "./components/DraggableMarker";
import AreaChart from "./components/AreaChart";
import useFetch from "./components/useFetch";
import {useState} from "react";
import 'leaflet/dist/leaflet.css'

export default function Home() {

  const [initialCordinates , setInitialCordinates] = useState({ lat: 20, lng: -105,})
  const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${initialCordinates.lat}&lon=${initialCordinates.lng}&appid=77c1bc8254074d5f6da1b17e9975b58d`);
  const handleCordinates = (e) => {
      const { name, value } = e.target;
      setInitialCordinates({...initialCordinates, [name]:value})
  }

  const MapEvents = () => {
    useMapEvents({
      dblclick(e) {
        const { lat, lng } = e.latlng;
        setInitialCordinates({lat:lat, lng:lng});
      }
    });
    return null;
  };
  return (
    <>
      <form className="container flex flex-col m-auto">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Informacion de Localizacion</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600"> Doble click o arrastra el puntero en el mapa interactivo tambien puedes colocar los datos de latencia y longitud directamente en los campos</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Latencia</label>
                <div className="mt-2">
                  <input type="number" name="lat" id="lat" value={initialCordinates.lat} onChange={handleCordinates} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">Longitud</label>
                <div className="mt-2">
                  <input type="number" name="lng" id="lng" value={initialCordinates.lng} onChange={handleCordinates} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
      <div className="container mx-auto">
        <MapContainer className="container m-auto" center={initialCordinates} zoom={6} scrollWheelZoom={false} doubleClickZoom={false} id="map">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <DraggableMarker cordinates={initialCordinates} changeCordinates={setInitialCordinates}/>
          <MapEvents />
        </MapContainer>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <div className="container mx-auto bg-white">
          <AreaChart weatherData={data} />
        </div>
      )}
    </>
  );
}
