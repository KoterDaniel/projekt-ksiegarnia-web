import React, { Component } from "react";

import UserService from "../services/user.service";

import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";
import book3 from "../assets/book3.jpg";
import book4 from "../assets/book4.jpg";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      menuTitle: "Wybierz kategorie",
      title: "Kategoria",
      drama: "Drama",
      fantasy: "Fantasy",
      thriller: "Thriller",
      inne: "Inne",
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

  ChangeCategory = () => {
    //var x = this.state.fantasy;

    var x = document.getElementsByClassName("dropdown-item")[0];
    this.setState({ menuTitle: x.textContent });
    this.setState({ title: x.textContent });

    var index;
    var list = document.getElementsByClassName("book-item");

    if (x.textContent === "Drama") {
      for (index = 0; index < list.length; ++index) {
        list[index].style.backgroundImage = `url(${book1})`;
      }
    } else if (x.textContent === "Fantasy") {
      for (index = 0; index < list.length; ++index) {
        list[index].style.backgroundImage = `url(${book2})`;
      }
    } else if (x.textContent === "Thriller") {
      for (index = 0; index < list.length; ++index) {
        list[index].style.backgroundImage = `url(${book3})`;
      }
    } else {
      for (index = 0; index < list.length; ++index) {
        list[index].style.backgroundImage = `url(${book4})`;
      }
    }
  };

  render() {
    return (
      <div className="body">
        <div className="dropdown show ml-3 mb-3">
          <a
            className="btn btn-dark dropdown-toggle w-25"
            href=""
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="mainText">{this.state.menuTitle}</div>
          </a>

          <div
            onClick={this.ChangeCategory}
            className="dropdown-menu"
            aria-labelledby="dropdownMenuLink"
          >
            <li>
              <a className="dropdown-item" href="#">
                {this.state.drama}
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                {this.state.fantasy}
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                {this.state.thriller}
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                {this.state.inne}
              </a>
            </li>
          </div>
        </div>
        <div className="category-title">
          <h2 className="display-4 mb-4 mainText">
            <strong>{this.state.title}</strong>
          </h2>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-10">
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book1})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book2})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book3})` }}
            ></div>
            <div
              className="book-item"
              style={{ backgroundImage: `url(${book4})` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}
