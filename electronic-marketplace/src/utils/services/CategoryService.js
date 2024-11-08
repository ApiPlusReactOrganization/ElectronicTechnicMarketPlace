import HttpClient from "../http/HttpClient";

export class CategoryService {
  static httpClient = new HttpClient({
    baseURL: "http://localhost:5132/categories",
  });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async createCategory(name) {
    return await this.httpClient.post(
      "",
      { name: name },
      { withCredentials: true }
    );
  }

  static async getCategories() {
    return await this.httpClient.get("", { withCredentials: true });
  }
}
