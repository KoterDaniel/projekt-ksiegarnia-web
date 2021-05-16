import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Kategorie</h3>
          <h3>{this.state.content}</h3>
        </header>
        <div class="dropdown show ml-3 mb-3">
          {" "}
          <a
            class="btn btn-dark dropdown-toggle"
            href=""
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {" "}
            Wybierz Kategorie{" "}
          </a>{" "}
          <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            {" "}
            <a class="dropdown-item" href="#">
              Drama
            </a>{" "}
            <a class="dropdown-item" href="#">
              Fantasy
            </a>{" "}
            <a class="dropdown-item" href="#">
              Thriller
            </a>{" "}
          </div>{" "}
        </div>
      </div>
    );
  }
}
