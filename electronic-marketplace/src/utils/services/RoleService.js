import HttpClient from "../http/HttpClient";

export class RoleService {
  static httpClient = new HttpClient({
    baseURL: "http://localhost:5132/Roles",
  });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async getRoles() {
    this.setAuthorizationToken(localStorage.getItem("token"));
    return await this.httpClient.get("");
  }
}
