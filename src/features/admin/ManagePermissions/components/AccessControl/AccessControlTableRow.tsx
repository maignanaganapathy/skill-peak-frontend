
import React from "react";
import { Grid, TextField, Switch, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Role } from "../../AccessControlPage";

interface AccessControlTableRowProps {
  role: Role;
  index: number;
  permissions: string[]; // Now these will be the string values from LocalPermissions
  onRoleNameChange: (index: number, value: string) => void;
  onRoleNameBlur: (index: number) => void;
  onDeleteRole: () => void;
  onPermissionChange: (roleIndex: number, permissionName: string, checked: boolean) => void;
}

const AccessControlTableRow: React.FC<AccessControlTableRowProps> = ({
  role,
  index,
  permissions,
  onRoleNameChange,
  onRoleNameBlur,
  onDeleteRole,
  onPermissionChange,
}) => {
  const cellStyle = () => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

  return (
    <Grid container sx={{ py: 1, borderBottom: '1px solid grey.300' }}>
      <Grid item xs={3} sx={{ pl: 2, display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          value={role?.name || ''}
          onChange={(e) => onRoleNameChange(index, e.target.value)}
          onBlur={() => onRoleNameBlur(index)}
          variant="standard"
          inputProps={{ style: { fontSize: '0.9rem' } }}
        />
      </Grid>
      {permissions.map((perm) => (
        <Grid item xs={1} key={perm} sx={cellStyle()}>
          <Switch
            checked={role?.permissions?.[perm]?.checked || false}
            onChange={(e) => onPermissionChange(index, perm, e.target.checked)}
            color="primary"
            size="small"
          />
        </Grid>
      ))}
      <Grid item xs={1} sx={{ textAlign: 'right', pr: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
        {index !== 0 && (
          <IconButton size="small" onClick={onDeleteRole}>
            <DeleteIcon sx={{ fontSize: 18, color: 'error.main' }} />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default AccessControlTableRow;