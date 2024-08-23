import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
//import MonthDropdown from './components/MonthDropdown';
import MonthDropdown from './Components/MonthDropdown';
//import TransactionTable from './components/TransactionTable';
import TransactionTable from './Components/TransactionTable';
//import Statistics from './components/Statistics';
import Statistics from './Components/Statistics';
//import BarChartComponent from './components/BarChartComponent';
import BarChartComponent from './Components/BarChartComponent';
import { fetchTransactions, fetchStatistics, fetchBarChartData } from './services/api';
//import { MONTHS } from './utils/constants';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('Mar');
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [transactionSearch, setTransactionSearch] = useState('');
  const [transactionPagination, setTransactionPagination] = useState({
    page: 1,
    perPage: 15,
    totalItems: 0,
    totalPages: 1,
  });

  useEffect(() => {
    getTransactions();
    getStatistics();
    getBarChartData();
  }, [selectedMonth, transactionSearch, transactionPagination.page]);

  const getTransactions = async () => {
    try {
      const response = await fetchTransactions(transactionPagination.page, transactionPagination.perPage, transactionSearch);
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

  const getStatistics = async () => {
    try {
      const data = await fetchStatistics(selectedMonth);
      setStatistics(data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const getBarChartData = async () => {
    try {
      const data = await fetchBarChartData(selectedMonth);
      setBarChartData(data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleSearchChange = (searchTerm) => {
    setTransactionSearch(searchTerm);
    setTransactionPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setTransactionPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ marginBottom: 4 }}>
        <MonthDropdown selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Statistics statistics={statistics} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChartComponent data={barChartData} />
        </Grid>
        <Grid item xs={12}>
          <TransactionTable
            transactions={transactions}
            searchValue={transactionSearch}
            onSearchChange={handleSearchChange}
            pagination={transactionPagination}
            selectedMonth={selectedMonth}
            onPageChange={handlePageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;















// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
