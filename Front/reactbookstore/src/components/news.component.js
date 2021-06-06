import React, { Component } from "react";

import UserService from "../services/user.service";
import { Col, Container, Row, Figure } from "react-bootstrap";

import Book1 from "../assets/book1.jpg";
import Book2 from "../assets/book2.jpg";
import Book3 from "../assets/book3.jpg";
import Book4 from "../assets/book4.jpg";

export default class News extends Component {
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
      <div className="container bg-dark">
        <Container className="mt-4">
          <h2 className="text-light text-center m-5">Nowości Polska</h2>
          <Row className="text-center text-light">
            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book1} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book2} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book3} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book4} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>
          </Row>

          <h2 className="text-light text-center m-5">Nowości e-book</h2>

          <Row className="text-center text-light">
            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book1} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book2} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book3} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book4} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>
          </Row>

          <h2 className="text-light text-center m-5">Nowości zagraniczne</h2>

          <Row className="text-center text-light">
            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book1} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book2} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book3} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <Figure>
                <Figure.Image alt="171x180" src={Book4} />
                <Figure.Caption className="text-center text-light">
                  <div>Krótki opis książki</div>
                </Figure.Caption>
              </Figure>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
