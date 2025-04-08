// src/features/admin/ManagePermissions/components/UserRole/UserRoleRow.tsx
import React, { ReactNode } from 'react'; // Import ReactNode
import {
  TableRow, // We might not need TableRow directly anymore
  TableCell, // We might not need TableCell directly anymore
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent, // Import SelectChangeEvent
  Grid, // Import Grid
  Checkbox, // Import Checkbox for the first column
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Role {
  id: number;
  roleName: string;
}

interface UserRoleTableRowProps {
  rowData: {
    mail: string;
    mobile: string;
    roleId: number | ''; // Use roleId here
    isSelected: boolean;
  };
  roles: Role[];
  index: number;
  onSelectRow: (index: number) => void;
  onChange: (index: number, field: 'mail' | 'mobile' | 'roleId', value: string | number) => void; // Use roleId
  onDeleteRow: (index: number) => void;
}

const UserRoleRow: React.FC<UserRoleTableRowProps> = ({
  rowData,
  roles,
  index,
  onSelectRow,
  onChange,
  onDeleteRow,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<number | ''>) => {
    const { name, value } = event.target;
    onChange(index, name as 'mail' | 'mobile' | 'roleId', value); // Use roleId
  };

  const cellStyle = (isHeader = false) => ({
    px: 2,
    py: 2,
    border: '1px solid #cbd5e1',
    backgroundColor: isHeader ? '#A5C8E5' : 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  });

  return (
    <Grid container>
      <Grid item xs={1} sx={cellStyle()}>
        <Checkbox checked={rowData.isSelected} onChange={() => onSelectRow(index)} />
      </Grid>
      <Grid item xs={3.5} sx={cellStyle()}>
        <input
          type="email"
          name="mail"
          value={rowData.mail}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </Grid>
      <Grid item xs={2.5} sx={cellStyle()}>
        <input
          type="tel"
          name="mobile"
          value={rowData.mobile}
          onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </Grid>
      <Grid item xs={3.5} sx={cellStyle()}>
        <FormControl fullWidth size="small">
          <InputLabel id={`role-label-${index}`}>Role</InputLabel>
          <Select
            labelId={`role-label-${index}`}
            id={`role-${index}`}
            name="roleId" // Use roleId here
            value={rowData.roleId}
            label="Role"
            onChange={(event) => { // Direct handler for SelectChangeEvent
              const { value } = event.target;
              onChange(index, 'roleId', value);
            }}
          >
            <MenuItem value="">Select Role</MenuItem>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={1.5} sx={cellStyle()}>
        <IconButton aria-label="delete" onClick={() => onDeleteRow(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default UserRoleRow;