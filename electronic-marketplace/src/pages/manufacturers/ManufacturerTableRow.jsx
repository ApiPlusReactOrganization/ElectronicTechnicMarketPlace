import React, { useState, useCallback } from 'react'
import { useRenderCount } from '../../hooks/useRenderCount'
import isEqual from 'lodash/isEqual'

const ManufacturerTableRow = React.memo(
  ({ manufacturer, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(manufacturer.name)
    const renderCount = useRenderCount()

    const handleEditClick = useCallback(() => {
      setIsEditing(true)
    }, [])

    const handleChange = useCallback((e) => {
      setName(e.target.value)
    }, [])

    const handleSave = useCallback(() => {
      onEdit({ ...manufacturer, name })
      setIsEditing(false)
    }, [onEdit, manufacturer, name])

    const handleCancel = useCallback(() => {
      setName(manufacturer.name)
      setIsEditing(false)
    }, [manufacturer.name])

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
              <button
                className="btn btn-danger"
                onClick={() => onDelete(manufacturer.id)}
              >
                Delete
              </button>
            </>
          )}
        </td>
        <td>
          <h5>TodoTableRow render count: {renderCount}</h5>
        </td>
      </tr>
    )
  },
  (prevProps, nextProps) => {
    // Порівнюємо об'єкт manufacturer за допомогою isEqual
    return isEqual(prevProps.manufacturer, nextProps.manufacturer)
  }
)

export default ManufacturerTableRow
