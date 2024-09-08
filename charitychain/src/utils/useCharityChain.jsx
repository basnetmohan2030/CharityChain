import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CharityChain from '../abis/CharityChain.json';

const contractAddress = "0xa1007Fc17f7f00c9CD54387F287d83aCf1E063dB"; // Replace with your contract address

export const useCharityChain = (signer) => {
  const [contract, setContract] = useState(null);
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (signer) {
      const charityChainContract = new ethers.Contract(
        contractAddress,
        CharityChain.abi,
        signer
      );
      setContract(charityChainContract);
    }
  }, [signer]);

  const fetchCharities = async (contract) => {
    /* if (!contract) {
        console.error('Contract is not initialized.');
        return;
    } */
    try {
      const activeCharities = await contract.listCharities();
      if (Array.isArray(activeCharities)) {
        setCharities(activeCharities);
        console.log(charities);
      } else {
        console.error('Active charities data is not an array:', activeCharities);
      }
    } catch (error) {
      console.error('Error fetching charities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) {
      fetchCharities(contract);
    }
  }, [contract]);

  const registerOrganization = async (name, registrationNo, country) => {
    try {
      if (!contract) return;
      const tx = await contract.registerOrganization(name, registrationNo, country);
      await tx.wait();
      console.log('Organization registered successfully',tx.hash);
    } catch (error) {
      console.error('Error registering organization:', error);
      throw error;
    }
  };

  const registerDonor = async (name, nationalID) => {
    try {
      if (!contract) return;
      const tx = await contract.registerDonor(name, nationalID);
      await tx.wait();      
      console.log('Donor registered successfully',tx.hash);
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

  const isOrganizationRegistered = async (address) => {
    try {
      if (!contract) return false;
      const isRegistered = await contract.isOrganizationRegistered(address);
      return isRegistered;
    } catch (error) {
      console.error('Error checking if donor is registered:', error);
      return false;
    }
  };

  const getDonorDetails = async (address) => {
    try {
      if (!contract) return null;
      const donorDetails = await contract.getDonorDetails(address);
      return {
        name: donorDetails[0],
        walletAddress: donorDetails[1],
      };
    } catch (error) {
      console.error('Error fetching donor details:', error);
      return null;
    }
  };

  const getCharityDetails = async (charityId) => {
    try {
      if (!contract) return null;
      const charity = await contract.getCharity(charityId);
      return {
        title: charity[0],
        description: charity[1],
        goalAmount: charity[2],
        thresholdAmount: charity[3],
        imageLink: charity[4],
        recipients: charity[5],
        totalCollected: charity[6],
        isActive: charity[7],
      };
    } catch (error) {
      console.error('Error fetching charity details:', error);
      return null;
    }
  };
  
  
  return {
    charities,
    loading,
    registerOrganization,
    fetchCharities,
    registerDonor,
    createCharity,
    donateToCharity,
    distributeFunds,
    closeCharity,
    isDonorRegistered,
    isOrganizationRegistered,
    getDonorDetails,
    getCharityDetails
  };
};