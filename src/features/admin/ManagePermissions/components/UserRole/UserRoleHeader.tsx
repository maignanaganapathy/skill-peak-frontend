
import React from 'react';
import { Grid, Typography, Checkbox } from '@mui/material';

interface UserRoleTableHeaderProps {
  selectAll: boolean;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserRoleHeader: React.FC<UserRoleTableHeaderProps> = ({ selectAll, onSelectAll }) => {
  return (
    <Grid container>
      <Grid item xs={1} sx={cellStyle(true)}>
        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
          <Checkbox checked={selectAll} onChange={onSelectAll} />
        </Typography>
      </Grid>
      <Grid item xs={3.5} sx={cellStyle(true)}>
        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
          Mail Id
        </Typography>
      </Grid>
      <Grid item xs={2.5} sx={cellStyle(true)}>
        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
          Mobile
        </Typography>
      </Grid>
      <Grid item xs={3.5} sx={cellStyle(true)}>
        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
          Roles
        </Typography>
      </Grid>
      <Grid item xs={1.5} sx={cellStyle(true)}>
        <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
          Actions
        </Typography>
      </Grid>
    </Grid>
  );
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

export default UserRoleHeader;