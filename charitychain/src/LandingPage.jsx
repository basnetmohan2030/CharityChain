
import React from 'react';
import { Navbar, Button, Hero, Card, Footer } from 'react-daisyui';
import Logo from './assets/images/charitychain-logo2.png';
import LogoHero from './assets/images/charitychain-logo.png';
import React, { useState, useEffect } from 'react';
import { Navbar, Button, Hero, Card, Footer, Modal } from 'react-daisyui';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from './utils/Web3Provider';

const LandingPage = () => {
  const { account, connectWallet } = useWeb3();
  const [address, setAddress] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      console.log("Current Account:", account);
      setAddress(account);
      setIsModalOpen(true); 
    }
  }, [account]);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error during wallet connection', error);
    }
  };

  const handleRoleSelection = (role) => {
    setIsModalOpen(false); // Close the modal after selection
    console.log(`User selected role: ${role}`);
    if (role === 'donor') {
      navigate('/donorpage'); // Navigate to Donor Dashboard
    } else if (role === 'charity') {
      navigate('/charitypage'); // Navigate to Charity Creator
    }
  };


  return (
    <div>
      {/* Navbar */}
      <Navbar className='navbar'>
        <Navbar.Start className='navbar-start'>
            <img src={Logo} alt="" height={100} width={100}/>
          <Button className="normal-case text-xl font-extrabold">CharityChain</Button>
        </Navbar.Start>
        <Navbar.Center className="hidden lg:flex navbar-center">
          <ul className="menu menu-horizontal px-1 font-semibold">
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </Navbar.Center>
        <Navbar.End className='navbar-end'>
          <Button className="primary-btn">Sign Up</Button>
        <Navbar.End>
          <Button color="primary" className="rounded-full" onClick={handleConnectWallet}>Sign Up</Button>
        </Navbar.End>
      </Navbar>


      {/* Modal for Role Selection */}
      <Modal open={isModalOpen} onClickBackdrop={() => setIsModalOpen(false)}>
        <Modal.Header className="font-bold">Choose Your Role</Modal.Header>
        <Modal.Body>
          <p className="text-lg mb-4">Please select whether you want to be a donor or a charity/campaign creator.</p>
          <div className="flex justify-center gap-4">
            <Button color="primary" onClick={() => handleRoleSelection('donor')}>
              Donor
            </Button>
            <Button color="secondary" onClick={() => handleRoleSelection('charity')}>
              Charity/Campaign Creator
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Hero Section */}
      <Hero className="min-h-screen bg-base-200">
        <Hero.Content className="text-center">
          <div className="max-w-lg mx-auto">
            <img src={LogoHero} alt="Hero Image" width={400} height={400} className='mx-auto'/>
            <h1 className="text-5xl font-bold">Welcome to CharityChain</h1>
            <p className="py-6">
              Empowering transparency in charity through blockchain technology. Ensure your donations are secure, transparent, and impactful.
            </p>
            <Button className='primary-btn'>Get Started</Button>
          </div>
        </Hero.Content>
      </Hero>

      {/* About Section */}
      <section className="p-10 bg-white" id="about">
        <h2 className="text-3xl font-bold text-center">About CharityChain</h2>
        <p className="py-6 text-center max-w-3xl mx-auto">
          CharityChain is a blockchain-based crowdfunding platform that ensures transparency and accountability in charitable donations. By leveraging the power of blockchain, we provide a secure and traceable donation process.
        </p>
      </section>

      {/* Features Section */}
      <section className="p-10 secondary-bg" id="features">
        <h2 className="text-3xl font-bold text-center">Features</h2>
        <div className="flex justify-center py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">
            <Card className="bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold">Transparency</h3>
              <p>All transactions are recorded on the blockchain, ensuring every donation is traceable and secure.</p>
            </Card>
            <Card className="bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold">Smart Contracts</h3>
              <p>Funds are distributed through smart contracts, ensuring they are used for the intended purpose.</p>
            </Card>
            <Card className="bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold">Global Access</h3>
              <p>Donors from anywhere in the world can participate without geographic restrictions or intermediaries.</p>
            </Card>
          </div>
        </div>
      </section>

    {/* How it works Section */}
      <section className="p-10 bg-white" id="how-it-works">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="flex justify-center py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl">
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold">1. Sign Up</h3>
              <p>Create an account as a donor or a charity organization.</p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold">2. Create a Campaign</h3>
              <p>Organizations create verified charity campaigns with specific goals.</p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold">3. Donate Securely</h3>
              <p>Donors browse campaigns and contribute directly through the blockchain.</p>
            </div>
            <div className="card bg-base-100 shadow-lg p-6">
              <h3 className="text-xl font-semibold">4. Track Your Donations</h3>
              <p>Donors can track their contributions in real-time using our secure dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="p-10 secondary-bg text-white" id="cta">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Join CharityChain Today</h2>
          <p className="py-6">Be a part of the future of transparent giving. Start making a difference now!</p>
          <Button className='primary-btn'>Sign Up Now</Button>
        </div>
      </section>

      {/* Footer */}
      <Footer className="p-10 bg-base-200 text-base-content">
        <div>
          <p>&copy; 2024 CharityChain. All rights reserved.</p>
        </div>
      </Footer>
    </div>
  );
};

export default LandingPage;
