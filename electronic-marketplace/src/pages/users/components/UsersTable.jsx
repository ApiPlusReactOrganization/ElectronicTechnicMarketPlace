import React from "react";
import { useSelector } from "react-redux";
import UsersTableRow from "./UsersTableRow";

const UsersTable = ({ onRoleChange, onDelete }) => {
  const { userList, roleList } = useSelector((state) => state.user);

  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Roles</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {userList.map((user) => (
          <UsersTableRow
            key={user.id}
            user={user}
            roleList={roleList}
            onRoleChange={onRoleChange}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(UsersTable);
