import React from "react";
import { TablePagination } from "@mui/material";

interface PaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  count,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => (
  <TablePagination
    component="div"
    count={count}
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={[10, 13, 15]}
  />
);

export default PaginationComponent;
