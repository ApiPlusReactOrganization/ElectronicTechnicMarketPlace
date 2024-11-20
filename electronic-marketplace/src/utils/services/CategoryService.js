import HttpClient from "../http/HttpClient";

export class CategoryService {
  static httpClient = new HttpClient({
    baseURL: "http://localhost:5132/categories",
  });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async createCategory(name) {
    return await this.httpClient.post("create", { name: name });
  }

  static async getCategories() {
    return await this.httpClient.get("get-all");
  }

  static async deleteCategory(id) {
    return await this.httpClient.delete(`delete/${id}`);
  }

  static async updateCategory(model) {
    return await this.httpClient.put("update", model);
  }
}
