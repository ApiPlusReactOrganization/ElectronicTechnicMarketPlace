import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import useActions from "../../../../hooks/useActions";
import useDebouncedEffect from "../../../../hooks/useDebouncedEffect";
import { selectMemoizedmanufacturerList } from "../../../../store/state/selectors/manufacturerSelectors";

const MemoizedTypography = memo(Typography);

const ManufacturerFilter = () => {
  const [isVisible, setIsVisible] = useState(true);
  const manufacturerList = useSelector(selectMemoizedmanufacturerList);
  const selectedManufacturerIds = useSelector(
    (state) => state.filters.manufacturerIds
  );
  const { updateManufacturerIds, filterProducts } = useActions();

  const handleCheckboxChange = (id) => {
    const updatedIds = selectedManufacturerIds.includes(id)
      ? selectedManufacturerIds.filter(
          (manufacturerId) => manufacturerId !== id
        )
      : [...selectedManufacturerIds, id];
    updateManufacturerIds(updatedIds);
  };

  useDebouncedEffect(
    () => {
      filterProducts();
    },
    300,
    [selectedManufacturerIds]
  );

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="mb-3">
      <MemoizedTypography variant="h6" gutterBottom>
        Manufacturers
        <IconButton onClick={toggleVisibility}>
          {isVisible ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </MemoizedTypography>
      {isVisible && (
        <Box display="flex" flexDirection="column">
          {manufacturerList.map((manufacturer) => (
            <FormControlLabel
              key={manufacturer.id}
              control={
                <Checkbox
                  checked={selectedManufacturerIds.includes(manufacturer.id)}
                  onChange={() => handleCheckboxChange(manufacturer.id)}
                  color="primary"
                />
              }
              label={manufacturer.name}
            />
          ))}
        </Box>
      )}
    </div>
  );
};

export default ManufacturerFilter;
