import React, { Component } from "react";

import UserService from "../services/user.service";

// obsługa karuzeli

// components & assets
import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";
import Book1 from "../assets/book1.jpg";
import Book2 from "../assets/book2.jpg";
import Book3 from "../assets/book3.jpg";
import Book4 from "../assets/book4.jpg";

export default class Home extends Component {
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
      <div>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-interval="5000"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            <li
              data-target="#carouselExampleIndicators"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={Banner1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={Banner2} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={Banner3} alt="Third slide" />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <h2 className="display-4">
          <strong>Bestsellers</strong>
        </h2>
        <div className="row-fluid">
          <div className="col-lg-12 col-md-10">
            <div className="book-container">
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book1})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book2})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book3})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book4})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book1})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book2})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book3})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book4})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book1})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book2})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book3})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book4})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book1})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book2})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book3})` }}
              ></div>
              <div
                className="book-item"
                style={{ backgroundImage: `url(${Book4})` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
