import { ProductsService } from "../../../utils/services/ProductServise";
import {
  getAll,
  deleteProductReduser,
  addProduct,
  updateProductReducer,
  getProductsByCategory,
  getProduct,
} from "../reduserSlises/productSlice";

export const getProducts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    await ProductsService.setAuthorizationToken(token);

    const res = await ProductsService.getProducts();

    dispatch(getAll(res));
  } catch (error) {
    console.error("get Products failed", error);
  }
};

export const createProduct = (name) => async (dispatch) => {
  try {
    const res = await ProductsService.createProduct(name);

    dispatch(addProduct(res));
    return { success: true, message: "User roles updated successfully" };
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors.Name[0] ||
      "An error occurred during role change";
    return { success: false, message: errorMessage };
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await ProductsService.deleteProduct(id);

    dispatch(deleteProductReduser(response));

    return { success: true, message: response };
  } catch (error) {
    console.log(error.response.data);
    return { success: false, message: error.response.data };
  }
};

export const updateProduct = (model) => async (dispatch) => {
  try {
    const response = await ProductsService.updateProduct(model);

    dispatch(updateProductReducer(response));

    return { success: true, message: "User roles updated successfully" };
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors.Name[0] ||
      "An error occurred during role change";
    return { success: false, message: errorMessage };
  }
};

export const getProductById = (productId) => async (dispatch) => {
  try {
    const response = await ProductsService.getProductById(productId);

    dispatch(getProduct(response));

    return { success: true, payload: response };
  } catch (error) {
    const errorMessage = error.response;
    return { success: false, message: errorMessage };
  }
};
export const getProductsByCategoryId = (categoryId) => async (dispatch) => {
  try {
    const response = await ProductsService.getProductsByCategoryId(categoryId);

    dispatch(getProductsByCategory(response));

    return { success: true, payload: response };
  } catch (error) {
    const errorMessage = error.response;
    return { success: false, message: errorMessage };
  }
};

export const deleteProductImageById =
  (productId, productImageId) => async (dispatch) => {
    try {
      const response = await ProductsService.deleteProductImageById(
        productId,
        productImageId
      );

      dispatch(getProduct(response));

      return { success: true, payload: response };
    } catch (error) {
      const errorMessage = error.response;
      return { success: false, message: errorMessage };
    }
  };

export const addProductImages =
  (productId, imagesFiles) => async (dispatch) => {
    try {
      const response = await ProductsService.uploadProductImages(
        productId,
        imagesFiles
      );

      dispatch(getProduct(response));

      return { success: true, payload: response };
    } catch (error) {
      const errorMessage = error.response;
      return { success: false, message: errorMessage };
    }
  };
