import HttpClient from "../http/HttpClient";

export class CategoryService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: "http://localhost:5132/categories",
      signal,
    });
  }
  async createCategory(name) {
    return await this.httpClient.post(
      "",
      {
        name: name,
      },
      {
        withCredentials: true,
      }
    );
  }

  async getCategories() {
    return await this.httpClient.get("", {
      withCredentials: true,
    });
  }
}
