import React from "react";
import { movies } from "../Data/movie-data.json";
export default function Home() {
  return (
    <div>
      <div className="head">Movie Name and Release date</div>
      <div className="home">
        {movies.map((movie) => {
          return (
            <div className="movie-container">
              <div className="movie-title">{movie.name}</div>
              <div className="movie-release-date">{movie.releasedate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
