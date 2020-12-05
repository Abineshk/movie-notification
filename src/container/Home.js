import React from "react";
import { movies } from "../Data/movie-data.json";
export default function Home() {
  return (
    <div>
      {movies.map((movie) => {
        return (
          <div>
            Movie Name and Release date
            <div>{movie.name}</div>
            <div>{movie.releasedate}</div>
          </div>
        );
      })}
    </div>
  );
}
