import React, { useState, useEffect } from "react";
import instance from "../axios";
import "./Row.css";

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseImgUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchUrl);
      // console.log(request.data);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (x) => {
    // console.log(x.name || x?.title || x?.original_name)
    if (trailerUrl) {
      console.log(trailerUrl)
      setTrailerUrl('')
    } else {
      movieTrailer(x?.name || x?.title || x?.original_name || ' ')
        .then(url => {
          // https://www.youtube.com/watch?v=XtMThy8QKqU&t=4955s
          // ? in url is search
          console.log(url)
          const urlParam = new URLSearchParams(new URL(url).search);
          console.log(urlParam)
          // console.log(urlParam.get('v'))
          setTrailerUrl(urlParam.get('v'))
        })
        .catch((err) => console.log(err))
    }
  }

  // console.table(trailerUrl)
  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row-posters">
          {movies.map((x) => (
            <img
              className={`row-poster ${isLargeRow && "row-poster-lg"}`}
              key={x.id} onClick={() => handleClick(x)}
              // onClick={handleClick(x)}
              src={`${baseImgUrl}${isLargeRow ? x.poster_path : x?.backdrop_path
                }`}
              alt={x.name}
            />
          ))}
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
}

export default Row;
