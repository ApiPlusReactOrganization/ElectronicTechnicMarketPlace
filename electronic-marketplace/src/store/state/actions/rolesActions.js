import { getRolesS } from "./../reduserSlises/userSlice";
import { RoleService } from "../../../utils/services/RoleService";

export const getRoles = () => async (dispatch) => {
  try {
    const response = await RoleService.getRoles();

    dispatch(getRolesS(response));

    return { success: true, message: "get roles success" };
  } catch (error) {
    return { success: false, message: "get roles error" };
  }
};
