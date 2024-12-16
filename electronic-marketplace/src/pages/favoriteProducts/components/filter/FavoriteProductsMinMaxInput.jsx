import React, { memo, useState, useEffect, useCallback } from 'react'
import { TextField, Typography, Box, Slider } from '@mui/material'

const FavoriteProductsMinMaxInput = memo(
  ({
    label,
    minLimit,
    maxLimit,
    step,
    onFilterChange,
    filterKeyMin,
    filterKeyMax,
    initialMin = minLimit,
    initialMax = maxLimit,
  }) => {
    const [range, setRange] = useState([initialMin, initialMax])

    useEffect(() => {
      setRange([minLimit, maxLimit])
    }, [minLimit, maxLimit])

    const handleRangeChange = useCallback(
      (_, newValue) => {
        setRange(newValue)
        onFilterChange(filterKeyMin, newValue[0])
        onFilterChange(filterKeyMax, newValue[1])
      },
      [onFilterChange, filterKeyMin, filterKeyMax]
    )

    const handleInputChange = useCallback(
      (event) => {
        const { name, value } = event.target
        const parsedValue = value ? parseInt(value, 10) : 0

        setRange((prevRange) => {
          const newRange = [...prevRange]
          if (name === 'min') newRange[0] = parsedValue
          if (name === 'max') newRange[1] = parsedValue
          return newRange
        })

        onFilterChange(
          name === 'min' ? filterKeyMin : filterKeyMax,
          parsedValue
        )
      },
      [onFilterChange, filterKeyMin, filterKeyMax]
    )

    return (
      <Box mb={3}>
        <Typography variant="subtitle1">{label}</Typography>
        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <TextField
            label="Min"
            name="min"
            variant="outlined"
            size="small"
            value={range[0]}
            onChange={handleInputChange}
            type="number"
          />
          <Typography>-</Typography>
          <TextField
            label="Max"
            name="max"
            variant="outlined"
            size="small"
            value={range[1]}
            onChange={handleInputChange}
            type="number"
          />
        </Box>
        <Slider
          value={range}
          onChange={handleRangeChange}
          valueLabelDisplay="auto"
          disableSwap
          min={minLimit}
          max={maxLimit}
          step={step}
          sx={{ mt: 2 }}
        />
      </Box>
    )
  }
)

export default FavoriteProductsMinMaxInput
