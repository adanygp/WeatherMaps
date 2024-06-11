
# DinametraChart  NextJs

Este Proyecto es una prueba para la empresa dinametra basado en una llamada a la API OpenWeather con lo cual se logran hacer 2 graficas con las caracteristicas climaticas adquiridas ademas de cambios a las graficas gracias a los diferentes filtros


## desplegar
Node version 20.13  
npm version 10.5    

Para correr el proyecto ejecuta

```bash
  npm install
```
```bash
  npm run dev
```
Agregar api key en el archivo .env.local  
```bash
NEXT_PUBLIC_API_KEY=77c1bc8254074d5f6da1b17e9975b58d
```
## Componentes

- Custom Hook para la llamada a la API
    
  Se Utiliza un custom hook para obtener la informacion de la api el cual regresa 3 posibles estados que son  
  error - cuando ocurrio un error en la llamada  
  loading - cuando se esta esperando los datos de la llamada a la API  
  data - cuando devuelve la informacion correctamente despues de llamarla sin problemas
  
- Formulario de coordenadas
  
  Formulario con los 2 datos de coordenadas lat y lon para elegir la ubicacion exacta de donde se quiere sacar la informacion climatica en la API
  
- Mapa Interactivo para el cambio de coordenadas
  
  Mapa interactivo con la libreria react-leaflet que permite controlar un marcador y los inputs de cordenadas para hacer una llamada a la API con la informacion de la ubicacion seleccionada
  
- Formulario con caracteristicas climaticas
  
  Formulario con las caracteristicas climaticas de la API conlleva 2 selects para seleccionar los datos de la grafica de regresion linear a crear

- Grafica de regresion linear
  
  Grafica de regresion linear creada a partir de la libreria react-chartjs-2 y regression.js llegando a calcular la regresion linear con los datos seleccionados a partir del formulario de caracteristicas climaticas 

- Formulario Prediccion Regresion Linear
  
  Formulario con un solo campo y boton de agregar el cual agrega un nuevo punto en el vector X de la grafica de regresion linear se utiliza para saber la posibilidad de un valor con un punto fuera de la informacion de la API, este tambien creado a partir de las librerias react-chartjs-2 y regression.js

- Formulario Rando de Fechas
  
  Formulario con 2 campos de fechas creados a partir de la libreria react-datepicker en el cual se selecciona un rango de fechas a partir de las fechas posibles que se obtienen con la informacion de la API 

- Grafica Temperaturas / Fechas
  
  Grafica de comparacion de temperatura y sensacion respecto a las fechas seleccionadas en el formulario de rango de fechas, esta tiene el objetivo de mostrar la comparativa de estas 2 temperaturas y su cambio a traves del tiempo

## Pagina desplegada en Vercel
[https://dinametracharts.vercel.app/](https://dinametracharts.vercel.app/)  

## Website  
![image](https://github.com/adanygp/dinametracharts/assets/75685244/22bd2949-188e-46ee-b9f7-12cf166d621f)
![image](https://github.com/adanygp/dinametracharts/assets/75685244/cb75df90-0cd3-48cf-842e-d9080d4bcad1)
![image](https://github.com/adanygp/dinametracharts/assets/75685244/9a2f228c-15f8-4b04-b1b1-111f564f877d)



