
import React from 'react';
import { Grid, Typography } from '@mui/material';


interface AccessControlTableHeaderProps {
  permissions: string[];
}

const AccessControlTableHeader: React.FC<AccessControlTableHeaderProps> = ({ permissions }) => {
  return (
    <Grid container sx={{ bgcolor: 'grey.200', py: 1, fontWeight: 'bold' }}>
      <Grid item xs={3} sx={{ pl: 2 }}>
        Role Name
      </Grid>
      {permissions.map((permission) => (
        <Grid item xs={1} key={permission} sx={{ textAlign: 'center' }}>
          {permission.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')}
        </Grid>
      ))}
      <Grid item xs={1} sx={{ textAlign: 'right', pr: 2 }}>
        Actions
      </Grid>
    </Grid>
  );
};

export default AccessControlTableHeader;