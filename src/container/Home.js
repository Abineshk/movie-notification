import React from "react";
import { render } from "react-dom";
import { movies } from "../Data/movie-data.json";
import firebase from "../firebase";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref("/movies")
      .once("value")
      .then((data) => {
        let movie = data.val() ? data.val() : {};
        let movies = [];
        Object.keys(movie).map((key) => {
          movies.push(movie[key]);
        });
        console.log("movies", movies);
        this.setState({
          movies,
          loading: false,
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.loading ? (
          <div> Loading </div>
        ) : (
          <div>
            {
              this.state.movies.length>0?
              <React.Fragment>
                <div className="head">Movie Name and Release date</div>
                <div className="home">
                  {this.state.movies.map((movie, index) => {
                    return (
                      <div
                        key={`${movie}-${index}`}
                        className="movie-container"
                      >
                        {console.log(movie.imageUrl)}
                        <img
                          className="img-movie"
                          height="200"
                          width="200"
                          src={movie.imageUrl}
                        ></img>
                        <div className="movie-title">{movie.name}</div>
                        <div className="movie-release-date">
                          {movie.releaseDate.toString().split("").reverse().join("")}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </React.Fragment>
              :<div className="no-data">No Movies to display</div>
            }
          </div>
        )}
      </div>
    );
  }
}
