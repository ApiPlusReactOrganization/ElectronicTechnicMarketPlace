import { CategoryService } from "../../../utils/services/CategoryService";
import {
  addCategory,
  getAll,
  deleteCategory,
  updateCategory,
} from "../reduserSlises/categorySlice";

export const getCategories = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("accessToken");
    CategoryService.setAuthorizationToken(token);

    const res = await CategoryService.getCategories();

    dispatch(getAll(res));
  } catch (error) {
    console.error("Get Categories failed", error);
  }
};

export const createCategory = (name) => async (dispatch) => {
  try {
    const res = await CategoryService.createCategory(name);
    dispatch(addCategory(res));
  } catch (error) {
    console.error("Create Category failed", error);
  }
};

export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    const response = await CategoryService.deleteCategory(id);

    dispatch(deleteCategory(response));

    return { success: true, message: response.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.message || "Unknown error",
    };
  }
};

export const updateCategoryAction = (model) => async (dispatch) => {
  try {
    console.log(model);
    const response = await CategoryService.updateCategory(model);

    dispatch(updateCategory(response));

    return { success: true, message: response.message };
  } catch (error) {
    return {
      success: false,
      message: error.response?.message || "Unknown error",
    };
  }
};
