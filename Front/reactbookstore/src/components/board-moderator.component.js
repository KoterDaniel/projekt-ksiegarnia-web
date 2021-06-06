import React, { Component } from "react";
// import { deleteBook } from "../services/book/book-action";
// import { connect } from "react-redux";
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
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import MyToast from "../MyToast";
import axios from "axios";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    this.state = {
      books: [],
      currentPage: 1,
      booksPerPage: 10,
      sortDir: "asc",
      content: "",
      search: "",
    };
    this.bookChange = this.bookChange.bind(this);
    this.submitBook = this.submitBook.bind(this);
  }

  initialState = {
    title: "",
    authors: "",
    title_slug: "",
    isbn13: "",
    isbn10: "",
    price: "",
    publisher: "",
    pubdate: "",
    subject: "",
    overview: "",
    synopsis: "",
    covers: "",
    quantity: "",
    availability: "",
  };

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
    axios.delete("http://localhost:8080/books/" + bookId).then((response) => {
      if (response.data != null) {
        alert("Udało się usunąć książkę.");
        // this.setState({
        //   books: this.state.books.filter((book) => book.id !== bookId),
        // });
      }
    });
  };

  // deleteBook = (bookId) => {
  //   this.props.deleteBook(bookId);
  //   setTimeout(() => {
  //     if (this.props.bookObject != null) {
  //       this.setState({ show: true });
  //       setTimeout(() => this.setState({ show: false }), 3000);
  //       this.findAllBooks(this.state.currentPage);
  //     } else {
  //       this.setState({ show: false });
  //     }
  //   }, 1000);
  // };

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

  submitBook = (event) => {
    const book = {
      title: this.state.title,
      authors: this.state.authors,
      title_slug: this.state.title_slug,
      isbn13: this.state.isbn13,
      isbn10: this.state.isbn10,
      price: this.state.price,
      publisher: this.state.publisher,
      pubdate: this.state.pubdate,
      subject: this.state.subject,
      overview: this.state.overview,
      synopsis: this.state.synopsis,
      covers: this.state.covers,
      quantity: this.state.quantity,
      availability: this.state.availability,
    };
    event.preventDefault();

    axios.post("http://localhost:8080/books", book).then((response) => {
      if (response.data != null) {
        this.setState(this.initialState);
        alert("Udało się pomyślnie zapisać książkę.");
      }
    });
  };

  resetBook = () => {
    this.setState(() => this.initialState);
  };

  // sortData = () => {
  //   setTimeout(() => {
  //     this.state.sortDir === "asc"
  //       ? this.setState({ sortDir: "desc" })
  //       : this.setState({ sortDir: "asc" });
  //     this.findAllBooks(this.state.currentPage);
  //   }, 500);
  // };

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      books,
      currentPage,
      totalPages,
      search,
      title,
      authors,
      title_slug,
      isbn13,
      isbn10,
      price,
      publisher,
      pubdate,
      subject,
      overview,
      synopsis,
      covers,
      quantity,
      availability,
    } = this.state;

    return (
      <div>
        <Accordion>
          <Card className={"border border-dark bg-dark text-white"}>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <FontAwesomeIcon className="mr-1" icon={faPlusSquare} />
              Dodaj książkę
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Form
                onReset={this.resetBook}
                onSubmit={this.submitBook}
                id="bookFormId"
              >
                <Card.Body>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridTitle">
                      <Form.Label>Tytuł</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={title}
                        onChange={this.bookChange}
                        name="title"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź tytuł ksiązki"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAuthors">
                      <Form.Label>Autor</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={authors}
                        onChange={this.bookChange}
                        name="authors"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź autora książki"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridTitle_slug">
                      <Form.Label>Title slug</Form.Label>
                      <Form.Control
                        autoComplete="off"
                        type="text"
                        value={title_slug}
                        onChange={this.bookChange}
                        name="title_slug"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź title slug ksiązki"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridISBN13">
                      <Form.Label>Numer ISBN13</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={isbn13}
                        onChange={this.bookChange}
                        name="isbn13"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź numer ISBN13 książki"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridISBN10">
                      <Form.Label>Numer ISBN10</Form.Label>
                      <Form.Control
                        autoComplete="off"
                        type="text"
                        value={isbn10}
                        onChange={this.bookChange}
                        name="isbn10"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź numer ISBN10 książki"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPrice">
                      <Form.Label>Cena</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={price}
                        onChange={this.bookChange}
                        name="price"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź cenę książki"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridPublisher">
                      <Form.Label>Wydawca</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={publisher}
                        onChange={this.bookChange}
                        name="publisher"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź wydawcę książki"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPubDate">
                      <Form.Label>Data wydania</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={pubdate}
                        onChange={this.bookChange}
                        name="pubdate"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź miesiąć i rok wydania książki"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridSubject">
                      <Form.Label>Temat</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={subject}
                        onChange={this.bookChange}
                        name="subject"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź temat książki"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridOverview">
                      <Form.Label>Opis</Form.Label>
                      <Form.Control
                        autoComplete="off"
                        type="text"
                        value={overview}
                        onChange={this.bookChange}
                        name="overview"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź opis książki"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridSynopsis">
                      <Form.Label>Streszczenie</Form.Label>
                      <Form.Control
                        autoComplete="off"
                        type="text"
                        value={synopsis}
                        onChange={this.bookChange}
                        name="synopsis"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź streszczenie książki"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCovers">
                      <Form.Label>Adres URL okładki</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={covers}
                        onChange={this.bookChange}
                        name="covers"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź URL okładki książki"
                      />
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridQuantity">
                      <Form.Label>Ilość</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={quantity}
                        onChange={this.bookChange}
                        name="quantity"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź ilość dostępnych książek"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridAvailability">
                      <Form.Label>Dostępność</Form.Label>
                      <Form.Control
                        required
                        autoComplete="off"
                        type="text"
                        value={availability}
                        onChange={this.bookChange}
                        name="availability"
                        className={"bg-dark text-white"}
                        placeholder="Wprowadź dostępność książki (1 lub 0)"
                      />
                    </Form.Group>
                  </Form.Row>
                </Card.Body>

                <Card.Footer style={{ textAlign: "right" }}>
                  <Button size="sm" variant="success" type="submit">
                    <FontAwesomeIcon className="mr-1" icon={faSave} />
                    Zapisz
                  </Button>{" "}
                  <Button size="sm" variant="info" type="reset">
                    <FontAwesomeIcon className="mr-1" icon={faUndo} />
                    Reset
                  </Button>
                </Card.Footer>
              </Form>
            </Accordion.Collapse>

            <Accordion.Toggle as={Card.Header} eventKey="1">
              <div style={{ float: "left" }}>
                <FontAwesomeIcon icon={faList} /> Lista książek
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
                      <th>Autor</th>
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
                        <td colSpan="7">Brak książek.</td>
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
                                onClick={this.deleteBook.bind(this, book.id)}
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

// const mapStateToProps = (state) => {
//   return {
//     bookObject: state.book,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteBook: (bookId) => dispatch(deleteBook(bookId)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BoardModerator);
