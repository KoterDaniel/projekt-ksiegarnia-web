import React, { Component } from "react";
import { deleteBook } from "../services/book/book-action";
import { connect } from "react-redux";
import UserService from "../services/user.service";
import {
  Accordion,
  Card,
  Form,
  Table,
  Col,
  Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faList,
  faEdit,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import MyToast from "../MyToast";
import axios from "axios";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      currentPage: 1,
      booksPerPage: 10,
      sortDir: "asc",
      content: "",
      search: "",
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
    UserService.getModeratorBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
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
          "&sortBy=id&sortDir=" +
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

  deleteBook = (bookId) => {
    this.props.deleteBook(bookId);
    setTimeout(() => {
      if (this.props.bookObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllBooks(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (targetPage <= this.state.totalPages) {
      if (this.state.search) {
        this.searchData(targetPage);
      } else {
        this.findAllBooks(targetPage);
      }
      this.setState({
        [event.target.name]: targetPage,
      });
    }
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllBooks(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllBooks(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.booksPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllBooks(condition);
      }
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.booksPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllBooks(this.state.currentPage + 1);
      }
    }
  };

  // searchChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });
  // };

  // cancelSearch = () => {
  //   this.setState({ search: "" });
  //   this.findAllBooks(this.state.currentPage);
  // };

  // searchData = (currentPage) => {
  //   currentPage -= 1;
  //   axios
  //     .get(
  //       "http://localhost:8081/books/search/" +
  //         this.state.search +
  //         "?page=" +
  //         currentPage +
  //         "&size=" +
  //         this.state.booksPerPage
  //     )
  //     .then((response) => response.data)
  //     .then((data) => {
  //       this.setState({
  //         books: data.content,
  //         totalPages: data.totalPages,
  //         totalElements: data.totalElements,
  //         currentPage: data.number + 1,
  //       });
  //     });
  // };

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

  // sortData = () => {
  //   setTimeout(() => {
  //     this.state.sortDir === "asc"
  //       ? this.setState({ sortDir: "desc" })
  //       : this.setState({ sortDir: "asc" });
  //     this.findAllBooks(this.state.currentPage);
  //   }, 500);
  // };

  bookChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { books, currentPage, totalPages, search } = this.state;

    return (
      <div>
        <Accordion>
          <Card className={"border border-dark bg-dark text-white"}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <FontAwesomeIcon className="mr-1" icon={faPlusSquare} />
              Dodaj książkę
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
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
            </Accordion.Collapse>

            <Accordion.Toggle as={Card.Header} eventKey="1">
              <div style={{ float: "left" }}>
                <FontAwesomeIcon icon={faList} /> Book List
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div className="mb-4" style={{ float: "right" }}>
                  <InputGroup size="sm">
                    <FormControl
                      disabled
                      placeholder="Wyszukaj"
                      name="search"
                      value={search}
                      className={"info-border bg-dark text-white"}
                      onChange={this.searchChange}
                    />
                    <InputGroup.Append>
                      <Button
                        size="sm"
                        variant="outline-info"
                        type="button"
                        onClick={this.searchData}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        type="button"
                        onClick={this.cancelSearch}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
                <Table bordered hover striped variant="dark">
                  <thead>
                    <tr>
                      <th>Tytuł</th>
                      <th>Autors</th>
                      <th>Numer ISBN</th>
                      <th onClick={this.sortData}>
                        Cena{" "}
                        <div
                          className={
                            this.state.sortDir === "asc"
                              ? "arrow arrow-up"
                              : "arrow arrow-down"
                          }
                        >
                          {" "}
                        </div>
                      </th>
                      <th>Ilość</th>
                      <th>Gatunek</th>
                      <th>Operacje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {books.length === 0 ? (
                      <tr align="center">
                        <td colSpan="7">No Books Available.</td>
                      </tr>
                    ) : (
                      books.map((book) => (
                        <tr key={book.id}>
                          <td>
                            <Image
                              src={book.covers}
                              roundedCircle
                              width="25"
                              height="25"
                            />{" "}
                            {book.title}
                          </td>
                          <td>{book.authors}</td>
                          <td>{book.isbn13}</td>
                          <td>{book.price}</td>
                          <td>{book.quantity}</td>
                          <td>{book.subjects}</td>
                          <td>
                            <ButtonGroup>
                              <Link
                                to={"edit/" + book.id}
                                className="btn btn-sm btn-outline-primary"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>{" "}
                              <Button
                                size="sm"
                                variant="outline-danger"
                                // onClick={this.deleteBook.bind(this, book.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Accordion.Collapse>
            {books.length > 0 ? (
              <Card.Footer>
                <div style={{ float: "left" }}>
                  Showing Page {currentPage} of {totalPages}
                </div>
                <div style={{ float: "right" }}>
                  <InputGroup size="sm">
                    <InputGroup.Prepend>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={this.firstPage}
                      >
                        <FontAwesomeIcon icon={faFastBackward} /> First
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={this.prevPage}
                      >
                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                      </Button>
                    </InputGroup.Prepend>
                    <FormControl
                      className={"page-num bg-dark text-center"}
                      name="currentPage"
                      value={currentPage}
                      onChange={this.changePage}
                    />
                    <InputGroup.Append>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={this.nextPage}
                      >
                        <FontAwesomeIcon icon={faStepForward} /> Next
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={this.lastPage}
                      >
                        <FontAwesomeIcon icon={faFastForward} /> Last
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Card.Footer>
            ) : null}
          </Card>
        </Accordion>
      </div>
    );
  }
}
