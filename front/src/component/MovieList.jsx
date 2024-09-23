import { useState } from "react";

const MovieList = ({ movies, onMovieClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 4;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className="movie-list">
      <h2>Most Popular Movies</h2>
      <div className="movies">
        {currentMovies.map((movie) => (
          <div key={movie.ID} className="movie" onClick={() => onMovieClick(movie)}>
            <img src={movie.image} alt={movie.name} className="movie-img" />
            <div className="movie-info">
              <h3>{movie.name}</h3>
              <p>{movie.time} min {movie.year}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="nav-btn">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}>Previous</button>
        )}
        {movies.length > 4 && <button onClick={handleNextPage}>Next</button>}
      </div>
    </div>
  );
}

export default MovieList;