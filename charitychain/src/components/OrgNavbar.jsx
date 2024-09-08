import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Navbar, Button, Input } from 'react-daisyui';
import Logo from "../assets/images/charitychain-logo.png";
import { useCharityChain } from '../utils/useCharityChain';

export default function OrgNavbar() {
  return (
    <div>
        <Navbar className='navbar secondary-bg'>
            <Navbar.Start className='navbar-start'>
                <img src={Logo} alt="" height={100} width={100}/>
                <h1 className="normal-case text-xl font-extrabold">Org Dashboard</h1>
            </Navbar.Start>
            <Navbar.Center className="hidden lg:flex navbar-center">
                <div className="flex-none">
                    <div className="mr-4">
                        <span className="font-bold">National Indigenous Disabled Women Asociation Nepal</span>
                    </div>
                    <div className="mr-4">
                        <span>0xbAD786F30511868e82D61a7eeB5c141A08432f7E</span>
                    </div>
                </div>
            </Navbar.Center>

            <Navbar.End className='navbar-end'>
                {location.pathname === '/organization-dashboard' ? (
                    <Link to="/charitypage" className="primary-btn">
                        Create Campaign
                    </Link>
                    ) : (
                    <Link to="/organization-dashboard" className="primary-btn">
                        Dashboard
                    </Link>
                )}
            </Navbar.End>
        </Navbar>
    </div>
  )
}
