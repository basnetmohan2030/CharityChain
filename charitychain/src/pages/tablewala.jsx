/* import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import CharityChainABI from '../path/to/CharityChainABI.json'; // Replace with actual path
import { CONTRACT_ADDRESS } from '../path/to/constants'; // Replace with your contract address

const provider = new ethers.providers.Web3Provider(window.ethereum);
const charityChainContract = new ethers.Contract(CONTRACT_ADDRESS, CharityChainABI, provider);

const CharityDashboard = () => {
  const [charity, setCharity] = useState(null);
  const [donations, setDonations] = useState([]);
  const [recipients, setRecipients] = useState([]);
  
  useEffect(() => {
    const fetchCharityData = async () => {
      const charityId = 1; // Replace with dynamic ID or parameter
      const charity = await charityChainContract.getCharity(charityId);
      setCharity(charity);

      // Fetch donation data
      // Assuming you have a way to fetch this data, e.g., via events or API
      // setDonations(await fetchDonationsForCharity(charityId));
      
      // Fetch recipients
      setRecipients(charity.recipients);
    };

    fetchCharityData();
  }, []);

  const calculateAmountPerRecipient = () => {
    if (!charity || recipients.length === 0) return 0;
    return ethers.utils.formatUnits(charity.totalCollected, 18) / recipients.length;
  };

  const amountPerRecipient = calculateAmountPerRecipient();

  return (
    <div>
      {charity && (
        <div>
          <h2>Charity Dashboard</h2>
          <p>Charity: {charity.title}</p>
          <p>Total Raised: {ethers.utils.formatUnits(charity.totalCollected, 18)} NPR</p>
          <p>Amount per Recipient: {amountPerRecipient} NPR</p>
          <h3>Donation and Distribution</h3>
          <table>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Amount Donated</th>
                <th>Charity Event</th>
                <th>Amount Per Recipient</th>
                <th>Receivers</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index}>
                  <td>{donation.donor}</td>
                  <td>{ethers.utils.formatUnits(donation.amount, 18)} NPR</td>
                  <td>{charity.title}</td>
                  <td>{amountPerRecipient} NPR</td>
                  <td>{recipients.map(r => <div key={r.addr}>{r.name} ({r.addr})</div>)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CharityDashboard;
 */