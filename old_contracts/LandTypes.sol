// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract LandTypes {
    struct LandParcel {
        uint256 id;
        string location;
        string city;
        uint256 area;
        address owner;
        bool forSale;
        address buyer;
    }

    struct HistoryEntry {
        address previousOwner;
        uint256 transferDate;
    }
}
