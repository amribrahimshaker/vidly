import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
// import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getMovie, saveMovie } from "../services/movieService";
// import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate")
  };

  async populateGenres() {
    // const genres = getGenres();
    // this.setState({ genres });

    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    // const movie = getMovie(movieId);
    try {
      const { data: movie } = await getMovie(movieId);
      // console.log("movie...", movie);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);
    // {_id: "5e645986a8b9723f5c01a0d5", title: "Airplane", genreId: "5e645986a8b9723f5c01a0d4", numberInStock: 5, dailyRentalRate: 2}

    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
  // render() {
  //   const { match, history } = this.props;
  //   return (
  //     <div>
  //       <h1>Movie Form {match.params.id}</h1>
  //       <button
  //         className="btn btn-primary"
  //         onClick={() => history.push("/movies")}
  //       >
  //         Save
  //       </button>
  //     </div>
  //   );
  // }
}

export default MovieForm;
