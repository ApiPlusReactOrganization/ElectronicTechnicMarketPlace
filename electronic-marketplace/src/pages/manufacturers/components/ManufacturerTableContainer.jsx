import React, { useState, useEffect } from 'react'
import useActions from '../../../hooks/useActions'
import ManufacturersTable from './ManufacturersTable'
import AddManufacturerModal from './manufacturersModals/AddManufacturerModal'

const ManufacturerTableContainer = () => {
  const { getManufacturers } = useActions()
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    getManufacturers()
  }, [])

  const openAddModal = () => setShowAddModal(true)
  const closeAddModal = () => setShowAddModal(false)

  return (
    <>
      <button className="btn btn-primary mb-3" onClick={openAddModal}>
        Add Manufacturer
      </button>

      <ManufacturersTable />

      <AddManufacturerModal
        showModal={showAddModal}
        closeModal={closeAddModal}
      />
    </>
  )
}

export default ManufacturerTableContainer
