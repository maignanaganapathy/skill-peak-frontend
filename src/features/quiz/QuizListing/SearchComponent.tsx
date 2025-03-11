import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => (
  <TextField
    variant="outlined"
    placeholder="Search by name or description"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    sx={{ flexGrow: 1 }}
  />
);

export default SearchComponent;
