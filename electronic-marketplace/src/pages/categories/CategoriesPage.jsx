import React, { useState, useEffect } from 'react'
import useActions from './../../hooks/useActions';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';


const CategoriesPage = () => {
  const { getCategories, createCategory } = useActions();
  // to hooks useSelector
  const categories = useSelector((state) => state.category.categoryList)
  useEffect(() => {
    getCategories()
  }, [])

  const addCategory = () => {
    createCategory( `Category ${categories.length + 1}` )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary" onClick={addCategory}>
            Add category
          </button>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage

