// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LandTypes.sol";

contract ParcelManager is LandTypes {
    uint256 public totalParcels = 0;

    mapping(uint256 => LandParcel) public parcels;
    mapping(address => uint256[]) public ownedParcels;

    event ParcelRegistered(uint256 parcelId, address indexed by);

    function registerParcel(
        string memory _location,
        string memory _city,
        uint256 _area
    ) public {
        totalParcels++;
        parcels[totalParcels] = LandParcel(
            totalParcels,
            _location,
            _city,
            _area,
            msg.sender,
            false,
            address(0)
        );
        ownedParcels[msg.sender].push(totalParcels);
        emit ParcelRegistered(totalParcels, msg.sender);
    }

    function listMyParcels() public view returns (uint256[] memory) {
        return ownedParcels[msg.sender];
    }

    function getParcelDetails(
        uint256 _id
    ) public view returns (LandParcel memory) {
        return parcels[_id];
    }
}
