"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, isBefore, isAfter, format } from "date-fns";

export default function LineChartForm({ weatherData, setAreaChartData }) {
  const [startDate, setStartDate] = useState(addDays(new Date(), 1));
  const [endDate, setEndDate] = useState(addDays(new Date(), 5));

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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
    const filteredWeatherData = weatherData.list.filter((data) => {
      const dataDate = new Date(data.dt_txt);
      startDate.setHours(0, 0, 0);
      endDate.setHours(23, 59, 59);
      return dataDate >= startDate && dataDate <= endDate;
    });

    const graphDates = [];
    const graphTemp = [];
    const graphFeelsLike = [];

    filteredWeatherData.forEach((entry) => {
      const date = new Date(entry.dt_txt);
      const formattedDate = format(date, "MMM dd - HH:mm");
      graphDates.push(formattedDate);
      graphTemp.push(entry.main.temp);
      graphFeelsLike.push(entry.main.feels_like);
    });
    setAreaChartData({
      labels: graphDates,
      datasets: [
        {
          label: `Temperatura °C`,
          data: graphTemp,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
        {
          label: `Sensacion Termica °C`,
          data: graphFeelsLike,
          backgroundColor: "rgb(135,206,235)",
          borderColor: "rgb(0,191,255)",
          borderWidth: 1,
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, [startDate, endDate]);

  return (
    <form className='container flex flex-col m-auto'>
      <div className='pt-12 pb-12 mx-4 md:mx-0'>
        <h2 className='text-base font-semibold leading-7 text-gray-900 text-center md:text-left'>
          Grafica Temperaturas Futuras
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600 text-center md:text-left'>
          Elija el rango de dias a calcular, maximo 5 dias a futuro
        </p>
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
          <div className='sm:col-span-3'>
            <label className='block text-sm font-medium text-gray-700 text-center md:text-left'>
              Fecha de Inicio
            </label>
            <div className='mt-2'>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={addDays(new Date(), 1)}
                maxDate={addDays(new Date(), 5)}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700'
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
          </div>
          <div className='sm:col-span-3'>
            <label className='block text-sm font-medium text-gray-700 text-center md:text-left'>
              Fecha Final
            </label>
            <div className='mt-2'>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={minEndDate}
                maxDate={maxEndDate}
                className='mt-1 block w-full p-2 border border-gray-300 rounded-md text-gray-700'
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
        <p className='mt-1 text-sm leading-6 text-gray-600 flex justify-center text-center md:text-left'>
          Desde {startDate.toLocaleDateString("es-ES", dateOptions)} a{" "}
          {endDate.toLocaleDateString("es-ES", dateOptions)}
        </p>
      </div>
    </form>
  );
}
