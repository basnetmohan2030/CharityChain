import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DonorDashboard from './pages/DonorDashboard';
import CharityCreator from './pages/DonorDashboard';
import LandingPage from './LandingPage';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/donorpage" element={<DonorDashboard/>} />
          <Route path="/charitypage" element={<CharityCreator/>} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;