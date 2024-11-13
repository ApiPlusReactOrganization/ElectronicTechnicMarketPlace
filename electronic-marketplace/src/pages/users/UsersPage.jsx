import { useEffect, useState } from "react";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { TextField, Autocomplete } from "@mui/material";
import { toast } from "react-toastify";

const UsersPage = () => {
  const { userList, roleList } = useSelector((state) => state.user);
  const { getUsers, getRoles, changeRoles, deleteUser } = useActions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getUsers();
    getRoles();
  }, []);

  const handleRoleChange = async (userId, newRoles) => {
    const roles = newRoles.map((role) => ({ name: role.name }));
    const result = await changeRoles(userId, roles);

    if (result.success) {
      getUsers();
      getRoles();
    } else {
      toast.error(result.message);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await deleteUser(deleteId);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="container my-3">
      <h1>Users</h1>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <Autocomplete
                  multiple
                  id="user-roles-autocomplete"
                  size="small"
                  options={roleList}
                  value={user?.roles}
                  onChange={(event, newRoles) =>
                    handleRoleChange(user.id, newRoles)
                  }
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Roles" placeholder="Choose" />
                  )}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this manufacturer?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
