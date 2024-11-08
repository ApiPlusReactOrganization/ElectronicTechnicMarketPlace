import HttpClient from "../http/HttpClient";

export class UserService {
  static httpClient = new HttpClient({
    baseURL: "http://localhost:5132/Account",
  });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async signIn(model) {
    const admin = {
      email: "admin@example.com",
      password: "123456",
    };

    return await this.httpClient.post("signin", model);
  }

  static async signUp(model) {
    return await this.httpClient.post("signup", model);
  }

  static async getUsers() {
    return await this.httpClient.get("User", { withCredentials: true });
  }
}
