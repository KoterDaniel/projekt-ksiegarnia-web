import React, { Component } from "react";

import UserService from "../../services/user.service";
import { Card, Button } from "react-bootstrap";

import axios from "axios";

export default class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      books: [],
      currentPage: 1,
      booksPerPage: 10,
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
    return books.map((book) => (
      <Card key={book.id} style={{ width: "20rem" }}>
        <Card.Img variant="bottom" src={book.covers} />
        <Card.Body variant="right">
          <Card.Title>{book.title}</Card.Title>
          <Card.Text>{book.authors}</Card.Text>
          <Card.Text className="text-center text-danger">
            Price: {book.price}
          </Card.Text>
          <Button variant="info float-left">More..</Button>
          <Button variant="warning float-right">Add to Cart</Button>
        </Card.Body>
      </Card>
    ));
  }
}
