import React, { Component } from "react";
import { Link } from "react-router-dom";

// styling
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

// auth
import AuthService from "../services/auth.service";

// components & assets
import Logo from "../assets/logo.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div className="body">
        <nav className="navbar navbar-expand navbar-dark bg-dark mb-5">
          <Link to="/" className="navbar-brand">
            <img href="/" src={Logo} className="toolbar_logo" alt="logo" />
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Strona główna
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                Kategorie
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/news"} className="nav-link">
                Nowości
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/aboutUs"} className="nav-link">
                O nas
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">
                Kontakt
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item=">
                <Link to={"/mod"} className="nav-link">
                  Moderator
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Użytkownik
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Wyloguj
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Zaloguj
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Stwórz konto
                </Link>
              </li>
            </div>
          )}
        </nav>
      </div>
    );
  }
}

export default Navbar;
