import React, { useState, useCallback, useEffect } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { toast } from 'react-toastify'
import useActions from '../../../../hooks/useActions'

const EditManufacturerModal = ({ showModal, closeModal, manufacturer }) => {
  const { updateManufacturer } = useActions()
  const [name, setName] = useState(manufacturer.name)

  useEffect(() => {
    setName(manufacturer.name)
  }, [manufacturer])

  const handleSave = useCallback(async () => {
    const result = await updateManufacturer({ ...manufacturer, name })
    if (result.success) {
      closeModal()
    } else {
      toast.error(result.message)
    }
  }, [name, manufacturer, updateManufacturer, closeModal])

  const handleCancel = () => {
    setName(manufacturer.name)
    closeModal()
  }

  return (
    <Modal open={showModal} onClose={handleCancel}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2">
          Edit Manufacturer
        </Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="inherit" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default EditManufacturerModal
