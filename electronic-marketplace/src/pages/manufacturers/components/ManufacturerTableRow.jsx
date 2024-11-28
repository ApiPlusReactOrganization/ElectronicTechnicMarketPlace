import React, { useState, useCallback } from 'react'
import { useRenderCount } from '../../../hooks/useRenderCount'
import isEqual from 'lodash/isEqual'
import DeleteManufacturerModal from './manufacturersModals/DeleteManufacturerModal'
import EditManufacturerModal from './manufacturersModals/EditManufacturerModal'

const ManufacturerTableRow = React.memo(
  ({ manufacturer }) => {
    const renderCount = useRenderCount()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedManufacturerId, setSelectedManufacturerId] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)

    const openDeleteModal = useCallback((id) => {
      setSelectedManufacturerId(id)
      setShowDeleteModal(true)
    }, [])

    const closeDeleteModal = useCallback(() => setShowDeleteModal(false), [])

    const openEditModal = useCallback(() => setShowEditModal(true), [])

    const closeEditModal = useCallback(() => setShowEditModal(false), [])

    return (
      <>
        <tr>
          <td>{manufacturer.id}</td>
          <td>{manufacturer.name}</td>
          <td>
            <div className="d-flex gap-3 justify-content-center">
              <button className="btn btn-warning" onClick={openEditModal}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => openDeleteModal(manufacturer.id)}
              >
                Delete
              </button>
            </div>
          </td>
          <td>
            <h5>ManufacturerTableRow render count: {renderCount}</h5>
          </td>
        </tr>

        <EditManufacturerModal
          showModal={showEditModal}
          closeModal={closeEditModal}
          manufacturer={manufacturer}
        />
        <DeleteManufacturerModal
          showModal={showDeleteModal}
          closeModal={closeDeleteModal}
          manufacturerId={selectedManufacturerId}
        />
      </>
    )
  },
  (prevProps, nextProps) => isEqual(prevProps.manufacturer, nextProps.manufacturer)
)

export default ManufacturerTableRow