import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        try {
          const providerInstance = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(providerInstance);

          // Optionally set an account if already connected
          const accounts = await providerInstance.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            setSigner(providerInstance.getSigner());
          }

          // Listen for account and network changes
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setAccount(accounts[0]);
              setSigner(providerInstance.getSigner());
            } else {
              setAccount(null); // No accounts available
            }
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload(); // Optionally reload on network change
          });
        } catch (error) {
          console.error("Error initializing provider:", error);
        }
      } else {
        console.log("No Ethereum provider found. Install MetaMask.");
      }
    };
    initProvider();
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        setSigner(provider.getSigner());
      } catch (error) {
        console.error("Error connecting wallet", error);
      }
    } else {
      console.log("MetaMask not installed or provider is null");
    }
  };

  return (
    <Web3Context.Provider value={{ provider, signer, account, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);