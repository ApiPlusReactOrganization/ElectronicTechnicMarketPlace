import { CategoryService } from "../../../utils/services/CategoryService";
import { addCategory, getAll } from "../reduserSlises/categorySlice";

const categoryService = new CategoryService();


export const getCategories = () => async (dispatch) => {
    try {
        // debugger
      const res = await categoryService.getCategories();
      console.log("res", res);
      dispatch(getAll(res));
    } catch (error) {
      console.error("get Categories failed", error);
    }
  };

  export const createCategory = (name) => async (dispatch) => {
    try {
      const res = await categoryService.createCategory(name);
      console.log("res", res);
      dispatch(addCategory(res));
    } catch (error) {
      console.error("get Categories failed", error);
    }
  };