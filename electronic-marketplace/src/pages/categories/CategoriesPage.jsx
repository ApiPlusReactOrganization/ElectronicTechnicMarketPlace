import React, { useState, useEffect } from 'react'
import useActions from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CategoriesPage = () => {
  const navigate = useNavigate()
  const { getCategories, createCategory, deleteCategoryAction, updateCategoryAction } = useActions()
  const { categoryList } = useSelector((state) => state.category)
  const { isAuthenticated } = useSelector((state) => state.user)

  const [editingId, setEditingId] = useState(null)
  const [formValues, setFormValues] = useState({ name: ''})
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    getCategories()
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const startAdd = () => {
    setFormValues({ name: '' })
    setShowAddModal(true)
  }

  const cancelAdd = () => {
    setFormValues({ name: '' })
    setShowAddModal(false)
  }

  const saveAdd = async () => {
    await createCategory(formValues.name)
    setFormValues({ name: '' })
    setShowAddModal(false)
  }

  const startEdit = (category) => {
    setEditingId(category.id)
    setFormValues({ name: category.name })
    setShowEditModal(true)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormValues({ name: '' })
    setShowEditModal(false)
  }

  const saveEdit = async () => {
    await updateCategoryAction({ id: editingId, name: formValues.name })
    setEditingId(null)
    setFormValues({ name: '' })
    setShowEditModal(false)
  }

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const handleDelete = async () => {
    await deleteCategoryAction(deleteId)
    setShowDeleteModal(false)
    setDeleteId(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  return (
    <div className="container my-3">
      <h1>Categories</h1>
      {/* <button className="btn btn-primary float-end mb-2" onClick={startAdd}>
        Add Category
      </button> */}
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              {/* <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => startEdit(category)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmDelete(category.id)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelAdd}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter category name"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelAdd}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveAdd}>
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelEdit}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this category?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesPage