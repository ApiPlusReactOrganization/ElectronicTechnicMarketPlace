import React, { useEffect } from "react";
import useActions from "../../../hooks/useActions";
import useLoader from "../../../hooks/useLoader";
import UsersTable from "./UsersTable";
import Loader from "../../../components/Loader";
import { toast } from "react-toastify";

const UsersTableContainer = () => {
  const { getUsers, getRoles, changeRoles, deleteUser } = useActions();
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then(() => getRoles())
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Failed to load data.");
        setIsLoading(false);
      });
  }, []);

  const handleRoleChange = async (userId, newRoles) => {
    const roles = newRoles.map((role) => ({ name: role.name }));
    setIsLoading(true);
    try {
      const result = await changeRoles(userId, roles);

      if (result.success) {
        await getUsers();
        await getRoles();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to change roles.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    setIsLoading(true);
    try {
      const result = await deleteUser(userId);

      if (result.success) {
        await getUsers();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to delete user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Loader isLoading={isLoading}>
      <UsersTable onRoleChange={handleRoleChange} onDelete={handleDelete} />
    </Loader>
  );
};

export default UsersTableContainer;
