import React, { Component } from "react";

import UserService from "../services/user.service";
import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";

export default class News extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      daneUzytkownika: "Dane użytkownika",
      historiaZakupow: "Historia zakupów",
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
          <h3>Nowości</h3>
          <h3>{this.state.content}</h3>
        </header>

        <div className="row">
          <div className="col-lg-6 col-md-6">
            <p class="h4">{this.state.historiaZakupow}</p>
          </div>
          <div className="col-lg-6 col-md-6">
            <p class="h4">{this.state.daneUzytkownika}</p>
          </div>
        </div>

        <div className="row my-5">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <p class="font-weight-normal h5">Tytuł: </p>
            <p class="font-weight-normal h5">data zakupu: </p>
            <p class="font-weight-normal h5">cena zakupu: </p>
            <div
              className="book-item mb-5"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>

            <p class="font-weight-normal h5">Tytuł: </p>
            <p class="font-weight-normal h5">data zakupu: </p>
            <p class="font-weight-normal h5">cena zakupu: </p>
            <div
              className="book-item mb-5"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <p class="font-weight-normal h5">Nick: </p>
            <p class="font-weight-normal h5">Email: </p>
          </div>
        </div>
      </div>
    );
  }
}
