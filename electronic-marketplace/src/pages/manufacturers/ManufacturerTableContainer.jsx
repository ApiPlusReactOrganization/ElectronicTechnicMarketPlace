import React, { useEffect, useState, useCallback } from 'react'
import useActions from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import ManufacturersTable from './ManufacturersTable'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useRenderCount } from '../../hooks/useRenderCount'

const ManufacturerTableContainer = () => {
  const {
    getManufacturers,
    createManufacturer,
    updateManufacturer,
    deleteManufacturer,
  } = useActions()
  const { manufacturerList } = useSelector((state) => state.manufacturer)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [newManufacturerName, setNewManufacturerName] = useState('')
  const [selectedManufacturerId, setSelectedManufacturerId] = useState(null)
  const renderCount = useRenderCount()

  // Використовуємо useEffect для ініціалізації списку виробників
  useEffect(() => {
    getManufacturers()
  }, [getManufacturers])

  const handleAddManufacturer = useCallback(async () => {
    if (newManufacturerName.trim() !== '') {
      await createManufacturer(newManufacturerName)
      setNewManufacturerName('')
      setShowAddModal(false)
    }
  }, [newManufacturerName, createManufacturer])

  const handleDeleteManufacturer = useCallback(async () => {
    if (selectedManufacturerId) {
      await deleteManufacturer(selectedManufacturerId)
      setSelectedManufacturerId(null)
      setShowDeleteModal(false)
    }
  }, [selectedManufacturerId, deleteManufacturer])

  const openAddModal = useCallback(() => {
    setShowAddModal(true)
  }, [])

  const openDeleteModal = useCallback((id) => {
    setSelectedManufacturerId(id)
    setShowDeleteModal(true)
  }, [])

  return (
    <>
      {/* <h5>TodoTableContainer render count: {renderCount}</h5> */}

      <Button variant="primary" onClick={openAddModal} className="mb-3">
        Add Manufacturer
      </Button>

      <ManufacturersTable
        manufacturerList={manufacturerList}
        onEdit={updateManufacturer}
        onDelete={openDeleteModal}
      />

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Manufacturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newManufacturerName}
              onChange={(e) => setNewManufacturerName(e.target.value)}
              placeholder="Enter manufacturer name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddManufacturer}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this manufacturer?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteManufacturer}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ManufacturerTableContainer
