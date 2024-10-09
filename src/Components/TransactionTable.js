import React, { useEffect, useState } from 'react';
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
  Avatar,
} from '@mui/material';
import MonthDropdown from './MonthDropdown';
import { fetchTransactions } from '../services/api';
const TransactionTable = ({
}) => {
  const [selectedMonth, setSelectedMonth] = useState('Mar');
  const [transactions, setTransactions] = useState([]);
  const [transactionSearch, setTransactionSearch] = useState('');
  const [transactionPagination, setTransactionPagination] = useState({
    page: 1,
    perPage: 15,
    totalItems: 0,
    totalPages: 1,
  });

  useEffect(() => {
    getTransactions();

  }, [transactionSearch, transactionPagination.page, selectedMonth])

  const getTransactions = async () => {
    try {
      const response = await fetchTransactions(transactionPagination.page, transactionPagination.perPage, transactionSearch, selectedMonth);
      setTransactions(response.data);
      setTransactionPagination(prev => ({
        ...prev,
        totalItems: response.totalItems,
        totalPages: response.totalPages,
      }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearchChange = (searchTerm) => {
    setTransactionSearch(searchTerm);
    setTransactionPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setTransactionPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
  }
  return (
    <>
      <Paper elevation={3}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box padding={1} sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              label="Search Transactions"
              variant="outlined"
              value={transactionSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </Box>
          <Box sx={{ marginLeft: "auto", width: "30%" }}>
            <MonthDropdown selectedMonth={selectedMonth} onMonthChange={handleMonthChange}></MonthDropdown>
          </Box>
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
                <TableCell>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>${transaction.price.toFixed(0)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {new Date(transaction.dateOfSale).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Avatar
                      alt={transaction.title}
                      src={transaction.image}
                      sx={{ width: "150px", height: "150px" }}
                      variant="square"
                    >

                    </Avatar>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box padding={2} display="flex" justifyContent="center">
          <Pagination
            count={transactionPagination.totalPages}
            page={transactionPagination.page}
            onChange={(e, page) => handlePageChange(page)}
            color="primary"
          />
        </Box>
      </Paper>
    </>
  );
};

export default TransactionTable;
