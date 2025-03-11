import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, TextField, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

interface Quiz {
  name: string;
  description: string;
  projectsUsed: string[];
  createdDate: string;
}

interface QuizTableProps {
  quizzes: Quiz[];
  editIndex: number | null;
  editData: Quiz;
  handleChangeEditField: (field: keyof Quiz, value: any) => void;
  handleEdit: (index: number) => void;
  handleSave: () => void;
  handleDelete: (index: number) => void;
}

const QuizTable: React.FC<QuizTableProps> = ({
  quizzes,
  editIndex,
  editData,
  handleChangeEditField,
  handleEdit,
  handleSave,
  handleDelete,
}) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><strong>Name</strong></TableCell>
          <TableCell><strong>Description</strong></TableCell>
          <TableCell><strong>Project Used</strong></TableCell>
          <TableCell><strong>Created Date</strong></TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {quizzes.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} align="center">
              No matching quizzes found.
            </TableCell>
          </TableRow>
        ) : (
          quizzes.map((quiz, index) => {
            const isEditing = editIndex === index;
            return (
              <TableRow key={index}>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editData.name}
                      onChange={(e) => handleChangeEditField("name", e.target.value)}
                    />
                  ) : quiz.name}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editData.description}
                      onChange={(e) => handleChangeEditField("description", e.target.value)}
                    />
                  ) : quiz.description}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      value={editData.projectsUsed.join(", ")}
                      onChange={(e) =>
                        handleChangeEditField("projectsUsed", e.target.value.split(",").map(p => p.trim()))
                      }
                    />
                  ) : quiz.projectsUsed.map((p, i) => (
                    <Chip key={i} label={p} sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </TableCell>
                <TableCell>
                  {isEditing ? (
                    <TextField
                      type="date"
                      value={editData.createdDate}
                      onChange={(e) => handleChangeEditField("createdDate", e.target.value)}
                    />
                  ) : quiz.createdDate}
                </TableCell>
                <TableCell>
                  <IconButton
                    color={isEditing ? "success" : "primary"}
                    onClick={() => (isEditing ? handleSave() : handleEdit(index))}
                  >
                    {isEditing ? <SaveIcon /> : <EditIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default QuizTable;
