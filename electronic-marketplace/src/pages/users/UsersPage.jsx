import { useEffect } from "react";
import useActions from "../../hooks/useActions";

const UsersPage = () => {
  const { signInUser } = useActions()

  useEffect(() => {
    signInUser();
  }, []);

  return (
    <div>
      <p>Users Page </p>
    </div>
  );
};

export default UsersPage;

