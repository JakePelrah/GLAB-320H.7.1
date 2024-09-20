import { useState, useEffect } from "react";
import "./App.css";

import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  // Constant with your API Key
  const apiKey = "f1b7f444";

  // State to hold movie data
  const [movie, setMovie] = useState({});

  // Function to get movies
  const getMovie = async (searchTerm) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch (e) {
      console.error(e)
    }
  }


  function pad(num, size) { return ('0000000' + num).substr(-size); }

  const getMovieById = async () => {
    try {
      const randomTT = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt${pad(Math.floor(Math.random() * 9999999), 7)}`
      
      console.log(randomTT)
      const response = await fetch(
        randomTT
      );
      const data = await response.json();
      if (data.Response === 'False') {
        console.log('call again')
        getMovieById()
      }
      setMovie(data);
    } catch (e) {
      console.error(e)
    }
  }

  // This will run on the first render but not on subsquent renders
  useEffect(() => {
    getMovieById()
  }, []);


  // We pass the getMovie function as a prop called moviesearch
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}