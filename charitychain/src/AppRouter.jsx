import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DonorDashboard from './pages/DonorDashboard';
import CharityCreator from './pages/CharityCreator';
import LandingPage from './LandingPage';
import DonationHistory from './pages/DonationHistory';
import OrganizationDashboard from './pages/OrganizationDashboard';
import CampaignDetail from './CampaignDetail';
import OrgCampaignDetail from './pages/OrgCampaignDetail';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/donorpage" element={<DonorDashboard/>} />
          <Route path="/charitypage" element={<CharityCreator/>} />
          <Route path="/donationhistory" element={<DonationHistory/>} />
          <Route path="/organization-dashboard" element={<OrganizationDashboard/>} />
          <Route path="/campaign-detail" element={<CampaignDetail/>} />
          <Route path="/organization-campaign" element={<OrgCampaignDetail/>} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;