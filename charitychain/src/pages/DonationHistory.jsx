import React from 'react';
import DonorNavbar from '../components/DonorNavbar';

const DonationHistory = () => {
  const donations = [
    {
      id: 1,
      charityName: "Clean Water for Rural Nepa",
      amount: "2000 NPR",
      date: "2024-09-08",
    },
    {
      id: 2,
      charityName: "Support Schooling for Underprivileged Kids",
      amount: "1500 NPR",
      date: "2024-09-08",
    },
    {
      id: 3,
      charityName: "Plant Trees to Combat Climate Change",
      amount: "3000 NPR",
      date: "2024-09-08",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <DonorNavbar></DonorNavbar>

      {/* Donation History Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Your Donation History</h2>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className='text-lg'>
              <tr>
                <th>#</th>
                <th>Charity Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody className='text-base'>
              {donations.map((donation, index) => (
                <tr key={donation.id}>
                  <th>{index + 1}</th>
                  <td>{donation.charityName}</td>
                  <td>{donation.amount}</td>
                  <td>{donation.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationHistory;
