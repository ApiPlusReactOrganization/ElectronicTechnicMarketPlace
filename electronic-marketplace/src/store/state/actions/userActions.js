import { authUser, logout } from "./../reduserSlises/userSlice";
import { UserService } from "../../../utils/services/UserService";
import { jwtDecode } from "jwt-decode";

export const signInUser = (model) => async (dispatch) => {
  try {
    const response = await UserService.signIn(model);

    await AuthByToken(response.payload)(dispatch);

    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error.response.message };
  }
};

export const AuthByToken = (token) => (dispatch) => {
  if (token) {
    localStorage.setItem("token", token);
    UserService.setAuthorizationToken(token);
    const user = jwtDecode(token);
    dispatch(authUser(user));
  } else {
    localStorage.removeItem("token");
    UserService.setAuthorizationToken(null);
  }
};

export const signUpUser = (model) => async (dispatch) => {
  try {
    const response = await UserService.signUp(model);

    const token = response.payload;

    await AuthByToken(token)(dispatch);

    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error.response.message };
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  UserService.setAuthorizationToken(null);
  dispatch(logout());
};
