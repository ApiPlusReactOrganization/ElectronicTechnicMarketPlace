import { signIn, getAll, authUser } from "./../reduserSlises/userSlice";
import { UserService } from "../../../utils/services/UserService";
import { jwtDecode } from "jwt-decode";

// const userService = new UserService();

export const signInUser = () => async (dispatch) => {
  try {
    const res = await UserService.signIn();
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
    UserService.setAuthorizationToken(token);
    const user = jwtDecode(token);
    dispatch(authUser(user));
  } else {
    localStorage.removeItem("token");
    UserService.setAuthorizationToken(null);
  }
};
