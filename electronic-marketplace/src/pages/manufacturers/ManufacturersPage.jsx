import React, { useEffect, useState } from 'react'
import useActions from '../../hooks/useActions'
import { useSelector } from 'react-redux'

const ManufacturersPage = () => {

  const { getManufacturers, createManufacturer } = useActions()
  const manufacturers = useSelector((state) => state.manufacturer.manufacturerList)

  useEffect(() => {
    getManufacturers()
  }, [])

  const addManufacturer = () => {
    createManufacturer( `Manufacturer ${manufacturers.length + 1}` )
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
              {manufacturers.map((manufacturer, index) => (
                <tr key={index}>
                  <td>{manufacturer.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <button type="button" className="btn btn-primary" onClick={addManufacturer}>
            Add manufacturer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManufacturersPage

