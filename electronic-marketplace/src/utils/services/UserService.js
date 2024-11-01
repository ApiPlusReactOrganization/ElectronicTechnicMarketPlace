import HttpClient from "../http/HttpClient";

export class UserService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: "http://localhost:5132/Account",
      signal,
    });
  }

  setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  async signIn() {
    return await this.httpClient.post(
      "signin",
      {
        email: "admin@example.com",
        password: "123456",
      },
      {
        withCredentials: true,
      }
    );
  }

  async getUsers() {
    return await this.httpClient.get("User", {
      withCredentials: true,
    });
  }
}
