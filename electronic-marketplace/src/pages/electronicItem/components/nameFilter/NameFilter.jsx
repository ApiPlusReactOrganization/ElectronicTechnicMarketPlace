import { TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import useActions from "../../../../hooks/useActions";

const NameFilter = () => {
  const name = useSelector((state) => state.filters.name);
  const { updateName, filterProducts } = useActions();

  const handleNameChange = (e) => {
    updateName(e.target.value);
    filterProducts();
  };

  return (
    <div className="mb-3">
      <h4>Назва</h4>
      <TextField
        label="Назва продукту"
        variant="outlined"
        size="small"
        value={name}
        onChange={handleNameChange}
        fullWidth
      />
    </div>
  );
};

export default NameFilter;
