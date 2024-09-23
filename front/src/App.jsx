import React, { useEffect, useState } from "react";
import MovieList from "./component/MovieList";
import MovieDetails from "./component/MovieDetails";
import "./App.css";
import { IoMenu } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import axios from "axios";

function App() {
  const [listData, setListData] = useState([]);
  const [pageNumber,setPageNumber]=useState(1);
  console.log(pageNumber)
  const fetchData = async () => {
    const pn=pageNumber;
    const ans = await axios.get("http://localhost:8000/"+String(pn));
    setListData(ans.data.data.items);
  };
  useEffect(() => {fetchData();}, []);
  console.log(listData);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  const handleNext=()=>{
    const pn=pageNumber
    if(pageNumber==3){
      setPageNumber(1)
    }else{
      setPageNumber(pn+1)
    }
    
    fetchData()
  }

  return (
    <div className="container">
      <div className="content">
        <div className="header">
          <div className="menu">
            <IoMenu />
          </div>
          <div className="logo"></div>
          <div className="search">
            <IoSearch />
          </div>
        </div>
        <MovieList movies={listData} onMovieClick={handleMovieClick} />
        <button onClick={handleNext}>next</button>
        {selectedMovie && (
          <MovieDetails movie={selectedMovie} onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

export default App;