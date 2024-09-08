import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { Navbar, Button, Input } from 'react-daisyui';
import Logo from "../assets/images/charitychain-logo.png";
import { useCharityChain } from '../utils/useCharityChain';

export default function DonorNavbar() {
  return (
    <div>
        <Navbar className='navbar secondary-bg'>
            <Navbar.Start className='navbar-start'>
                <img src={Logo} alt="" height={100} width={100}/>
                <h1 className="normal-case text-xl font-extrabold">Donor Dashboard</h1>
            </Navbar.Start>
            <Navbar.Center className="hidden lg:flex navbar-center">
                <div className="flex-none">
                    <div className="mr-4">
                        <span className="font-bold">Anish Basnet</span>
                    </div>
                    <div className="mr-4">
                        <span>0x7E58C8394B7831Db80cac75B80F0502558930cA8</span>
                    </div>
                </div>
            </Navbar.Center>

            <Navbar.End className='navbar-end'>
                {location.pathname === '/donorpage' ? (
                    <Link to="/donationhistory" className="primary-btn">
                        My History
                    </Link>
                    ) : (
                    <Link to="/donorpage" className="primary-btn">
                        Dashboard
                    </Link>
                )}
            </Navbar.End>
        </Navbar>
    </div>
  )
}
