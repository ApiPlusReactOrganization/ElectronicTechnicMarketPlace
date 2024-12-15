import React, { memo } from "react";
import { TextField, Typography, Box, Slider } from "@mui/material";


const MemoizedTypography = memo(Typography);


const MinMaxInput = memo(
  ({
    label,
    minLimit,
    maxLimit,
    step,
    valueMin,
    valueMax,
    onMinChange,
    onMaxChange,
  }) => {

    const handleSliderChange = (_, newRange) => {
      onMinChange(newRange[0]);
      onMaxChange(newRange[1]);
    };
    return (
      <Box mb={3}>
        <MemoizedTypography variant="subtitle1">{label}</MemoizedTypography>
        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <TextField
            label="Min"
            variant="outlined"
            size="small"
            value={valueMin}
            onChange={(e) => onMinChange(Number(e.target.value))}
            type="number"
          />
          <MemoizedTypography>-</MemoizedTypography>
          <TextField
            label="Max"
            variant="outlined"
            size="small"
            value={valueMax}
            onChange={(e) => onMaxChange(Number(e.target.value))}
            type="number"
          />
        </Box>
        <Slider
          value={[valueMin, valueMax]}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          disableSwap
          min={minLimit}
          max={maxLimit}
          step={step}
          sx={{ mt: 2 }}
        />
      </Box>
    );
  }
);

export default MinMaxInput;
