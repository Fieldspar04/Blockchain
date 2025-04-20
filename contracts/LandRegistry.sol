// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LandRegistry {
    address public landRegistryAuthority;
    uint public landCounter = 0;
    uint public contractBalance;

    constructor() payable {
        landRegistryAuthority = msg.sender;
        contractBalance = msg.value;
    }

    modifier onlyAuthority() {
        require(
            msg.sender == landRegistryAuthority,
            "Only the land registry authority can perform this action"
        );
        _;
    }

    struct Land {
        uint id;
        address owner;
        string plotNumber;
        string location;
        string city;
        string state;
        uint price;
        bool forSale;
    }

    mapping(uint => Land) public lands;

    event LandRegistered(uint indexed id, address indexed owner);
    event LandPurchased(uint indexed id, address indexed oldOwner, address indexed newOwner, uint price);
    event AuthorityChanged(address indexed newAuthority);
    event Withdrawal(address indexed to, uint amount);

    function setAuthority(address _newAuthority) public onlyAuthority {
        require(_newAuthority != address(0), "Invalid address");
        landRegistryAuthority = _newAuthority;
        emit AuthorityChanged(_newAuthority);
    }

    function registerLand(
        string memory _plotNumber,
        string memory _location,
        string memory _city,
        string memory _state,
        uint _price
    ) public {
        require(_price > 0, "Price must be greater than 0");
        landCounter++;
        lands[landCounter] = Land(
            landCounter,
            msg.sender,
            _plotNumber,
            _location,
            _city,
            _state,
            _price,
            true
        );
        emit LandRegistered(landCounter, msg.sender);
    }

    function getAvailableLands() public view returns (Land[] memory) {
        uint availableCount = 0;
        for (uint i = 1; i <= landCounter; i++) {
            if (lands[i].forSale) availableCount++;
        }

        Land[] memory availableLands = new Land[](availableCount);
        uint index = 0;
        for (uint i = 1; i <= landCounter; i++) {
            if (lands[i].forSale) {
                availableLands[index] = lands[i];
                index++;
            }
        }
        return availableLands;
    }

    function buyLand(uint _id) public payable {
        require(_id > 0 && _id <= landCounter, "Invalid land ID");

        Land storage land = lands[_id];
        require(land.forSale, "Land not for sale");
        require(msg.value >= land.price, "Insufficient payment");
        require(msg.sender != land.owner, "Owner cannot buy their own land");

        address payable seller = payable(land.owner);
        seller.transfer(msg.value);

        land.owner = msg.sender;
        land.forSale = false;

        emit LandPurchased(_id, seller, msg.sender, msg.value);
    }

    function getLandById(
        uint _id
    ) public view returns (
        uint,
        address,
        string memory,
        string memory,
        string memory,
        string memory,
        uint,
        bool
    ) {
        require(_id > 0 && _id <= landCounter, "Invalid land ID");
        Land memory land = lands[_id];
        return (
            land.id,
            land.owner,
            land.plotNumber,
            land.location,
            land.city,
            land.state,
            land.price,
            land.forSale
        );
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function withdraw(uint _amount) public onlyAuthority {
        require(_amount <= address(this).balance, "Not enough balance");
        payable(landRegistryAuthority).transfer(_amount);
        emit Withdrawal(landRegistryAuthority, _amount);
    }

    receive() external payable {
        contractBalance += msg.value;
    }
} 
