import HttpClient from "../http/HttpClient";

export class UserService {
  static httpClient = new HttpClient({
    baseURL: "http://localhost:5132/Users",
  });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async getUsers() {
    this.setAuthorizationToken(localStorage.getItem("token"));
    return await this.httpClient.get("");
  }

  static async delete(userId) {
    return await this.httpClient.delete(`${userId}`);
  }

  static async changeRoles(userId, roles) {
    return await this.httpClient.put(`UpdateRoles/${userId}`, roles);
  }

  static async uploadImage(userId, file) {
    return await this.httpClient.put(`Image/${userId}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async updateUser(userId, model) {
    return await this.httpClient.put(`${userId}`, model);
  }
}
