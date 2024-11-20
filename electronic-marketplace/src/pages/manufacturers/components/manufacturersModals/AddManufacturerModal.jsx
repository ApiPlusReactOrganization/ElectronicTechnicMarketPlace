import React, { useState, useCallback } from 'react'
import useActions from '../../../../hooks/useActions';
import { toast } from 'react-toastify'

const AddManufacturerModal = ({ showModal, closeModal }) => {
  const { createManufacturer } = useActions()
  const [manufacturerName, setManufacturerName] = useState('')

  const handleAddManufacturer = useCallback(async () => {
    const result = await createManufacturer(manufacturerName)
    if (result.success) {
      setManufacturerName('')
      closeModal()
    } else {
      toast.error(result.message)
    }
  }, [manufacturerName, createManufacturer, closeModal])

  return (
    <div
      className={`modal ${showModal ? 'd-block' : ''}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Manufacturer</h5>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={manufacturerName}
                onChange={(e) => setManufacturerName(e.target.value)}
                placeholder="Enter manufacturer name"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddManufacturer}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddManufacturerModal
