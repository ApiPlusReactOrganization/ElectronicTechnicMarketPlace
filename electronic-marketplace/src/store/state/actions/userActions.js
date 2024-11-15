import {
  authUser,
  logout,
  deleteUserS,
  getAll,
} from "./../reduserSlises/userSlice";
import { AuthService } from "../../../utils/services/AuthService";
import { UserService } from "../../../utils/services/UserService";
import { jwtDecode } from "jwt-decode";


export const signInUser = (model) => async (dispatch) => {
  try {
    const response = await AuthService.signIn(model);
    await AuthByToken(response.payload)(dispatch);
    return { success: true, message: response.message };
  } catch (error) {    
    return { success: false, message: error.response.data };
  }
};

export const AuthByToken = (token) => async (dispatch) => {
  if (token) {
    localStorage.setItem("token", token);
    await AuthService.setAuthorizationToken(token);
    const user = jwtDecode(token);
    dispatch(authUser(user));
  } else {
    localStorage.removeItem("token");
    await AuthService.setAuthorizationToken(null);
  }
};

export const signUpUser = (model) => async (dispatch) => {
  try {
    const response = await AuthService.signUp(model);

    const token = response.payload;

    await AuthByToken(token)(dispatch);

    return { success: true, message: response.message };
  } catch (error) {
    return { success: false, message: error.response.message };
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("token");
  await AuthService.setAuthorizationToken(null);
  dispatch(logout());
};

export const getUsers = () => async (dispatch) => {
  try {
    const response = await UserService.getUsers();

    dispatch(getAll(response));

    return { success: true, message: "get users success" };
  } catch (error) {
    return { success: false, message: "get users error" };
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    await UserService.delete(userId);

    dispatch(deleteUserS(userId));

    return { success: true, message: "delete users success" };
  } catch (error) {
    return { success: false, message: "delete users error" };
  }
};

export const changeRoles = (userId, roles) => async (dispatch) => {
  try {
    const response = await UserService.changeRoles(userId, roles);
    console.log(response);

    return { success: true, message: "User roles updated successfully" };
  } catch (error) {
    console.log(error);
    const errorMessage = error.response?.data?.errors || "An error occurred during role change";
    return { success: false, message: errorMessage };
  }
};


