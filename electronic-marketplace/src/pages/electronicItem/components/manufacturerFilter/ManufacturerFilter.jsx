import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ManufacturerFilter = memo(({ categoryId, onChange }) => {
  const manufacturerList = useSelector(
    (state) => state.manufacturer.manufacturerList
  );
  const [isManufacturerListVisible, setIsManufacturerListVisible] =
    useState(false);

  useEffect(() => {
    onChange();
  }, [categoryId, onChange]);

  return (
    <div className="mb-3">
      <button
        className="btn btn-secondary w-100"
        onClick={() =>
          setIsManufacturerListVisible(!isManufacturerListVisible)
        }
      >
        {isManufacturerListVisible
          ? "Приховати виробників"
          : "Показати виробників"}
      </button>
      {isManufacturerListVisible && (
        <div className="mt-3">
          {manufacturerList.map((manufacturer) => (
            <div
              key={manufacturer.id}
              className="form-check mb-2 d-flex align-items-center"
            >
              <input
                type="checkbox"
                className="form-check-input me-2"
                onChange={() => onChange(manufacturer.id)}
              />
              <label className="form-check-label">{manufacturer.name}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ManufacturerFilter;
