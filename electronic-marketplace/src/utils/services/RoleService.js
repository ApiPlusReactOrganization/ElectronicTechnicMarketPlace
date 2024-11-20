import HttpClient from "../http/HttpClient";

export class RoleService {
  static httpClient = new HttpClient({
    baseURL: "http://localhost:5132/roles",
  });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async getRoles() {
    this.setAuthorizationToken(localStorage.getItem("token"));
    return await this.httpClient.get("get-all");
  }
}
