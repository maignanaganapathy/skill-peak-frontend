import { Slider } from "@mui/material";
import { useState } from "react";

interface LikertScaleProps {
  minValue: number;
  maxValue: number;
  onChange: (selectedValue: number) => void;
}

const LikertScale: React.FC<LikertScaleProps> = ({
  minValue,
  maxValue,
  onChange,
}) => {
  const [value, setValue] = useState<number>(minValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValue(newValue);
      onChange(newValue);
    }
  };

  const marks = [
    {
      value: minValue,
      label: String(minValue),
    },
    {
      value: maxValue,
      label: String(maxValue),
    },
  ];

  return (
    <Slider
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      step={1}
      marks={marks}
      min={minValue}
      max={maxValue}
    />
  );
};

export default LikertScale;
