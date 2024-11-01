import { signIn, getAll, authUser } from "./../reduserSlises/userSlice";
import { UserService } from "../../../utils/services/UserService";
import { jwtDecode } from "jwt-decode";

const userService = new UserService();

export const signInUser = () => async (dispatch) => {
  try {
    const res = await userService.signIn();
    console.log("res", res);
    dispatch(signIn(res));
    await AuthByToken(res.payload)(dispatch);
  } catch (error) {
    console.error("Sign-in failed", error);
  }
};

export const AuthByToken = (token) => (dispatch) => {
  if (token) {
    localStorage.setItem("token", token);
    userService.setAuthorizationToken(token);
    const user = jwtDecode(token);
    dispatch(authUser(user));
  } else {
    localStorage.removeItem("token");
    userService.setAuthorizationToken(null);
  }
};
