import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../utils/Web3Provider';
import { useCharityChain } from '../utils/useCharityChain';
import { Button, Input } from 'react-daisyui';
import DonorNavbar from '../components/DonorNavbar';
import { Link } from 'react-router-dom';

function DonorDashboard() {
  const { account, signer } = useWeb3();
  const { charities, loading, fetchCharities, registerDonor, isDonorRegistered, getDonorDetails } = useCharityChain(signer);
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [donorDetails, setDonorDetails] = useState({ name: '', walletAddress: '' });
  const [name, setName] = useState('');
  const [nationalID, setNationalID] = useState('');

  // Check if the donor is registered and fetch active charities
  useEffect(() => {
    const checkRegistrationAndFetchCharities = async () => {
      try {
        if (account) {
          const registered = await isDonorRegistered(account);
          setIsRegistered(registered);
          
          if (registered) {
            // Fetch donor details if registered
            const details = await getDonorDetails(account);
            setDonorDetails(details);
          }

          // Avoid fetching charities if they are already loaded
         if (!charities.length) {
            await fetchCharities();
         }
        }
      } catch (error) {
        console.error('Error checking registration or fetching charities:', error);
      }
    };

    checkRegistrationAndFetchCharities();
  }, [account, isDonorRegistered, getDonorDetails, fetchCharities]);

  // Handle donor registration
  const handleRegister = async () => {
    try {
      await registerDonor(name, nationalID);
      setIsRegistered(true);
      const details = await getDonorDetails(account);
      setDonorDetails(details);

      // Fetch active charities after registration
      if (fetchCharities.legth < 0) {
        await fetchCharities();
      }
    } catch (error) {
      console.error('Error registering donor:', error);
    }
  };

  if (loading) {
    return <p>Loading charities...</p>;
  }

  const charitiess = [
    {
      id: 1,
      title: "Clean Water for Rural Nepal",
      description: "Help us provide clean and safe drinking water to remote villages in Nepal.",
      goalAmount: "500,000 NPR",
      thresholdAmount: "400,000 NPR",
      raisedAmount: "120,000 NPR",
      image: "https://vajraadventure.com/storage/blog/drinking-water-in-nepal.jpg"
    },
    {
      id: 2,
      title: "Support Schooling for Underprivileged Kids",
      description: "Join us in the mission to provide quality education to children from low-income families.",
      goalAmount: "300,000 NPR",
      thresholdAmount: "200,000 NPR",
      raisedAmount: "250,000 NPR",
      image: "https://www.nepaltrekhub.com/wp-content/uploads/2020/01/education-support-1536x866.jpg"
    },
    {
      id: 3,
      title: "Plant Trees to Combat Climate Change",
      description: "Join our reforestation efforts by planting trees in areas affected by deforestation.",
      goalAmount: "250,000 NPR",
      thresholdAmount: "180,000 NPR",
      raisedAmount: "130,000 NPR",
      image: "https://www.yetiwebsoft.com.np/dev/lovegreen/wp-content/uploads/2017/06/110-1.jpg"
    }
  ];

  return (
    <div>
      {isRegistered ? (
        <div>
          <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <DonorNavbar></DonorNavbar>

            {/* Charities Section */}
            <div className="container mx-auto p-6">
              <h2 className="text-3xl font-bold text-center mb-6">Active Campaigns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {charitiess.map((charity) => (
                  <div key={charity.id} className="card w-full bg-base-100 shadow-xl">
                      <figure>
                        <img src={charity.image} alt={charity.name} className="w-full h-48 object-cover" />
                      </figure>
                    <div className="card-body">
                      <h2 className="card-title text-primary">{charity.title}</h2>
                      <p>{charity.description}</p>
                      <div className="text-center mt-4">
                        <div>
                          <span className="font-semibold">Goal: </span>
                          {charity.goalAmount}
                        </div>
                        <div>
                          <span className="font-semibold">Threshold: </span>
                          {charity.thresholdAmount}
                        </div>
                        <div>
                          <span className="font-semibold">Raised: </span>
                          {charity.raisedAmount}
                        </div>
                      </div>
                      <div className="card-actions justify-center mt-4">
                        <Link to='/donation-page' className="primary-btn">Donate</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center secondary-text">Register as Donor</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">National ID</span>
              </label>
              <Input
                placeholder="National ID"
                value={nationalID}
                onChange={(e) => setNationalID(e.target.value)}
                className="input-bordered mb-4 w-full"
            />
            </div>
            <Button className='primary-btn' onClick={handleRegister}>
              Register
            </Button>
        </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default DonorDashboard;
