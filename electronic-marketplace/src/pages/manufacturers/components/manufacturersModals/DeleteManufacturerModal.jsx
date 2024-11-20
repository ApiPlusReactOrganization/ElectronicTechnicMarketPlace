import React, { useCallback } from 'react';
import useActions from '../../../../hooks/useActions';
import { toast } from 'react-toastify';

const DeleteManufacturerModal = ({ showModal, closeModal, manufacturerId }) => {
  const { deleteManufacturer } = useActions();

  const handleDeleteManufacturer = useCallback(async () => {
    debugger
    const result = await deleteManufacturer(manufacturerId);
    if (result.success) {
      closeModal();
    } else {
      toast.error(result.message);
    }
  }, [deleteManufacturer, manufacturerId, closeModal]);

  return (
    <div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
            <button type="button" className="close" onClick={closeModal}>&times;</button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this manufacturer?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={handleDeleteManufacturer}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteManufacturerModal;
