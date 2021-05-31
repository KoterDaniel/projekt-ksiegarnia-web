import React, { Component } from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import UserService from "../../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export default class Book extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      title: "",
      author: "",
      coverPhotoURL: "",
      isbnNumber: "",
      price: "",
      quantity: "",
    };
    this.bookChange = this.bookChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
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

  submitBook(event) {
    alert(
      "Tytuł: " +
        this.state.title +
        " Autor: " +
        this.state.author +
        " Cover Photo URL: " +
        this.state.coverPhotoURL +
        " Numer ISBN: " +
        this.state.isbnNumber +
        " Cena: " +
        this.state.price +
        " Ilość: " +
        this.state.quantity
    );
    event.preventDefault();
  }

  bookChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <FontAwesomeIcon className="mr-1" icon={faPlusSquare} />
          Dodaj książkę
        </Card.Header>

        <Form onSubmit={this.submitBook} id="bookFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.title}
                  onChange={this.bookChange}
                  name="title"
                  className={"bg-dark text-white"}
                  placeholder="Wprowadź tytuł ksiązki"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAuthor">
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.author}
                  onChange={this.bookChange}
                  name="author"
                  className={"bg-dark text-white"}
                  placeholder="Wprowadź autora książki"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                <Form.Label>Cover Photo URL</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.coverPhotoURL}
                  onChange={this.bookChange}
                  name="coverPhotoURL"
                  className={"bg-dark text-white"}
                  placeholder="Wprowadź Cover Photo URL ksiązki"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridISBNNumber">
                <Form.Label>Numer ISBN</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.isbnNumber}
                  onChange={this.bookChange}
                  name="isbnNumber"
                  className={"bg-dark text-white"}
                  placeholder="Wprowadź numer ISBN książki"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Cena</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.price}
                  onChange={this.bookChange}
                  name="price"
                  className={"bg-dark text-white"}
                  placeholder="Wprowadź cenę książki"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridQuantity">
                <Form.Label>Ilość</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={this.state.quantity}
                  onChange={this.bookChange}
                  name="quantity"
                  className={"bg-dark text-white"}
                  placeholder="Wprowadź ilość książek"
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>

          <Card.Footer style={{ textAlign: "right" }}>
            <Button size="sm" variant="success" type="submit">
              <FontAwesomeIcon className="mr-1" icon={faSave} />
              Zapisz
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    );
  }
}
