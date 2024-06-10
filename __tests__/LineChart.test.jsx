/** @jest-environment jsdom */
import React from "react";
import { render, screen } from "@testing-library/react";
import LineChart from "../src/app/components/LineChart";

const weatherData = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1717999200,
      main: {
        temp: 289.71,
        feels_like: 289.93,
        temp_min: 289.71,
        temp_max: 289.71,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 969,
        humidity: 96,
        temp_kf: 0,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n",
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 0.09,
        deg: 122,
        gust: 0.09,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n",
      },
      dt_txt: "2024-06-10 06:00:00",
    },
    {
      dt: 1718010000,
      main: {
        temp: 289.46,
        feels_like: 289.68,
        temp_min: 288.95,
        temp_max: 289.46,
        pressure: 1012,
        sea_level: 1012,
        grnd_level: 968,
        humidity: 97,
        temp_kf: 0.51,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n",
        },
      ],
      clouds: {
        all: 2,
      },
      wind: {
        speed: 0.93,
        deg: 88,
        gust: 0.91,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n",
      },
      dt_txt: "2024-06-10 09:00:00",
    },
    {
      dt: 1718096400,
      main: {
        temp: 290.85,
        feels_like: 291.08,
        temp_min: 290.85,
        temp_max: 290.85,
        pressure: 1008,
        sea_level: 1008,
        grnd_level: 965,
        humidity: 92,
        temp_kf: 0,
      },
      weather: [
        {
          id: 803,
          main: "Clouds",
          description: "broken clouds",
          icon: "04n",
        },
      ],
      clouds: {
        all: 70,
      },
      wind: {
        speed: 0.46,
        deg: 134,
        gust: 0.6,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "n",
      },
      dt_txt: "2024-06-11 09:00:00",
    },
  ],
  city: {
    id: 3981391,
    name: "Tomatlán",
    coord: {
      lat: 20,
      lon: -105,
    },
    country: "MX",
    population: 8360,
    timezone: -21600,
    sunrise: 1717935604,
    sunset: 1717983535,
  },
};

describe("LineChart", () => {
  test("Should Render Headings and texts properly", async () => {
    render(<LineChart weatherData={weatherData} />);
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Grafica Temperaturas Futuras"
    );
    expect(
      screen.getByText(
        "Elija el rango de dias a calcular, maximo 5 dias a futuro"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Eje X")).toBeInTheDocument();
    expect(screen.getByText("Eje Y")).toBeInTheDocument();
  });
});
