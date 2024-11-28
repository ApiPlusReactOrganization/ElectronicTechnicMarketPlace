import React, { useEffect } from "react";
import { toast } from "react-toastify";
import useActions from "../../../hooks/useActions";
import UsersTable from "./UsersTable";

const UsersTableContainer = () => {
  const { getUsers, getRoles } = useActions();

  useEffect(() => {
    getUsers()
    getRoles()
  }, []);

  return (
      <UsersTable />
  );
};

export default UsersTableContainer;
