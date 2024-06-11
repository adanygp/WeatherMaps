"use client";
import AreaChart from "./AreaChart";
import LineChart from "./LineChart";

export default function GraphContainer({ loading, data, error }) {
  if (error) {
    return (
      <div
        className='container bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  text-center mx-auto'
        role='alert'
      >
        <strong className='font-bold'>Error:</strong>
        <span className='block sm:inline'>{error.message}</span>
      </div>
    );
  }
  if (loading) {
    return  (
      <div
        className='container bg-yellow-100 border border-red-400 text-red-700 px-4 py-3 rounded  text-center mx-auto'
        role='alert'
      >
        <strong className='font-bold'>Loading...</strong>
      </div>
    );
  }
  if (!data) {
    return null;
  }
  return (
    <div className='container mx-auto bg-white pb-6'>
      <AreaChart weatherData={data} />
      <LineChart weatherData={data} />
    </div>
  );
}
