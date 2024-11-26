import React, { useState, useEffect, useCallback } from 'react'
import useActions from '../../../hooks/useActions'
import ManufacturersTable from './ManufacturersTable'
import AddManufacturerModal from './manufacturersModals/AddManufacturerModal'
import Loader from '../../../components/Loader'
import useLoader from '../../../hooks/useLoader'

const ManufacturerTableContainer = () => {
  const { getManufacturers } = useActions()

  const [showAddModal, setShowAddModal] = useState(false)

  const { isLoading, setIsLoading } = useLoader()

  useEffect(() => {
    setIsLoading(true)
    getManufacturers()
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error('Failed to load data.}')
      })
  }, [])

  const openAddModal = useCallback(() => setShowAddModal(true), [])
  const closeAddModal = useCallback(() => setShowAddModal(false), [])

  return (
    <>
      <Loader isLoading={isLoading}>
        <button className="btn btn-primary mb-3" onClick={openAddModal}>
          Add Manufacturer
        </button>

        <ManufacturersTable />

        <AddManufacturerModal
          showModal={showAddModal}
          closeModal={closeAddModal}
        />
      </Loader>
    </>
  )
}

export default ManufacturerTableContainer
