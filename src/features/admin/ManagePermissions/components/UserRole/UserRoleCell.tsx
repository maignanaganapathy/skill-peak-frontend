
import React from 'react';
import { Grid, TextField, Select, MenuItem } from '@mui/material';

interface UserRoleTableCellProps<T extends string | number> {
  value: T;
  onChange: (newValue: T) => void;
  xs: number;
  options?: { id: number; roleName: string }[];
  isSelect?: boolean;
}

const UserRoleCell: React.FC<UserRoleTableCellProps<string | number>> = ({
  value,
  onChange,
  xs,
  options,
  isSelect,
}) => {
  return (
    <Grid item xs={xs} sx={cellStyle()}>
      {isSelect && options ? (
        <Select
          fullWidth
          variant="standard"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          displayEmpty
          disableUnderline
          sx={{
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
          inputProps={{
            style: {
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            },
          }}
        >
          <MenuItem value="" disabled>
            Select Role
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.roleName}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          fullWidth
          variant="standard"
          value={value}
          onChange={(e) => onChange(e.target.value as string | number)}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: '0.75rem', fontWeight: 'bold' },
          }}
          inputProps={{
            style: {
              textAlign: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            },
          }}
        />
      )}
    </Grid>
  );
};

const cellStyle = () => ({
  px: 2,
  py: 2,
  border: '1px solid #cbd5e1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default UserRoleCell;