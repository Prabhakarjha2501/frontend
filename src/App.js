import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import Layouts from './Layout/Layouts';


const App = () => {

  return (
    <>
      <Suspense fallback={<CircularProgress />}>
        <Layouts />
      </Suspense>

    </>
  );
};

export default App;
