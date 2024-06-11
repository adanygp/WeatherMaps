'use strict';
"use client"; 
import dynamic from "next/dynamic"
import {useState, useEffect} from "react";
import GraphContainer from "./components/GraphContainer";
import MapForm from "./components/MapForm";
import useFetch from "./hooks/useFetch";
const Map = dynamic(() => import("./components/Map"), { ssr:false })
import 'leaflet/dist/leaflet.css'
import 'react-datepicker/dist/react-datepicker.css';
export default function Home() {

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [initialCordinates , setInitialCordinates] = useState({ lat: 20, lng: -105,})
  const { data, loading, error } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${initialCordinates.lat}&lon=${initialCordinates.lng}&appid=${apiKey}&units=metric`);
  
  const handleCordinates = (e) => {
      const { name, value } = e.target;
      setInitialCordinates({...initialCordinates, [name]:value})
  }

  
  return (
    <>
      <MapForm initialCordinates={initialCordinates} handleCordinates={handleCordinates} />
      <div className="container mx-auto"> 
        <Map cordinates={initialCordinates} changeCordinates={setInitialCordinates}/>
      </div>
      <GraphContainer loading={loading} data={data} error={error}/>
    </>
  );
}
