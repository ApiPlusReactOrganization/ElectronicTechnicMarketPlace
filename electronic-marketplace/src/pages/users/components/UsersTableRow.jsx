import React, { useState } from 'react'
import { TextField, Autocomplete } from '@mui/material'
import userImage from '../../../hooks/userImage'
import DeleteUserModal from './usersModals/DeleteUserModal'
import { useCallback } from 'react'

const UsersTableRow = ({ user, roleList, onRoleChange }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const closeModal = useCallback(() => {
    setShowDeleteModal(false)
  }, [])

  return (
    <>
      <tr>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <Autocomplete
            multiple
            size="small"
            options={roleList}
            value={user?.roles}
            onChange={(event, newRoles) => onRoleChange(user.id, newRoles)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Roles" placeholder="Choose" />
            )}
          />
        </td>
        <td>
          <img
            height="50"
            width="50"
            alt="User Avatar"
            loading="lazy"
            src={userImage(user.image?.filePath)}
          />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </td>
      </tr>
      <DeleteUserModal
        showModal={showDeleteModal}
        closeModal={closeModal}
        userId={user.id}
      />
    </>
  )
}

export default React.memo(UsersTableRow)
