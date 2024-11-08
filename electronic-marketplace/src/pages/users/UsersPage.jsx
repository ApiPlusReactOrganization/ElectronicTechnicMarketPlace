import { useEffect } from "react";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";

const UsersPage = () => {
  // const { signInUser } = useActions()
  const user = useSelector((state) => state.user.currentUser)
  // useEffect(() => {
  //   signInUser();
  // }, []);

  return (
    <div>
      <p>Users Page </p>
      <div>
        <p>{user?.name}</p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default UsersPage;

