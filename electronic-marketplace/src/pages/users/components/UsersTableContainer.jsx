import React, { useEffect } from "react";
import useActions from "../../../hooks/useActions";
import useLoader from "../../../hooks/useLoader";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";
import UsersTable from "./UsersTable";

const UsersTableContainer = () => {
  const { getUsers, getRoles } = useActions();
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then(() => getRoles())
      .catch(() => toast.error("Failed to load data."))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <UsersTable />
    </Loader>
  );
};

export default UsersTableContainer;
