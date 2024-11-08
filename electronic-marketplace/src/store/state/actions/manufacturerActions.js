import { ManufacturerService } from "../../../utils/services/ManufacturerService";
import {
  addManufacturer,
  getAll,
  deleteManufacturerReduser,
  updateManufacturerReducer
} from "../reduserSlises/manufacturerSlice";

// const manufacturerService = new ManufacturerService();

export const getManufacturers = () => async (dispatch) => {
  try {
    // debugger
    const res = await ManufacturerService.getManufacturers();
    // console.log("res", res);
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

    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error.response.message };
  }
};

export const updateManufacturer = (model) => async (dispatch) => {
  try {
    console.log(model);
    const response = await ManufacturerService.updateManufacturer(model);

    dispatch(updateManufacturerReducer(response));

    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error.response.message };
  }
};

