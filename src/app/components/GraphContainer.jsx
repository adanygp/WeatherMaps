"use client";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";

export default function GraphContainer ({loading, data, error}) {

  if(error) {
    return <div>{error.message}</div>
  }
  if(loading){
    return <div>Loading...</div>
  }
  if(!data){
    return null 
  }
  return (
    <div className="container mx-auto bg-white">
        <AreaChart weatherData={data}/>
        <LineChart weatherData={data}/>
    </div>
  );
}
