import HttpClient from "../http/HttpClient";

export class ProductsService {
  static httpClient = new HttpClient({
    baseURL: "http://localhost:5132/products",
  });

  static setAuthorizationToken(token) {
    this.httpClient.setAuthorizationToken(token);
  }

  static async createProduct(model) {
    return await this.httpClient.post("create", model);
  }

  static async getProducts() {
    return await this.httpClient.get("get-all");
  }

  static async deleteProduct(id) {
    return await this.httpClient.delete(`delete/${id}`);
  }

  static async updateProduct(model) {
    return await this.httpClient.put("update", model);
  }

  static async getProductById(productId) {
    return await this.httpClient.get(`get-by-id/${productId}`);
  }
  static async getProductsByCategoryId(categoryId) {
    return await this.httpClient.get(`under-category/${categoryId}`);
  }

  static async deleteProductImageById(productId, productImageId) {
    return await this.httpClient.put(
      `delete-image/${productId}?productImageId=${productImageId}`
    );
  }

  static async uploadProductImages(productId, imagesFiles) {
    return await this.httpClient.put(`upload-images/${productId}`, imagesFiles, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
