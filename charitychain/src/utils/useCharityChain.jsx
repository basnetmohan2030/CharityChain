import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CharityChain from '../abis/CharityChain.json';

const contractAddress = "0xacb7ff1610f258aa2cffa9108b1ca44f01ad7da7"; // Replace with your contract address

export const useCharityChain = (signer) => {

  const [contract, setContract] = useState(null);
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (signer) {
        console.log('Signer:', signer);
      } else {
        console.error('Signer is not initialized');
      }
      
      if (CharityChain && CharityChain.abi) {
        console.log('ABI:', CharityChain.abi);
      } else {
        console.error('ABI is not defined');
      }
      
    if (signer) {
      const charityChainContract = new ethers.Contract(
        contractAddress,
        CharityChain.abi,
        signer
      );
      setContract(charityChainContract);
    }
    console.log('Signer:', signer);
    console.log('ABI:', CharityChain.abi);
  }, [signer]);
  
  const fetchCharities = async (contract) => {
    try {
      const activeCharities = await contract.listCharities();
      if (Array.isArray(activeCharities)) {
        setCharities(activeCharities);
      } else {
        console.error('Active charities data is not an array:', activeCharities);
      }
    } catch (error) {
      console.error('Error fetching charities:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const registerOrganization = async (name, registrationNo, country) => {
    try {
      if (!contract) return;
      const tx = await contract.registerOrganization(name, registrationNo, country);
      await tx.wait();
      console.log('Organization registered successfully');
    } catch (error) {
      console.error('Error registering organization:', error);
      throw error;
    }
  };

  const registerDonor = async (name, nationalID) => {
    try {
    if (!contract) {
        console.error('Contract is not initialized');
        return;
    }
      const tx = await contract.registerDonor(name, nationalID);
      await tx.wait();
      console.log("TX hash:",tx.hash);
      console.log('Donor registered successfully');
    } catch (error) {
      console.error('Error registering donor:', error);
      throw error;
    }
  };

  const createCharity = async (title, description, goalAmount, thresholdAmount, imageLink, recipients) => {
    try {
      if (!contract) return;
      const tx = await contract.createCharity(title, description, goalAmount, thresholdAmount, imageLink, recipients);
      await tx.wait();
      console.log('Charity created successfully');
      fetchCharities(contract); // Refresh the list of charities
    } catch (error) {
      console.error('Error creating charity:', error);
      throw error;
    }
  };

  const donateToCharity = async (charityId, amount) => {
    try {
      if (!contract) return;
      const tx = await contract.donateToCharity(charityId, ethers.utils.parseUnits(amount, 18)); // Assumes NPR token has 18 decimals
      await tx.wait();
      console.log('Donation successful');
    } catch (error) {
      console.error('Error donating to charity:', error);
      throw error;
    }
  };

  const distributeFunds = async (charityId) => {
    try {
      if (!contract) return;
      const tx = await contract.distributeFunds(charityId);
      await tx.wait();
      console.log('Funds distributed successfully');
    } catch (error) {
      console.error('Error distributing funds:', error);
      throw error;
    }
  };

  const closeCharity = async (charityId) => {
    try {
      if (!contract) return;
      const tx = await contract.closeCharity(charityId);
      await tx.wait();
      console.log('Charity closed successfully');
      fetchCharities(contract); // Refresh the list of charities
    } catch (error) {
      console.error('Error closing charity:', error);
      throw error;
    }
  };

  const isDonorRegistered = async (address) => {
    try {
      if (!contract) return false;
      const isRegistered = await contract.isDonorRegistered(address);
      return isRegistered;
    } catch (error) {
      console.error('Error checking if donor is registered:', error);
      return false;
    }
  };
  
  return {
    charities,
    loading,
    registerOrganization,
    registerDonor,
    createCharity,
    donateToCharity,
    distributeFunds,
    closeCharity,
    isDonorRegistered
  };
};
