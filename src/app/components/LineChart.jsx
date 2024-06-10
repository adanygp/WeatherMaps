"use client";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { addDays, isBefore, isAfter, format } from 'date-fns';
import LineChartForm from "./LineChartForm";


export default function LineChart({weatherData}) {

  const [areaChartData, setAreaChartData] = useState("")
  return (
    <>
      <LineChartForm weatherData={weatherData} setAreaChartData={setAreaChartData} />
      {
        areaChartData 
        &&
        <div className="h-auto m-auto flex justify-center">
          <Line data={areaChartData} />
        </div> 
      }
    </>
  );
}
