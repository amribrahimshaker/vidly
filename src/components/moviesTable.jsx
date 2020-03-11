import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";

import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: movie => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        ></Like>
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    // console.log("user", user); // user {_id: "5e650a76589fad267c1d9305", name: "Amr", email: "user1@domain.com", isAdmin: true, iat: 1583781361}

    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
      // <table className="table">
      //   <TableHeader
      //     columns={this.columns}
      //     sortColumn={sortColumn}
      //     onSort={onSort}
      //   />
      //   <TableBody data={movies} columns={this.columns}></TableBody>
      // </table>

      // <table className="table">
      //   <TableHeader
      //     columns={this.columns}
      //     sortColumn={sortColumn}
      //     onSort={onSort}
      //   />
      //   <TableBody data={movies} columns={this.columns}></TableBody>

      //   {/* <tbody>
      //     {movies.map(movie => (
      //       <tr key={movie._id}>
      //         <td>{movie.title}</td>
      //         <td>{movie.genre.name}</td>
      //         <td>{movie.numberInStock}</td>
      //         <td>{movie.dailyRentalRate}</td>
      //         <td>
      //           <Like liked={movie.liked} onClick={() => onLike(movie)}></Like>
      //         </td>
      //         <td>
      //           <button
      //             onClick={() => onDelete(movie)}
      //             className="btn btn-danger btn-sm"
      //           >
      //             Delete
      //           </button>
      //         </td>
      //       </tr>
      //     ))}
      //   </tbody> */}
      // </table>
    );
  }
}

export default MoviesTable;
