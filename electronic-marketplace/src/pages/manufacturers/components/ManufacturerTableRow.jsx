import React, { useState, useCallback } from 'react'
import { useRenderCount } from '../../../hooks/useRenderCount'
import isEqual from 'lodash/isEqual'
import { toast } from 'react-toastify'
import useActions from '../../../hooks/useActions'
import DeleteManufacturerModal from './manufacturersModals/DeleteManufacturerModal'

const ManufacturerTableRow = React.memo(
  ({ manufacturer }) => {
    const { updateManufacturer } = useActions() // Отримання дій
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(manufacturer.name)
    const renderCount = useRenderCount()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedManufacturerId, setSelectedManufacturerId] = useState(null)

    const openDeleteModal = (id) => {
      setSelectedManufacturerId(id)
      setShowDeleteModal(true)
    }

    const closeDeleteModal = () => setShowDeleteModal(false)

    const handleEditClick = useCallback(() => {
      setIsEditing(true)
    }, [])

    const handleChange = useCallback((e) => {
      setName(e.target.value)
    }, [])

    const handleSave = useCallback(async () => {
      const result = await updateManufacturer({ ...manufacturer, name }) // Виклик дії
      if (result.success) {
        setIsEditing(false)
      } else {
        toast.error(result.message)
      }
    }, [updateManufacturer, manufacturer, name])

    const handleCancel = useCallback(() => {
      setName(manufacturer.name)
      setIsEditing(false)
    }, [manufacturer.name])



    return (
      <>
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
              <div className="d-flex gap-3 justify-content-center">
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              <div className="d-flex gap-3 justify-content-center">
                <button className="btn btn-warning" onClick={handleEditClick}>
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => openDeleteModal(manufacturer.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </td>
          <td>
            <h5>ManufacturerTableRow render count: {renderCount}</h5>
          </td>
        </tr>
        <DeleteManufacturerModal
          showModal={showDeleteModal}
          closeModal={closeDeleteModal}
          manufacturerId={selectedManufacturerId}
        />
      </>
    )
  },
  (prevProps, nextProps) => {
    return isEqual(prevProps.manufacturer, nextProps.manufacturer)
  }
)

export default ManufacturerTableRow
