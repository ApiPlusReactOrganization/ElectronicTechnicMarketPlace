import React from 'react';
import ManufacturerTableRow from './ManufacturerTableRow';

const ManufacturersTable = ({ manufacturerList, onEdit, onDelete }) => {
  return (
    <table className="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {manufacturerList.map((manufacturer) => (
          <ManufacturerTableRow
            key={manufacturer.id}
            manufacturer={manufacturer}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ManufacturersTable;
