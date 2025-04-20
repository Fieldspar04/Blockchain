// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./Stakeholders.sol";
import "./ProofOfAuthority.sol";

contract LandRegistry is Stakeholders {
    struct Land {
        uint id;
        address owner;
        string location;
        uint price;
        bool forSale;
    }

    uint public landCount;
    mapping(uint => Land) public lands;

    event LandListed(
        uint id,
        address indexed owner,
        string location,
        uint price
    );
    event LandSold(
        uint id,
        address indexed buyer,
        address indexed seller,
        uint price
    );

    modifier onlyOwner(uint _landId) {
        require(lands[_landId].owner == msg.sender, "Not land owner");
        _;
    }

    function listLand(
        string memory _location,
        uint _price
    ) external onlySeller {
        landCount++;
        lands[landCount] = Land(landCount, msg.sender, _location, _price, true);
        emit LandListed(landCount, msg.sender, _location, _price);
    }

    function buyLand(uint _landId) external payable onlyBuyer {
        Land storage land = lands[_landId];
        require(land.forSale, "Not for sale");
        require(msg.value == land.price, "Incorrect price");

        address payable seller = payable(land.owner);
        land.owner = msg.sender;
        land.forSale = false;

        seller.transfer(msg.value);
        emit LandSold(_landId, msg.sender, seller, msg.value);
    }

    function getLand(uint _id) external view returns (Land memory) {
        return lands[_id];
    }
}
