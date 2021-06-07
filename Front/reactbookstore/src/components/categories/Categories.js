import React, { Component } from "react";

import UserService from "../../services/user.service";
import { Card, Button, Container } from "react-bootstrap";

import axios from "axios";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      books: [],
      currentPage: 1,
      booksPerPage: 12,
      sortDir: "asc",
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
    this.findAllBooks(this.state.currentPage);
  }

  findAllBooks(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8080/books?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.booksPerPage +
          "&sortBy=title&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  render() {
    const { books } = this.state;
    return (
      <Container fluid className="row">
        {books.map((book) => (
          <Card
            className="d-inline-block "
            key={book.id}
            style={{ width: "20rem" }}
          >
            <Card.Img
              variant="top"
              style={{ width: "250px", height: "350px" }}
              src={book.covers}
            />
            <Card.Body
              variant="right"
              style={{ width: "250px", height: "260px" }}
            >
              <Card.Title
                className="row "
                style={{ width: "250px", height: "100px" }}
              >
                {book.title}
              </Card.Title>
              <Card.Text
                className="row"
                style={{ width: "250px", height: "50px" }}
              >
                {book.authors}
              </Card.Text>
              <Card.Text
                className="row text-center text-danger jusitfy-content-center"
                style={{ width: "250px", height: "50px" }}
              >
                <div className="col text-center">Price: {book.price}</div>
              </Card.Text>
            </Card.Body>
            <Button className="col-5" variant="info">
              More..
            </Button>
            <Button className="col-5 float-right" variant="warning">
              Add to Cart
            </Button>
          </Card>
        ))}
      </Container>
    );
  }
}
