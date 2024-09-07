// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CharityChain {
    IERC20 public nepaliRupeeToken; // NPR token

    struct Organization {
        string name;
        string registrationNo;
        string country;
        address orgAddress;
    }

    struct Recipient {
        address addr;
        string name;
    }

    struct Charity {
        string title;
        string description;
        uint256 goalAmount;
        uint256 thresholdAmount;
        string imageLink; // Link to charity overview image
        Recipient[] recipients; // Updated to use Recipient struct
        uint256 totalCollected;
        bool isActive;
    }

    struct Donor {
        string name;
        address walletAddress;
        string nationalID;
        bool isRegistered;
    }

    // Mapping for registered organizations
    mapping(address => Organization) public organizations;

    // Mapping for registered donors
    mapping(address => Donor) public donors;

    // Mapping for charity campaigns
    mapping(uint256 => Charity) public charities;
    uint256 public charityCount;

    event OrganizationRegistered(address indexed orgAddress, string name);
    event DonorRegistered(address indexed donorAddress, string name);
    event CharityCreated(uint256 charityId, string title, uint256 goalAmount);
    event DonationReceived(uint256 charityId, address indexed donor, uint256 amount);
    event FundsDistributed(uint256 charityId, uint256 amount);

    constructor(address _nepaliRupeeToken) {
        nepaliRupeeToken = IERC20(_nepaliRupeeToken);
    }

    // Register an organization
    function registerOrganization(
        string memory _name,
        string memory _registrationNo,
        string memory _country
    ) external {
        require(bytes(organizations[msg.sender].name).length == 0, "Organization already registered");

        organizations[msg.sender] = Organization({
            name: _name,
            registrationNo: _registrationNo,
            country: _country,
            orgAddress: msg.sender
        });

        emit OrganizationRegistered(msg.sender, _name);
    }

    // Register a donor
    function registerDonor(
        string memory _name,
        string memory _nationalID
    ) external {
        require(!donors[msg.sender].isRegistered, "Donor already registered");

        donors[msg.sender] = Donor({
            name: _name,
            walletAddress: msg.sender,
            nationalID: _nationalID,
            isRegistered: true
        });

        emit DonorRegistered(msg.sender, _name);
    }

    // Create a new charity campaign
    function createCharity(
        string memory _title,
        string memory _description,
        uint256 _goalAmount,
        uint256 _thresholdAmount,
        string memory _imageLink,
        Recipient[] memory _recipients // Updated to use Recipient struct
    ) external {
        require(bytes(organizations[msg.sender].name).length > 0, "Not a registered organization");
        require(_goalAmount > 0, "Goal amount must be greater than 0");
        require(_recipients.length > 0, "Must provide at least one recipient");

        charityCount++;
        Charity storage newCharity = charities[charityCount];
        newCharity.title = _title;
        newCharity.description = _description;
        newCharity.goalAmount = _goalAmount;
        newCharity.thresholdAmount = _thresholdAmount;
        newCharity.imageLink = _imageLink;
        newCharity.totalCollected = 0;
        newCharity.isActive = true;

        // Manually copy recipients from memory to storage
        for (uint256 i = 0; i < _recipients.length; i++) {
            newCharity.recipients.push(_recipients[i]);
        }

        emit CharityCreated(charityCount, _title, _goalAmount);
    }

    // Donate to a charity
    function donateToCharity(uint256 _charityId, uint256 _amount) external {
        Charity storage charity = charities[_charityId];
        require(charity.isActive, "Charity campaign is not active");
        require(_amount > 0, "Donation amount must be greater than 0");
        require(donors[msg.sender].isRegistered, "Donor not registered");

        // Check if the user has approved the contract to spend their tokens
        require(nepaliRupeeToken.allowance(msg.sender, address(this)) >= _amount, "Insufficient allowance");

        nepaliRupeeToken.transferFrom(msg.sender, address(this), _amount);
        charity.totalCollected += _amount;

        emit DonationReceived(_charityId, msg.sender, _amount);
    }

    // Function to allow organizations to distribute funds
    function distributeFunds(uint256 _charityId) external {
        Charity storage charity = charities[_charityId];
        require(bytes(organizations[msg.sender].name).length > 0, "Not a registered organization");
        require(charity.isActive, "Charity is not active");
        require(charity.totalCollected >= charity.thresholdAmount, "Threshold not reached yet");

        uint256 amountPerRecipient = charity.totalCollected / charity.recipients.length;
        for (uint256 i = 0; i < charity.recipients.length; i++) {
            nepaliRupeeToken.transfer(charity.recipients[i].addr, amountPerRecipient);
        }

        charity.totalCollected = 0;
        emit FundsDistributed(_charityId, charity.totalCollected);
    }

    // Function to allow organizations to close a charity campaign
    function closeCharity(uint256 _charityId) external {
        Charity storage charity = charities[_charityId];
        require(bytes(organizations[msg.sender].name).length > 0, "Not a registered organization");
        require(charity.isActive, "Charity is already closed");

        charity.isActive = false;
    }

    // Check contract's balance of NepaliRupeeToken
    function checkTokenBalance() external view returns (uint256) {
        return nepaliRupeeToken.balanceOf(address(this));
    }

    // List all active charities
    function listCharities() external view returns (Charity[] memory) {
        Charity[] memory activeCharities = new Charity[](charityCount);
        uint256 index = 0;

        for (uint256 i = 1; i <= charityCount; i++) {
            if (charities[i].isActive) {
                activeCharities[index] = charities[i];
                index++;
            }
        }

        return activeCharities;
    }

    // Check if a donor is registered
    function isDonorRegistered(address _donor) external view returns (bool) {
        return donors[_donor].isRegistered;
    }

    // Get details of a specific charity by ID
    function getCharity(uint256 _charityId) external view returns (
        string memory title,
        string memory description,
        uint256 goalAmount,
        uint256 thresholdAmount,
        string memory imageLink,
        Recipient[] memory recipients,
        uint256 totalCollected,
        bool isActive
    ) {
        Charity storage charity = charities[_charityId];
        return (
            charity.title,
            charity.description,
            charity.goalAmount,
            charity.thresholdAmount,
            charity.imageLink,
            charity.recipients,
            charity.totalCollected,
            charity.isActive
        );
    }
}
