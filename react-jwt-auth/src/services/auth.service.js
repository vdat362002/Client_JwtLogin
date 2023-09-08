import axios from "axios";

const API_URL = "https://node-js-jwt-auth-mongodb-gules.vercel.app/";

class AuthService {
  login(username, password) {
    return axios({
      url: API_URL + 'signin',
      data: {
        username: username,
        password: password
      },
      method:'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
      .then(response => {
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
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
