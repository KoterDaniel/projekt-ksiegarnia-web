import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

<<<<<<< HEAD
import { Card, Form, Accordion, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory, faUser } from "@fortawesome/free-solid-svg-icons";

import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";
import book3 from "../assets/book3.jpg";
import book4 from "../assets/book4.jpg";
=======
import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";
>>>>>>> 204026f857bcaf466f0b8ad5c7306caa337d9e9f

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      daneUzytkownika: "Dane użytkownika",
      historiaZakupow: "Historia zakupów",
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
<<<<<<< HEAD
        <header className="jumbotron bg-light">
          <h3>
            <strong>{currentUser.username}</strong> Profil
          </h3>
        </header>

        <div>
          <Accordion>
            <Card className={"border border-dark bg-dark text-white"}>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                <FontAwesomeIcon className="mr-1" icon={faUser} />
                {this.state.daneUzytkownika}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <Form onSubmit={this.submitBook} id="bookFormId">
                  <Card.Body>
                    <Row>
                      <Col>
                        <p class="font-weight-normal h5">Nazwa Użytkownika:</p>
                      </Col>
                      <Col>
                        <p class="font-weight-normal h5">
                          {currentUser.username}
                        </p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <p class="font-weight-normal h5">E-mail:</p>
                      </Col>
                      <Col>
                        <p class="font-weight-normal h5">{currentUser.email}</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <p class="font-weight-normal h5">E-mail:</p>
                      </Col>
                      <Col>
                        <p class="font-weight-normal h5">{currentUser.email}</p>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <p class="font-weight-normal h5">E-mail:</p>
                      </Col>
                      <Col>
                        <p class="font-weight-normal h5">{currentUser.email}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Form>
              </Accordion.Collapse>

              <Accordion.Toggle as={Card.Header} eventKey="1">
                <FontAwesomeIcon className="mr-1" icon={faHistory} />
                {this.state.historiaZakupow}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="1">
                <Card.Body>
                  <Row>
                    <Col>
                      <div
                        className="book-item mb-5"
                        style={{ backgroundImage: `url(${book1})` }}
                      ></div>
                    </Col>
                    <Col className="mt-3">
                      <p class="font-weight-normal h5">Tytuł: </p>
                      <p class="font-weight-normal h5">data zakupu: </p>
                      <p class="font-weight-normal h5">cena zakupu: </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div
                        className="book-item mb-5"
                        style={{ backgroundImage: `url(${book2})` }}
                      ></div>
                    </Col>
                    <Col className="mt-3">
                      <p class="font-weight-normal h5">Tytuł: </p>
                      <p class="font-weight-normal h5">data zakupu: </p>
                      <p class="font-weight-normal h5">cena zakupu: </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div
                        className="book-item mb-5"
                        style={{ backgroundImage: `url(${book3})` }}
                      ></div>
                    </Col>
                    <Col className="mt-3">
                      <p class="font-weight-normal h5">Tytuł: </p>
                      <p class="font-weight-normal h5">data zakupu: </p>
                      <p class="font-weight-normal h5">cena zakupu: </p>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <div
                        className="book-item mb-5"
                        style={{ backgroundImage: `url(${book4})` }}
                      ></div>
                    </Col>
                    <Col className="mt-3">
                      <p class="font-weight-normal h5">Tytuł: </p>
                      <p class="font-weight-normal h5">data zakupu: </p>
                      <p class="font-weight-normal h5">cena zakupu: </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
=======
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
            <p class="font-weight-normal h5">Nick: {currentUser.email}</p>
            <p class="font-weight-normal h5">Email: </p>
          </div>
>>>>>>> 204026f857bcaf466f0b8ad5c7306caa337d9e9f
        </div>
      </div>
    );
  }
}
