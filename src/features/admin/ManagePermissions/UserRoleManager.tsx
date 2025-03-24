"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

// Hardcoded auth token
const AUTH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzQyNzUyMDg4LCJleHAiOjE3NDI4Mzg0ODh9.A9F9SNTMvd-x41giYfQIJgheczP4d2sCIoPgG2DhuyM";

interface Role {
  id: number;
  roleName: string;
}

interface RowData {
  mail: string;
  mobile: string;
  role: number | "";
}

const UserRoleManager: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/projects/3/roles",
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          }
        );

        // Filter out duplicate roles based on ID
        const uniqueRoles = Array.from(
          new Map<number,Role>(
            response.data.map((r:{id:Number,roleName:string}) => [r.id, { id: r.id, roleName: r.roleName }])
          ).values() 

        );

        setRoles(uniqueRoles);
      } catch (err) {
        console.error("Failed to fetch roles:", err);
      }
    };

    fetchRoles();
  }, []);

  const handleAddUser = () => {
    setRows([...rows, { mail: "", mobile: "", role: "" }]);
  };

  const handleChange = (
    index: number,
    field: keyof RowData,
    value: string | number
  ) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: value };
    setRows(newRows);
  };

  const handleSubmit = async () => {
    try {
      for (const row of rows) {
        if (!row.mail || !row.mobile || !row.role) {
          console.warn("Missing field in row:", row);
          continue; // skip incomplete entries
        }

        const res = await axios.post(
          "http://localhost:5000/projects/3/users",
          {
            mail: row.mail,
            mobile: row.mobile,
            roleId: row.role, // adjust based on your backend schema
          },
          {
            headers: {
              Authorization: `Bearer ${AUTH_TOKEN}`,
            },
          }
        );

        console.log("User added:", res.data);
      }
      alert("All users submitted successfully!");
    } catch (err) {
      console.error("Error while submitting users:", err);
      alert("Something went wrong during submission.");
    }
  };

  return (
    <Box component="section">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="700" color="text.primary">
          User Role Manager
        </Typography>
        <Button
          variant="contained"
          onClick={handleAddUser}
          sx={{
            px: 2,
            py: 1.2,
            fontSize: "0.9rem",
            fontWeight: "bold",
            backgroundColor: "#1E3A8A",
            borderRadius: 1,
            textTransform: "none",
            minWidth: "140px",
          }}
        >
          + ADD USERS
        </Button>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Grid container>
          {["Mail Id", "Mobile", "Roles"].map((header, index) => (
            <Grid item xs={4} key={index} sx={cellStyle(true)}>
              <Typography fontSize="0.95rem" fontWeight="bold" textAlign="center">
                {header}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {rows.map((row, index) => (
          <Grid container key={index}>
            <Grid item xs={4} sx={cellStyle()}>
              <TextField
                fullWidth
                variant="standard"
                value={row.mail}
                onChange={(e) => handleChange(index, "mail", e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "0.75rem", fontWeight: "bold" },
                }}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>

            <Grid item xs={4} sx={cellStyle()}>
              <TextField
                fullWidth
                variant="standard"
                value={row.mobile}
                onChange={(e) => handleChange(index, "mobile", e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "0.75rem", fontWeight: "bold" },
                }}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  },
                }}
              />
            </Grid>

            <Grid item xs={4} sx={cellStyle()}>
              <Select
                fullWidth
                variant="standard"
                value={row.role}
                onChange={(e) => handleChange(index, "role", e.target.value)}
                displayEmpty
                disableUnderline
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Select Role
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.roleName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        ))}
      </Paper>

      {rows.length > 0 && (
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            mt: 3,
            backgroundColor: "#0A7E07",
            textTransform: "none",
            px: 4,
            py: 1.2,
            fontWeight: "bold",
          }}
        >
          Save Users
        </Button>
      )}
    </Box>
  );
};

// Cell style helper
const cellStyle = (isHeader = false) => ({
  px: 2,
  py: 2,
  border: "1px solid #cbd5e1",
  backgroundColor: isHeader ? "#A5C8E5" : "inherit",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default UserRoleManager;
