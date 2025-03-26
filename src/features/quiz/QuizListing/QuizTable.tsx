import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, IconButton, Dialog, DialogTitle,
  DialogContent, DialogContentText, DialogActions, Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Quiz } from "../types/quiz";

interface QuizTableProps {
  quizzes: Quiz[];
  editIndex: number | null;
  editData: Quiz | null;
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
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter quizzes based on search query
  const filteredQuizzes = quizzes.filter(quiz => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      quiz.title?.toLowerCase().includes(searchTerm) ||
      quiz.description?.toLowerCase().includes(searchTerm) ||
      quiz.createdBy?.email?.toLowerCase().includes(searchTerm)
    );
  });

  const confirmDelete = (index: number) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    if (deleteIndex !== null) {
      handleDelete(deleteIndex);
    }
    setOpenDialog(false);
    setDeleteIndex(null);
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setDeleteIndex(null);
  };

  return (
    <>
      {/* Search Bar */}
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Project Used</strong></TableCell>
              <TableCell><strong>Created By</strong></TableCell>
              <TableCell><strong>Created Date</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredQuizzes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No matching quizzes found.
                </TableCell>
              </TableRow>
            ) : (
              filteredQuizzes.map((quiz, index) => {
                const isEditing = editIndex === index;

                // Extract unique project names from sections
                const projectNames = [...new Set(quiz.sections.map(section => section.project?.name).filter(Boolean))].join(', ');

                // Format the created date
                const createdDate = quiz.createdAt
                  ? new Date(quiz.createdAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "N/A";

                return (
                  <TableRow key={index}>
                    {/* Title */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={editData?.title || ""}
                          onChange={(e) => handleChangeEditField("title", e.target.value)}
                        />
                      ) : (
                        quiz.title
                      )}
                    </TableCell>

                    {/* Description */}
                    <TableCell>
                      {isEditing ? (
                        <TextField
                          value={editData?.description || ""}
                          onChange={(e) => handleChangeEditField("description", e.target.value)}
                        />
                      ) : (
                        quiz.description
                      )}
                    </TableCell>

                    {/* Project Used */}
                    <TableCell>
                      {projectNames || "N/A"}
                    </TableCell>

                    {/* Created By */}
                    <TableCell>
                      {quiz.createdBy?.email || "N/A"}
                    </TableCell>

                    {/* Created Date */}
                    <TableCell>
                      {createdDate}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <IconButton
                        color={isEditing ? "success" : "primary"}
                        onClick={() => (isEditing ? handleSave() : handleEdit(index))}
                      >
                        {isEditing ? <SaveIcon /> : <EditIcon />}
                      </IconButton>
                      <IconButton color="error" onClick={() => confirmDelete(index)}>
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

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this quiz? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" variant="outlined">
            No
          </Button>
          <Button onClick={handleConfirm} color="error" variant="contained">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuizTable;