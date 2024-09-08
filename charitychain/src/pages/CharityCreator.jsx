import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../utils/Web3Provider';
import { useCharityChain } from '../utils/useCharityChain';
import { Button, Input, Alert } from 'react-daisyui';
import CountrySelector from '../components/CountrySelector';
import OrgNavbar from '../components/OrgNavbar';

function CharityCreator() {
  const { account, signer } = useWeb3();
  const { registerOrganization, createCharity, isOrganizationRegistered } = useCharityChain(signer);
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [country, setCountry] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [thresholdAmount, setThresholdAmount] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        if (account) {
          // Check if the organization is already registered
          const registered = await isOrganizationRegistered(account);
          setIsRegistered(registered);
        }
      } catch (error) {
        setError('Error checking registration status');
        console.error('Error checking registration:', error);
      }
    };

    checkRegistration();
  }, [account, isOrganizationRegistered]);

  const handleRegisterOrganization = async () => {
    try {
      setIsLoading(true);
      await registerOrganization(name, registrationNo, country);
      setIsRegistered(true);
      setSuccess('Organization registered successfully');
    } catch (error) {
      setError('Error registering organization');
      console.error('Error registering organization:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCharity = async () => {
    try {
      setIsLoading(true);
      await createCharity(title, description, goalAmount, thresholdAmount, imageLink, recipients);
      setSuccess('Charity created successfully');
      navigate('/organization-dashboard'); 
    } catch (error) {
      setError('Error creating charity');
      console.error('Error creating charity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addRecipient = () => {
    if (recipientName && recipientAddress) {
      // Add recipient in tuple format
      setRecipients([...recipients, { name: recipientName, addr: recipientAddress }]);
      setRecipientName('');
      setRecipientAddress('');
    } else {
      setError('Recipient name and address are required');
    }
  };

  const removeRecipient = (index) => {
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <Alert color="error">{error}</Alert>}
      {success && <Alert color="success">{success}</Alert>}
      {!isRegistered ? (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="card w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center secondary-text">Register as Organization</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Organization Name</span>
              </label>
              <Input
                placeholder="Organization Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Registration Number</span>
              </label>
              <Input
                placeholder="Registration Number"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                className="mb-4"
              />
            </div>
            <div className="form-control">
              <CountrySelector
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          <Button className='primary-btn' onClick={handleRegisterOrganization}>
            Register
          </Button>
          </div>
          </div>
        </div>
      ) : (
          <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <OrgNavbar></OrgNavbar>
        <div className="flex justify-center bg-gray-100 my-4">
          <div className="card w-full max-w-4xl shadow-2xl bg-base-100">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center secondary-text mb-8">Create a New Charity</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Campaign Title/Cause</span>
                  </label>
                  <Input
                    placeholder="Cause/Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Campaign Description</span>
                  </label>
                  <Input
                    placeholder="Campaign Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Goal Amount</span>
                  </label>
                  <Input
                    placeholder="Goal Amount"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Threshold Amount</span>
                  </label>
                  <Input
                    placeholder="Threshold Amount"
                    value={thresholdAmount}
                    onChange={(e) => setThresholdAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Image Link</span>
                </label>
                <Input
                  placeholder="Image Link"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Recipient Name</span>
                  </label>
                  <Input
                    placeholder="Recipient Name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Recipient Address</span>
                  </label>
                  <Input
                    placeholder="Recipient Address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                  />
                </div>
              </div>

              <Button className="mt-4 secondary-btn" onClick={addRecipient}>
                Add Recipient
              </Button>

              {/* Display Recipients */}
              <div className="mt-4">
                <h3 className="text-lg font-bold">Recipient List:</h3>
                <ul className="list-disc ml-6 mt-2">
                  {recipients.map((recipient, index) => (
                    <li key={index} className="mb-2 flex justify-between">
                      <div>
                        <span className="font-semibold">{recipient.name}:</span> {recipient.addr}
                      </div>
                      <Button className="btn btn-sm btn-danger" size="sm" onClick={() => removeRecipient(index)}>
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="primary-btn mt-6" onClick={handleCreateCharity}>
                Create Charity
              </Button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default CharityCreator;