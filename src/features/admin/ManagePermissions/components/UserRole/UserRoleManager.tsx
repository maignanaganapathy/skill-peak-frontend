// src/features/admin/ManagePermissions/UserRoleManager.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField, // Import TextField
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import UserRoleHeader from './UserRoleHeader';
import UserRoleRow from './UserRoleRow';
import { api } from '../../../../../utils/axiosConfig'; // Import the api instance
import { BACKEND_URL } from '../../../../../config';

interface Role {
  id: number;
  roleName: string;
}

interface UserData {
  mail: string;
  mobile: string;
  roleId: number | '';
}

interface RowData {
  mail: string;
  mobile: string;
  roleId: number | ''; // Ensure it's roleId
  isSelected: boolean;
  isNew?: boolean;
  projectId?: number;
}

const UserRoleManager: React.FC<{ roles: Role[] }> = ({ roles: propRoles }) => {
  const { projectId: routeProjectId } = useParams<{ projectId: string }>(); // Get projectId from route params
  const projectId = routeProjectId ? parseInt(routeProjectId, 10) : undefined; // Parse projectId

  const [rows, setRows] = useState<RowData[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [bulkRole, setBulkRole] = useState<number | ''>('');
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [commonPassword, setCommonPassword] = useState<string>(''); // State for common password
  const [localRoles, setLocalRoles] = useState<Role[]>(propRoles); // Use the prop directly

  useEffect(() => {
    setLocalRoles(propRoles); // Update local roles when prop changes
  }, [propRoles]);

  useEffect(() => {
    setSelectAll(rows.length > 0 && selectedRows.length === rows.length);
  }, [selectedRows, rows]);

  const handleAddUser = () => {
    if (projectId) {
      setRows([...rows, { mail: '', mobile: '', roleId: '', isSelected: false, isNew: true, projectId: projectId }]);
    } else {
      console.error('Project ID is not available.');
      // Handle the case where projectId is not available (e.g., show an error message)
    }
  };

  const handleChange = (
    index: number,
    field: keyof Omit<RowData, 'isSelected' | 'isNew' | 'projectId'>,
    value: string | number
  ) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    if (projectId) {
      newRows[index].projectId = projectId; // Ensure projectId is set for existing rows too
    }
    setRows(newRows);
  };

  const handleSelectRow = (index: number) => {
    const newRows = [...rows];
    newRows[index].isSelected = !newRows[index].isSelected;
    setRows(newRows);

    const isCurrentlySelected = selectedRows.includes(index);
    if (isCurrentlySelected) {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      setSelectedRows(rows.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleBulkRoleChange = (event: SelectChangeEvent<number | ''>) => {
    const value = event.target.value;
    if (value !== undefined) {
      setBulkRole(typeof value === 'number' ? value : (value === '' ? '' : Number(value)));
    }
  };

  const applyBulkRole = () => {
    const newRows = rows.map((row, index) =>
      selectedRows.includes(index) ? { ...row, roleId: bulkRole } : row
    );
    setRows(newRows);
    setBulkRole('');
    setSelectedRows([]);
  };

  const deleteUserRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleCommonPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommonPassword(event.target.value);
  };

  const handleSaveAllUsers = async () => {
    setIsSaving(true);
    if (!projectId) {
      console.error('Project ID is not available. Cannot save users.');
      alert('Project ID is missing. Please check the URL.');
      setIsSaving(false);
      return;
    }
    try {
      const userRolesToSend = rows
        .filter(row => row.mail && row.roleId !== '') // Ensure roleId is not empty string
        .map(row => ({
          email: row.mail,
          roleId: Number(row.roleId),
        }));

      const payload = {
        commonPassword: commonPassword,
        userRoles: userRolesToSend,
      };

      const response = await api.post(
        `${BACKEND_URL}/projects/${projectId}/users`,
        payload
      );

      console.log('Users saved/updated:', response.data);
      alert('All users saved successfully!');
      setRows((prevRows) => prevRows.map((row) => ({ ...row, isNew: false })));
      setCommonPassword(''); // Clear the password field after successful save
    } catch (err: any) {
      console.error('Error while submitting users:', err);
      if (err.response && err.response.status === 401) {
        console.error('Unauthorized access. Redirecting to login.');
        navigate('/login');
      } else {
        alert('Something went wrong during submission.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box component="section">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="700" color="text.primary">
          User Role Manager
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            label="Common Password"
            type="password"
            value={commonPassword}
            onChange={handleCommonPasswordChange}
            size="small"
            sx={{ mr: 2 }}
          />
          {rows.length > 0 && (
            <Button
              variant="contained"
              onClick={handleSaveAllUsers}
              startIcon={<SaveIcon />}
              disabled={isSaving}
              sx={{
                px: 2,
                py: 1.2,
                fontSize: '0.9rem',
                fontWeight: 'bold',
                backgroundColor: isSaving ? '#ccc' : '#0A7E07',
                borderRadius: 1,
                textTransform: 'none',
                minWidth: '140px',
              }}
            >
              {isSaving ? 'Saving...' : 'Save All'}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleAddUser}
            startIcon={<AddIcon />}
            sx={{
              px: 2,
              py: 1.2,
              fontSize: '0.9rem',
              fontWeight: 'bold',
              backgroundColor: '#1E3A8A',
              borderRadius: 1,
              textTransform: 'none',
              minWidth: '140px',
            }}
          >
            ADD USER
          </Button>
        </Box>
      </Box>

      {selectedRows.length > 0 && (
        <Box mb={2} display="flex" alignItems="center" gap={2}>
          <Typography fontWeight="bold">Bulk Actions:</Typography>
          <Select
            value={bulkRole}
            onChange={handleBulkRoleChange} // Correct onChange handler
            displayEmpty
            sx={{ minWidth: 120, fontSize: '0.875rem' }}
          >
            <MenuItem value="" disabled>
              Select Role
            </MenuItem>
            {localRoles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            onClick={applyBulkRole}
            disabled={!bulkRole}
            sx={{
              backgroundColor: '#FFA500',
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 'bold',
            }}
          >
            Apply Role
          </Button>
        </Box>
      )}

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <UserRoleHeader selectAll={selectAll} onSelectAll={handleSelectAll} />
        {rows.map((row, index) => (
          <UserRoleRow
            key={index}
            rowData={row}
            roles={localRoles} // Use the roles prop here
            index={index}
            onSelectRow={handleSelectRow}
            onChange={handleChange}
            onDeleteRow={deleteUserRow}
          />
        ))}
      </Paper>
    </Box>
  );
};

export default UserRoleManager;