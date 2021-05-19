import axios from "axios";

const API_URL = "http://localhost:8080/api/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentBook(
    id,
    title,
    authors,
    title_slug,
    isbn13,
    isbn10,
    pirce,
    publisher,
    pubdate,
    subject,
    overview,
    synopsis,
    covers,
    quantity,
    availability
  ) {
    return (
      axios.post(API_URL + "book"),
      {
        id,
        title,
        authors,
        title_slug,
        isbn13,
        isbn10,
        pirce,
        publisher,
        pubdate,
        subject,
        overview,
        synopsis,
        covers,
        quantity,
        availability,
      }
    );
  }
}

export default new AuthService();
