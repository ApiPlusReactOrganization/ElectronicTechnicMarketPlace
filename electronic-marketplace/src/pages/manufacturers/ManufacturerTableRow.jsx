import React, { useState } from 'react';

const ManufacturerTableRow = React.memo(({ manufacturer, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(manufacturer.name);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    onEdit(manufacturer.id, name);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(manufacturer.name);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{manufacturer.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleChange}
            className="form-control"
          />
        ) : (
          manufacturer.name
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-warning" onClick={handleEditClick}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(manufacturer.id)}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
});

export default ManufacturerTableRow;
