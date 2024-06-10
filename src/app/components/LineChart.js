"use client";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addDays, isBefore, isAfter } from 'date-fns';


export default function LineChart({weatherData, fetchUrl}) {

  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  console.log('weatherData',weatherData)
  const [areaChartData, setAreaChartData] = useState("")
 
  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const [endDate, setEndDate] = useState(addDays(new Date(), 5));

  const handleStartDateChange = (date) => {
    if (isAfter(date, endDate)) {
      setEndDate(date);
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (isBefore(date, startDate)) {
      setStartDate(date);
    }
    setEndDate(date);
  };

  const minEndDate = addDays(new Date(), 1);
  const maxEndDate = addDays(new Date(), 5);

  useEffect(() => {

    const filteredWeatherData = weatherData.list.filter(data => {
      const dataDate = new Date(data.dt_txt);
      startDate.setHours(0, 0, 0);
      endDate.setHours(23, 59, 59);
      return dataDate >= startDate && dataDate <= endDate;
    });
    console.log('filter',filteredWeatherData)
    const graphDates = [];
    const graphTemp = [];
    const graphFeelsLike = [];

    filteredWeatherData.forEach((entry) => {
      graphDates.push(entry.dt_txt);
      graphTemp.push(entry.main.temp);
      graphFeelsLike.push(entry.main.feels_like);
    });

    console.log('graphDates',graphDates)
    console.log('graphTemp',graphTemp)
    console.log('graphFeelsLike',graphFeelsLike)
    setAreaChartData({
      labels: graphDates,
      datasets: [
        {
          label: `Temperatura`,
          data: graphTemp,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: `Sensacion Termica`,
          data: graphFeelsLike,
          backgroundColor: "rgb(135,206,235)",
          borderColor: "rgb(0,191,255)",
          borderWidth: 1,
        },
      ],
      options: {  
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }, [fetchUrl, startDate, endDate]);
  

  return (
    <>
      {
        areaChartData 
        ?
        <>
          <form className="container flex flex-col m-auto">
            <div className="pt-12 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Grafica Temperaturas Futuras</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Elija el rango de dias a calcular, maximo 5 dias a futuro</p>
              <div className="p-4">
                <div className="flex justify-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleStartDateChange}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      minDate={addDays(new Date(), 1)}
                      maxDate={addDays(new Date(), 5)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                      onKeyDown={(e) => e.preventDefault()} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha Final</label>
                    <DatePicker
                      selected={endDate}
                      onChange={handleEndDateChange}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={minEndDate}
                      maxDate={maxEndDate}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700"
                      onKeyDown={(e) => e.preventDefault()} 
                    />
                  </div>
                </div>
                <p className="mt-4 text-center font-medium text-gray-700"> Desde {startDate.toLocaleDateString('es-ES', dateOptions)} a {endDate.toLocaleDateString('es-ES', dateOptions)}</p>
              </div>
            </div>
          </form>
          <div className="h-[80vh] m-auto flex justify-center">
            <Line data={areaChartData} />
          </div> 
        </>
        : 
        <div className="h-[80vh] w-100 bg-gray-200"></div>
      }
    </>
  );
}
