import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Box,
} from '@mui/material';

const TransactionTable = ({
  transactions,
  searchValue,
  onSearchChange,
  pagination,
  onPageChange,
}) => {
  return (
    <Paper elevation={3}>
      <Box padding={2}>
        <TextField
          fullWidth
          label="Search Transactions"
          variant="outlined"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sold</TableCell>
              <TableCell>Date of Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>${transaction.price.toFixed(2)}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
                <TableCell>
                  {new Date(transaction.dateOfSale).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box padding={2} display="flex" justifyContent="center">
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={(e, page) => onPageChange(page)}
          color="primary"
        />
      </Box>
    </Paper>
  );
};

export default TransactionTable;