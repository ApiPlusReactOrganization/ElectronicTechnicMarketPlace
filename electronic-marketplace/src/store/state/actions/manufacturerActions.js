import { ManufacturerService } from "../../../utils/services/ManufacturerService";
import {
  addManufacturer,
  getAll,
  deleteManufacturerReduser,
  updateManufacturerReducer,
} from "../reduserSlises/manufacturerSlice";


export const getManufacturers = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    ManufacturerService.setAuthorizationToken(token);

    const res = await ManufacturerService.getManufacturers();

    dispatch(getAll(res));
  } catch (error) {
    console.error("get Manufacturers failed", error);
  }
};

export const createManufacturer = (name) => async (dispatch) => {
  try {
    const res = await ManufacturerService.createManufacturer(name);

    dispatch(addManufacturer(res));
  } catch (error) {
    console.error("get Manufacturers failed", error);
  }
};

export const deleteManufacturer = (id) => async (dispatch) => {
  try {
    const response = await ManufacturerService.deleteManufacturer(id);

    dispatch(deleteManufacturerReduser(response));

    return { success: true, message: response };
  } catch (error) {
    console.log(error.response.data)
    return { success: false, message: error.response.data };
  }
};

export const updateManufacturer = (model) => async (dispatch) => {
  try {
    const response = await ManufacturerService.updateManufacturer(model);

    dispatch(updateManufacturerReducer(response));

    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error.response.message };
  }
};
