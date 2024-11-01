import { ManufacturerService } from "../../../utils/services/ManufacturerService";
import { addManufacturer, getAll } from "../reduserSlises/manufacturerSlice";

const manufacturerService = new ManufacturerService();

export const getManufacturers = () => async (dispatch) => {
    try {
        // debugger
      const res = await manufacturerService.getManufacturers();
      console.log("res", res);
      dispatch(getAll(res));
    } catch (error) {
      console.error("get Manufacturers failed", error);
    }
  };

  export const createManufacturer = (name) => async (dispatch) => {
    try {
      const res = await manufacturerService.createManufacturer(name);
      console.log("res", res);
      dispatch(addManufacturer(res));
    } catch (error) {
      console.error("get Manufacturers failed", error);
    }
  };
