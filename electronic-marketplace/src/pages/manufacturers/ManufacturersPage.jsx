import React, { useEffect, useState } from "react";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Table, Form } from "react-bootstrap";

const ManufacturersPage = () => {
  const navigate = useNavigate();
  const { getManufacturers, createManufacturer, updateManufacturer, deleteManufacturer } = useActions();
  const { manufacturerList } = useSelector((state) => state.manufacturer);
  const { isAuth } = useSelector((state) => state.user);

  const [editingId, setEditingId] = useState(null);
  const [formValues, setFormValues] = useState({ name: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    getManufacturers();
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const startAdd = () => {
    setFormValues({ name: "" });
    setShowAddModal(true);
  };

  const cancelAdd = () => {
    setFormValues({ name: "" });
    setShowAddModal(false);
  };

  const saveAdd = async () => {
    await createManufacturer(formValues.name);
    setFormValues({ name: "" });
    setShowAddModal(false);
  };

  const startEdit = (manufacturer) => {
    setEditingId(manufacturer.id);
    setFormValues({ name: manufacturer.name });
    setShowEditModal(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormValues({ name: "" });
    setShowEditModal(false);
  };

  const saveEdit = async () => {
    await updateManufacturer({ id: editingId, name: formValues.name });
    setEditingId(null);
    setFormValues({ name: "" });
    setShowEditModal(false);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    await deleteManufacturer(deleteId);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <div className="container my-3">
      <h1>Manufacturers</h1>
      <Button variant="primary float-end mb-2" onClick={startAdd}>
        Add Manufacturer
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {manufacturerList.map((manufacturer) => (
            <tr key={manufacturer.id}>
              <td>{manufacturer.id}</td>
              <td>{manufacturer.name}</td>
              <td>
                <Button variant="warning" onClick={() => startEdit(manufacturer)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => confirmDelete(manufacturer.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={cancelAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Manufacturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formAddManufacturerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelAdd}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveAdd}>
            Add Manufacturer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={cancelEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Manufacturer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEditManufacturerName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelEdit}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this manufacturer?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManufacturersPage;
