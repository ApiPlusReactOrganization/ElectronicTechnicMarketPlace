import HttpClient from "../http/HttpClient";

export class UserService {
  static httpClient = new HttpClient({ baseURL: "http://localhost:5132/Account" });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async signIn() {
    return await this.httpClient.post(
      "signin",
      {
        email: "admin@example.com",
        password: "123456",
      },
      { withCredentials: true }
    );
  }

  static async getUsers() {
    return await this.httpClient.get("User", { withCredentials: true });
  }
}
