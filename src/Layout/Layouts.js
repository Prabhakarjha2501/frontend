import React, { useState, useEffect, Suspense } from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Paper } from '@mui/material';
//import MonthDropdown from '../Components/MonthDropdown';
//import TransactionTable from '../Components/TransactionTable';
//import Statistics from '../Components/Statistics';
//import BarChartComponent from '../Components/BarChartComponent';
import { fetchTransactions, fetchStatistics, fetchBarChartData } from '../services/api';


const MonthDropdown = React.lazy(() => import('../Components/MonthDropdown'));
const TransactionTable = React.lazy(() => import('../Components/TransactionTable'));
const Statistics = React.lazy(() => import('../Components/Statistics'));
const BarChartComponent = React.lazy(() => import('../Components/BarChartComponent'));



const Layouts = () => {

  const [selectedMonth, setSelectedMonth] = useState('Mar');
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    getStatistics();
    getBarChartData();
  }, [selectedMonth]);

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
  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Dashboard
        </Typography>

        <Box sx={{ marginBottom: 4 }}>
          <Suspense fallback={<CircularProgress />}>
            <MonthDropdown selectedMonth={selectedMonth} onMonthChange={handleMonthChange} />
          </Suspense>
        </Box>

        <Grid container spacing={4}>

          <Grid item xs={12} md={6}>
            <Paper sx={{ backgroundColor: "#e6f2ff", height: "400px" }}>
              <Suspense fallback={<CircularProgress />}>

                <Statistics statistics={statistics} />

              </Suspense>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<CircularProgress />}>
              <BarChartComponent data={barChartData} />
            </Suspense>
          </Grid>
          <Grid item xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <TransactionTable />
            </Suspense>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Layouts
