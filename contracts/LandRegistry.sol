// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LandRegistry {
    address public landRegistryAuthority;
    uint public landCounter = 0;
    uint public contractBalance; // 💰 Track balance inside contract

    constructor() payable {
        landRegistryAuthority = msg.sender;
        contractBalance = msg.value; // 💸 Store ETH received during deployment
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
        string location;
        uint price;
        bool forSale;
    }

    mapping(uint => Land) public lands;

    event LandRegistered(uint indexed id, address indexed owner);
    event LandPurchased(
        uint indexed id,
        address indexed oldOwner,
        address indexed newOwner,
        uint price
    );
    event AuthorityChanged(address indexed newAuthority);
    event Withdrawal(address indexed to, uint amount);

    function setAuthority(address _newAuthority) public onlyAuthority {
        require(_newAuthority != address(0), "Invalid address");
        landRegistryAuthority = _newAuthority;
        emit AuthorityChanged(_newAuthority);
    }

    function registerLand(string memory _location, uint _price) public {
        require(_price > 0, "Price must be greater than 0");
        landCounter++;
        lands[landCounter] = Land(
            landCounter,
            msg.sender,
            _location,
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
    ) public view returns (uint, address, string memory, uint, bool) {
        Land memory land = lands[_id];
        return (land.id, land.owner, land.location, land.price, land.forSale);
    }

    // 🔍 View current ETH balance of contract
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    // 🔓 Only authority can withdraw ETH
    function withdraw(uint _amount) public onlyAuthority {
        require(_amount <= address(this).balance, "Not enough balance");
        payable(landRegistryAuthority).transfer(_amount);
        emit Withdrawal(landRegistryAuthority, _amount);
    }

    // ⛔️ Receive additional ETH
    receive() external payable {
        contractBalance += msg.value;
    }
}
