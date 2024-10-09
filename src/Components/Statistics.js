import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Statistics = ({ statistics }) => {
  const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = statistics;

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Sale Amount
            </Typography>
            <Typography variant="h4">${totalSaleAmount?.toFixed(2) || '0.00'}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Sold Items
            </Typography>
            <Typography variant="h4">{totalSoldItems || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Not Sold Items
            </Typography>
            <Typography variant="h4">{totalNotSoldItems || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </>
  );
};

export default Statistics;