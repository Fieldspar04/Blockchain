// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LandTypes.sol";
import "./ParcelManager.sol";

contract TransferHandler is LandTypes {
    mapping(uint256 => HistoryEntry[]) public history;

    ParcelManager public parcelManager;

    constructor(address _managerAddress) {
        parcelManager = ParcelManager(_managerAddress);
    }

    event TransferRequested(uint256 parcelId, address from, address to);
    event OwnershipTransferred(
        uint256 parcelId,
        address oldOwner,
        address newOwner
    );

    function requestTransfer(uint256 _parcelId) public {
        LandParcel memory parcel = parcelManager.getParcelDetails(_parcelId);
        require(parcel.forSale, "Not for sale");
        require(msg.sender != parcel.owner, "You already own this parcel");

        parcel.buyer = msg.sender;
        emit TransferRequested(_parcelId, parcel.owner, msg.sender);
    }

    function approveTransfer(uint256 _parcelId) public {
        LandParcel memory parcel = parcelManager.getParcelDetails(_parcelId);
        require(msg.sender == parcel.owner, "Only owner can approve");

        history[_parcelId].push(HistoryEntry(parcel.owner, block.timestamp));
        parcel.owner = parcel.buyer;
        parcel.forSale = false;
        parcel.buyer = address(0);

        emit OwnershipTransferred(_parcelId, msg.sender, parcel.owner);
    }

    function getHistory(
        uint256 _parcelId
    ) public view returns (HistoryEntry[] memory) {
        return history[_parcelId];
    }
}
