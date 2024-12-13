import React, { memo, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectMemoizedmanufacturerList } from "../../../../store/state/selectors/manufacturerSelectors";

const ManufacturerFilter = memo(
  ({ selectedManufacturerIds, onManufacturerChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    const manufacturerList = useSelector(selectMemoizedmanufacturerList);

    const handleCheckboxChange = useCallback(
      (id) => {
        const updatedIds = selectedManufacturerIds.includes(id)
          ? selectedManufacturerIds.filter(
              (manufacturerId) => manufacturerId !== id
            )
          : [...selectedManufacturerIds, id];
        onManufacturerChange(updatedIds);
      },
      [selectedManufacturerIds, onManufacturerChange]
    );

    return (
      <div className="mb-3">
        <button
          className="btn btn-secondary w-100"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? "Приховати виробників" : "Показати виробників"}
        </button>
        {isVisible && (
          <div className="mt-3">
            {manufacturerList.map((manufacturer) => (
              <div
                key={manufacturer.id}
                className="form-check mb-2 d-flex align-items-center"
              >
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={selectedManufacturerIds.includes(manufacturer.id)}
                  onChange={() => handleCheckboxChange(manufacturer.id)}
                />
                <label className="form-check-label">{manufacturer.name}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default ManufacturerFilter;
