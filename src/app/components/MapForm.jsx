"use client";

export default function MapForm({ initialCordinates, handleCordinates }) {
  return (
    <form className='container flex flex-col m-auto pt-6'>
      <div className='space-y-12 mx-4 md:mx-0'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900 text-center md:text-left'>
            Informacion de Localizacion
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600 text-center md:text-left'>
            Doble click o arrastra el puntero en el mapa interactivo tambien
            puedes colocar los datos de Latitud y longitud directamente en los
            campos
          </p>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label className='block text-sm font-medium leading-6 text-gray-900  text-center md:text-left'>
                Latitud
              </label>
              <div className='mt-2'>
                <input
                  aria-label='Input de Latitud'
                  type='number'
                  name='lat'
                  id='lat'
                  min='-90'
                  max='90'
                  value={initialCordinates.lat}
                  onChange={handleCordinates}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
            <div className='sm:col-span-3'>
              <label className='block text-sm font-medium leading-6 text-gray-900  text-center md:text-left'>
                Longitud
              </label>
              <div className='mt-2'>
                <input
                  aria-label='Input de Longitud'
                  type='number'
                  name='lng'
                  id='lng'
                  min='-180'
                  max='180'
                  value={initialCordinates.lng}
                  onChange={handleCordinates}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
