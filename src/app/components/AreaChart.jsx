"use client";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from 'react';
import regression from 'regression';

export default function AreaChart({weatherData}) {

  const [activeFilter, setActiveFilter] = useState(false)
  const [areaChartData, setAreaChartData] = useState("")
  const [selectXVector, setSelectXVector] = useState("");
  const [selectYVector, setSelectYVector] = useState("");
  const [selectYVectorTitle, setSelectYVectorTitle] = useState("");
  const [selectXVectorTitle, setSelectXVectorTitle] = useState("");
  const [prediction, setPrediction] = useState("");
  const [predictionArray, setPredictionArray] = useState([]);

  const selectOptions = [{ name: "Temperatura °C", value: "temp"},{ name: "Sensacion Termica °C", value: "feels_like"},{ name: "% de Humedad", value: "humidity"},{ name: "Presion en hPa", value: "pressure"}]
  const handleXVector = (e) => {
    const { value } = e.target;
    if (value === selectYVector) {
      setSelectYVector("");
    }
    setSelectXVector(value);
    setSelectXVectorTitle(e.target.options[e.target.selectedIndex].label);
    setPredictionArray([]);
  };

  const handleYVector = (e) => {
    const { value } = e.target;
    if (value === selectXVector) {
      setSelectXVector("");
    }
    setSelectYVector(value);
    setSelectYVectorTitle(e.target.options[e.target.selectedIndex].label);
    setPredictionArray([]);
  };
  
  const handlePrediction = (e) => {
    e.preventDefault()
    const dataLinear = [];
    const dataX = [];
    const dataY = [];

    weatherData.list.forEach((entry) => {
      dataLinear.push([entry.main[selectXVector], entry.main[selectYVector] ]);
    });
    
    
    const resultRegresion = regression.linear(dataLinear);
    resultRegresion.points.push(...predictionArray, resultRegresion.predict(prediction))
    setPredictionArray([...predictionArray, resultRegresion.predict(prediction)])

    
    resultRegresion.points.sort(function (a, b) {
      if (a[0] > b[0]) {
        return 1;
      }
      if (a[0] < b[0]) {
        return -1;
      }
      return 0;
    });
    
    const arregloSinDuplicados = resultRegresion.points.reduce((acumulador, elementoActual) => {
      const existe = acumulador.some((elementoPrevio) => JSON.stringify(elementoPrevio) === JSON.stringify(elementoActual));
      if (!existe) {
        acumulador.push(elementoActual);
      }
      return acumulador;
    }, []);
  
    arregloSinDuplicados.forEach((entry) => {
      dataX.push(entry[0]);
      dataY.push(entry[1]);
    });
  
  
    setAreaChartData({
      labels: dataX,
      datasets: [
        {
          label: selectYVectorTitle,
          data: dataY,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
      options: {  
        responsive: true,
        maintainAspectRatio: false
      }
    })

    setPrediction("")
  }

  useEffect(() => {
    if (selectXVector !== "" && selectYVector !== "" && selectXVector !== selectYVector) {
      setActiveFilter(true);

      const dataLinear = [];
      const dataX = [];
      const dataY = [];

      if(activeFilter){
        weatherData.list.forEach((entry) => {
          dataLinear.push([entry.main[selectXVector], entry.main[selectYVector] ]);
        });
        
        const resultRegresion = regression.linear(dataLinear);
        //resultRegresion.points.push([...predictionArray])
      
        resultRegresion.points.sort(function (a, b) {
          if (a[0] > b[0]) {
            return 1;
          }
          if (a[0] < b[0]) {
            return -1;
          }
          return 0;
        });
        
        const arregloSinDuplicados = resultRegresion.points.reduce((acumulador, elementoActual) => {
          const existe = acumulador.some((elementoPrevio) => JSON.stringify(elementoPrevio) === JSON.stringify(elementoActual));
          if (!existe) {
            acumulador.push(elementoActual);
          }
          return acumulador;
        }, []);
      
        arregloSinDuplicados.forEach((entry) => {
          dataX.push(entry[0]);
          dataY.push(entry[1]);
        });
      
      
        setAreaChartData({
          labels: dataX,
          datasets: [
            {
              label: selectYVectorTitle,
              data: dataY,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
          ],
          options: {  
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              callbacks: {
                title: function(tooltipItems, data) {
                  // You can customize the title here
                  return 'Custom Title';
                }
              }
            },
          }
        })
      }
    } else {
      setActiveFilter(false);
      setAreaChartData("");
    }
  }, [selectXVector, selectYVector]);


  useEffect(() => {
    const dataLinear = [];
    const dataX = [];
    const dataY = [];

    if(activeFilter){
      weatherData.list.forEach((entry) => {
        dataLinear.push([entry.main[selectXVector], entry.main[selectYVector] ]);
      });
      
      const resultRegresion = regression.linear(dataLinear);
      //resultRegresion.points.push([...predictionArray])
    
      resultRegresion.points.sort(function (a, b) {
        if (a[0] > b[0]) {
          return 1;
        }
        if (a[0] < b[0]) {
          return -1;
        }
        return 0;
      });
      
      const arregloSinDuplicados = resultRegresion.points.reduce((acumulador, elementoActual) => {
        const existe = acumulador.some((elementoPrevio) => JSON.stringify(elementoPrevio) === JSON.stringify(elementoActual));
        if (!existe) {
          acumulador.push(elementoActual);
        }
        return acumulador;
      }, []);
    
      arregloSinDuplicados.forEach((entry) => {
        dataX.push(entry[0]);
        dataY.push(entry[1]);
      });
      setAreaChartData({
        labels: dataX,
        datasets: [
          {
            label: selectYVectorTitle,
            data: dataY,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
        options: {  
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }
  }, [activeFilter]);

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          title: function (tooltipItems) {
            const title = `${selectXVectorTitle} ${tooltipItems[0].label}`;
            return title;
          },
        },
      },
    },
  };
  return (
    <>
      <form className="container flex flex-col m-auto">
        <div className="pt-12 pb-12 mx-4 md:mx-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900  text-center md:text-left">Grafica regresion linear</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600  text-center md:text-left">Elija las caracteristicas climaticas del eje X y Y para mostrar la grafica</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900  text-center md:text-left">Eje X</label>
              <div className="mt-2">
                <select aria-label="Input Vector X" value={selectXVector} onChange={handleXVector}  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  <option value="" disabled>Selecciona Vector X</option>
                  {selectOptions.map((option ,key) => (
                    <option key={key} label={option.name} value={option.value}></option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900  text-center md:text-left">Eje Y</label>
              <div className="mt-2">
                <select aria-label="Input Vector Y" value={selectYVector} onChange={handleYVector} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6">
                  <option value="" disabled>Selecciona Vector Y</option>
                  {selectOptions.map((option ,key) => (
                    <option key={key} label={option.name} value={option.value}></option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
      {
        areaChartData 
        &&
        <>
          <form onSubmit={handlePrediction}>
            <div className="border-b border-gray-900/10 pb-12 mx-4 md:mx-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900 text-center md:text-left">Prediccion con el metodo de regresion linear</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 text-center md:text-left">Agrega un valor nuevo a el eje X para lograr una prediccion con la formula de regresion lineal</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900 text-center md:text-left">Nuevo Valor eje X</label>
                  <div className="mt-2">
                    <input aria-label="Input prediccion eje X" type="number" step="any" value={prediction} onChange={(e) => {setPrediction(e.target.value)}} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="sm:col-span-3 mt-auto">
                  <button aria-label="Boton agregar valor eje X" type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Agregar Prediccion</button>
                </div>
              </div>
            </div>
          </form>
          <div className="h-[80vh] m-auto flex justify-center">
            <Line data={areaChartData}  options={options}/>
          </div> 
        </>
      }
    </>
  );
}
