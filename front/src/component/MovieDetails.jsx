import React from 'react';

function MovieDetails({ movie, onClose }) {
  return (
    <div className="movie-details">
      <img src={movie.image} alt={movie.name} className='movie-detail-img' />
      <div className="movie-info">
        <div className="movie-name">
          <h2>{movie.name}</h2>
          <p>{movie.time} min {movie.year}</p>
        </div>
        <p>{movie.introduce}</p>
        <div className="play-btn-div">
          <button className='play-btn'>PLAY MOVIE</button>
        </div>
        <div className="close-btn-div">
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;