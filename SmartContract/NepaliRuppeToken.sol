// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NepaliRupeeToken is ERC20, Ownable {
    uint256 public faucetAmount = 1000 * 10**18; // 1000 NPR tokens

    mapping(address => bool) public claimed;

    event TokensClaimed(address indexed user, uint256 amount);
    event FaucetAmountUpdated(uint256 newFaucetAmount);

    // Constructor to initialize the token with a name, symbol, initial supply, and ownership
    constructor(uint256 initialSupply) ERC20("NepaliRupeeToken", "NPR") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10**18); // Mint the initial supply to the contract owner
    }

    // Function to allow users to claim tokens from the faucet
    function claimTokens() external {
        require(!claimed[msg.sender], "Tokens already claimed");

        claimed[msg.sender] = true;
        _transfer(owner(), msg.sender, faucetAmount); // Transfer tokens from the owner's balance

        emit TokensClaimed(msg.sender, faucetAmount);
    }

    // Function to allow the owner to set the faucet amount
    function setFaucetAmount(uint256 _newAmount) external onlyOwner {
        faucetAmount = _newAmount;
        emit FaucetAmountUpdated(_newAmount);
    }
}
