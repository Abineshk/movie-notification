import React from "react";
import { Row } from "react-bootstrap";
import firebase from "../firebase";
import { movies } from "../Data/movie-data.json";
import { browserHistory } from "react-router";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedStatus: "no",
      page: "add",
      addMovieText: "Add Movie",
      uploadText: "Upload",
      updateText: "Update",
      deleteLoading: true,
      loading: "true",
      movies: [],
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    if (!this.state.user) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          let u = {
            ...user,
            role: user.email === "test@gmail.com" ? "admin" : "user",
          };
          this.setState({
            user: u,
          });
        } else {
          this.setState({ user: null });
        }
      });
    }
  }
  toCamelCase(str) {
    return str
      .replace(/\s(.)/g, function ($1) {
        return $1.toUpperCase();
      })
      .replace(/\s/g, "")
      .replace(/^(.)/, function ($1) {
        return $1.toLowerCase();
      });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      addMovieText: "Adding",
    });
    if (this.state.uploadedStatus === "yes") {
      let id = Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      id = id + this.state.movieName;
      firebase
        .database()
        .ref("movies/" + id)
        .set({
          name: this.state.movieName,
          releaseDate: this.state.releaseDate,
          imageUrl: this.state.url,
        })
        .then(() => {
          this.setState(
            {
              movieName: "",
              releaseDate: "",
              file: "",
              url: "",
              uploadedStatus: "no",
              addMovieText: "Add",
              uploadText: "Upload",
            },
            () => {
              document.getElementById("movie-img").style.display = "none";
              document.getElementById("form-admin").reset();
            }
          );
        });
    }
  }
  onMovieNameChange(e) {
    this.setState({
      movieName: e.target.value,
    });
  }
  onMovieReleaseDateChange(e) {
    this.setState({
      releaseDate: e.target.value,
    });
  }
  onFileChange(e) {
    this.setState({
      file: e.target.files[0],
    });
  }
  upload(e) {
    e.preventDefault();
    this.setState({ uploadText: "Uploading" });
    let bucketName = "images";
    let that = this;
    let file = this.state.file;
    let storageRef = firebase
      .storage()
      .ref(`${bucketName}/${this.state.movieName}`);
    storageRef.put(file).then((res) => {
      if (res._delegate.state === "success") {
        this.setState({ uploadText: "Uploaded" });
      } else {
        this.setState({ uploadText: "Upload doesn't completed" });
      }
      storageRef.getDownloadURL().then((url) => {
        that.setState({ url, uploadedStatus: "yes" }, () => {
          document.getElementById("movie-img").style.display = "block";
        });
      });
    });
  }
  onDelete(name, e) {
    e.preventDefault();
    // firebase.database().ref('users/' + name).remove().then((res)=>{
    //   //sucessful
    //   console.log(res)
    // })
    // .catch(err => {
    //   //error
    //   console.log(err)
    // })
    // firebase.database().ref('movies/').update({
    //   name:null
    // });
    let that = this;
    firebase
      .database()
      .ref("movies/" + name)
      .remove()
      .then(() => {
        that.setState({
          deleteLoading: true,
        });
        firebase
          .database()
          .ref("/movies")
          .once("value")
          .then((data) => {
            let movie = data.val() ? data.val() : {};
            let movies = [];
            Object.keys(movie).map((key) => {
              let m = {
                ...movie[key],
                key,
              };
              movies.push(m);
            });
            this.setState({
              movies,
              deleteLoading: false,
            });
          });
      });
  }
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        browserHistory.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  onEvent(page, e) {
    e.preventDefault();
    this.setState({ page });
    let that = this;
    if (page === "delete") {
      that.setState({
        deleteLoading: true,
      });
      firebase
        .database()
        .ref("/movies")
        .once("value")
        .then((data) => {
          let movie = data.val() ? data.val() : {};
          let movies = [];
          Object.keys(movie).map((key) => {
            let m = {
              ...movie[key],
              key,
            };
            movies.push(m);
          });
          this.setState({
            movies,
            deleteLoading: false,
          });
        });
    }
  }
  render() {
    return (
      <div>
        {this.state.user ? (
          <div>
            {this.state.user.role === "user" ? (
              <div>
                Hi User Enroll for notiifcation in whatsapp for new movie
                release update
              </div>
            ) : (
              <form id="form-admin">
                Hi admin
                <button
                  className={
                    this.state.page === "add" ? "button-active" : "button"
                  }
                  onClick={this.onEvent.bind(this, "add")}
                >
                  Add
                </button>
                <button
                  className={
                    this.state.page === "delete" ? "button-active" : "button"
                  }
                  onClick={this.onEvent.bind(this, "delete")}
                >
                  Delete
                </button>
                {this.state.page === "add" && (
                  <div>
                    <Row>Movie Name</Row>
                    <Row>
                      <input
                        type="text"
                        className="input-text"
                        id="input-text"
                        onChange={this.onMovieNameChange.bind(this)}
                        required
                      />
                    </Row>
                    <Row>Movie Release Date</Row>
                    <Row>
                      <input
                        type="date"
                        className="input-date"
                        id="input-date"
                        onChange={this.onMovieReleaseDateChange.bind(this)}
                        required
                      />
                    </Row>
                    <Row>
                      <input
                        type="file"
                        className="input-file"
                        id="file-input"
                        onChange={this.onFileChange.bind(this)}
                        required
                      />
                      <button
                        className="upload-button"
                        onClick={this.upload.bind(this)}
                      >
                        {this.state.uploadText}
                      </button>
                    </Row>
                    <Row>
                      <img
                        id="movie-img"
                        height="150"
                        width="120"
                        style={{ display: "none" }}
                        src={this.state.url}
                      ></img>
                    </Row>
                    <Row>
                      <button
                        className="button"
                        onClick={this.onSubmit.bind(this)}
                      >
                        {this.state.addMovieText}
                      </button>
                    </Row>
                  </div>
                )}
                {this.state.page === "delete" && (
                  <div>
                    {this.state.movies.length > 0 ? (
                      this.state.deleteLoading ? (
                        <div>Loading</div>
                      ) : (
                        <div>
                          <div className="head">Select movie to delete</div>
                          <div className="home">
                            {this.state.movies.map((movie, index) => {
                              return (
                                <div
                                  onClick={this.onDelete.bind(this, movie.key)}
                                  key={`${movie}-${index}`}
                                  className="movie-container"
                                >
                                  {console.log(movie)}
                                
                                  <img
                                    className="img-movie"
                                    height="200"
                                    width="200"
                                    src={movie.imageUrl}
                                  ></img>
                                  <div className="movie-title">
                                    {movie.name}
                                  </div>
                                  <div className="movie-release-date">
                                    {movie.releaseDate.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2-$1")}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )
                    ) : (
                      <div>No Movies to display</div>
                    )}
                  </div>
                )}
              </form>
            )}
            <button className="logout-button" onClick={this.logout}>
              Logout
            </button>
          </div>
        ) : (
          "You are not having to access this page"
        )}
      </div>
    );
  }
}

export default Dashboard;
