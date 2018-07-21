import React from 'react';
import WeatherBox from './WeatherBox';

const WeatherListBox = ( { cities }) => {
  // const citiesArr = ;

  return (
    <div>
      {cities.map((city, index) => <WeatherBox key={index} item={city}/>)}
    </div>
  );
};

export default WeatherListBox;