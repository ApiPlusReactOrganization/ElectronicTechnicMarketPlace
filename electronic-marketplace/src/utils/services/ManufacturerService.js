import HttpClient from "../http/HttpClient";

export class ManufacturerService {
  static httpClient = new HttpClient({ baseURL: "http://localhost:5132/manufacturers" });

  static async createManufacturer(name) {
    return await this.httpClient.post(
      "",
      { name: name },
      { withCredentials: true }
    );
  }

  static async getManufacturers() {
    return await this.httpClient.get("", { withCredentials: true });
  }
}
