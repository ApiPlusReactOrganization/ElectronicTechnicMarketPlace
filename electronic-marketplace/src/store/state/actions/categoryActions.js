import { CategoryService } from "../../../utils/services/CategoryService";
import { addCategory, getAll } from "../reduserSlises/categorySlice";

// const categoryService = new CategoryService();

export const getCategories = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    CategoryService.setAuthorizationToken(token);

    const res = await CategoryService.getCategories();
    dispatch(getAll(res));
  } catch (error) {
    console.error("get Categories failed", error);
  }
};

export const createCategory = (name) => async (dispatch) => {
  try {
    const res = await CategoryService.createCategory(name);
    dispatch(addCategory(res));
  } catch (error) {
    console.error("get Categories failed", error);
  }
};
