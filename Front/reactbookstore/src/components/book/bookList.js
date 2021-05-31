import React, { Component } from "react";
import { ButtonGroup, Card, Table, Button } from "react-bootstrap";
import UserService from "../../services/user.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faList, faTrash } from "@fortawesome/free-solid-svg-icons";

export default class BookList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      books: [],
    };
  }

  // componentDidMount() {
  //   UserService.getBooks().then((response) => console.log(response.data));
  // }

  // componentDidMount() {
  //   UserService.getBooks().then((response) => console.log(response.data));
  // }

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
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <FontAwesomeIcon className="mr-1" icon={faList} />
          Lista książek
        </Card.Header>
        <Card.Body>
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>Tytuł</th>
                <th>Autor</th>
                <th>Numer ISBN</th>
                <th>Cena</th>
                {/* <th onClick={this.sortData}>
                  Price{" "}
                  <div
                    className={
                      this.state.sortDir === "asc"
                        ? "arrow arrow-up"
                        : "arrow arrow-down"
                    }
                  >
                    {" "}
                  </div>
                </th> */}
                <th>Ilość</th>
                <th>Gatunek</th>
                <th>Operacje</th>
              </tr>
            </thead>
            <tbody>
              <tr align="center">
                <td colSpan="6">Brak dostępnych książek</td>
                <td>
                  <ButtonGroup>
                    <Button size="sm" variant="outline-primary">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button size="sm" variant="outline-danger">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  }
}
