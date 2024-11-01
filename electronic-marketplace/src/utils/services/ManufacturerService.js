import HttpClient from "../http/HttpClient";

export class ManufacturerService {
  constructor(signal) {
    this.httpClient = new HttpClient({
      baseURL: "http://localhost:5132/manufacturers",
      signal,
    });
  }

  async createManufacturer(name) {
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

  async getManufacturers() {
    return await this.httpClient.get("", {
      withCredentials: true,
    });
  }
}
