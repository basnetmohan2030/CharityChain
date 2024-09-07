import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../utils/Web3Provider';
import { useCharityChain } from '../utils/useCharityChain';
import { Button, Input } from 'react-daisyui';

function DonorDashboard() {
  const { account, signer } = useWeb3();
  const { charities, loading, registerDonor, isDonorRegistered } = useCharityChain(signer);
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState('');
  const [nationalID, setNationalID] = useState('');

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        if (account) {
          const registered = await isDonorRegistered(account);
          setIsRegistered(registered);
        }
      } catch (error) {
        console.error('Error checking registration:', error);
      }
    };

    checkRegistration();
  }, [account, isDonorRegistered]);

  const handleRegister = async () => {
    try {
      await registerDonor(name, nationalID);
      setIsRegistered(true);
    } catch (error) {
      console.error('Error registering donor:', error);
    }
  };

  if (loading) {
    return <p>Loading charities...</p>;
  }

  return (
    <div>
      {isRegistered ? (
        <div>
        <h2>Welcome to the Donor Dashboard</h2>
        <h3>Available Charities:</h3>
        {charities.length > 0 ? (
          charities.map(charity => (
            <div key={charity.id}>{charity.name}</div>
          ))
        ) : (
          <p>No charities available</p>
        )}
      </div>
      ) : (
        <div>
          <h2>Register as a Donor</h2>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
          />
          <Input
            placeholder="National ID"
            value={nationalID}
            onChange={(e) => setNationalID(e.target.value)}
            className="mb-4"
          />
          <Button color="primary" onClick={handleRegister}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
}

export default DonorDashboard;
