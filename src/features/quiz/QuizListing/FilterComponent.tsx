import React from "react";
import { Autocomplete, TextField } from "@mui/material";

interface FilterProps {
  allProjects: string[];
  selectedProject: string | null;
  setSelectedProject: (project: string | null) => void;
}

const FilterComponent: React.FC<FilterProps> = ({
  allProjects,
  selectedProject,
  setSelectedProject,
}) => {
  return (
    <Autocomplete
      value={selectedProject}
      onChange={(_, newValue) => setSelectedProject(newValue)}
      options={allProjects}
      getOptionLabel={(option) => option}
      sx={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label="Filter by Project" variant="outlined" />
      )}
      clearOnEscape
    />
  );
};

export default FilterComponent;
