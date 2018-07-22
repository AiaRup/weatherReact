import React from 'react';
import WeatherBox from './WeatherBox';

const WeatherListBox = ({ cities, deletePost, deleteComment, addComment }) => {

  return (
    <div>
      {cities.map((city, index) => <WeatherBox key={index} item={city} index={index} deletePost={deletePost} deleteComment={deleteComment} addComment={addComment}/>)}
    </div>
  );
};

export default WeatherListBox;