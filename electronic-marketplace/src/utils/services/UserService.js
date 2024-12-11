import HttpClient from '../http/HttpClient'

export class UserService {
  static httpClient = new HttpClient({
    baseURL: "http://localhost:5132/users",
  });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async getUsers() {
    this.setAuthorizationToken(localStorage.getItem("accessToken"));
    return await this.httpClient.get("get-all");
  }

  static async delete(userId) {
    return await this.httpClient.delete(`delete/${userId}`);
  }

  static async changeRoles(userId, roles) {
    return await this.httpClient.put(`update-roles/${userId}`, roles);
  }

  static async uploadImage(userId, file) {
    return await this.httpClient.put(`image/${userId}`, file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async updateUser(userId, model) {
    return await this.httpClient.put(`update/${userId}`, model);
  }

  static async getFavoriteProducts(userId) {
    return await this.httpClient.get(`get-all-favorite-products/${userId}`);
  }

  static async addFavoriteProduct(userId, productId) {
    return await this.httpClient.put(`favorite-product-add/${userId}/${productId}`);
  }

  static async removeFavoriteProduct(userId, productId) {
    return await this.httpClient.put(`favorite-product-remove/${userId}/${productId}`);
  }

  static async getFilteredFavoriteProducts(userId, filters) {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (value !== null && value !== undefined) {
        queryParams.append(key, value);
      }
    });

    return await this.httpClient.get(
      `favorite-products-filter/${userId}?${queryParams.toString()}`
    );
  }
}
