import React, { useState, useEffect } from "react";
import instance from "../axios";
import request from "../request";
import "./Banner.css";


function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const reques = await instance.get(request.fetchNetflixOriginals);
      //   console.log(reques.data.results);
      setMovie(
        reques.data.results[
        Math.floor(Math.random() * reques.data.results.length - 1)
        ]
      );
      return reques;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return (str?.length > n ? str.substr(0, n - 1) + "..." : str)
  }
  //   console.log(movie.name);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-content">
        <h1 className='banner-title'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className='banner-description'>
          {truncate(movie?.overview, 120)}
        </h1>
      </div>

      <div className='banner-fadeButtom' />
    </header>
  );
}

export default Banner;
