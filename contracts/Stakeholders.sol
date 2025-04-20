// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract Stakeholders {
    mapping(address => bool) public government;
    mapping(address => bool) public buyers;
    mapping(address => bool) public sellers;

    modifier onlyGovernment() {
        require(government[msg.sender], "Not government");
        _;
    }

    modifier onlyBuyer() {
        require(buyers[msg.sender], "Not buyer");
        _;
    }

    modifier onlySeller() {
        require(sellers[msg.sender], "Not seller");
        _;
    }

    constructor() {
        government[msg.sender] = true;
    }

    function assignBuyer(address _addr) external onlyGovernment {
        buyers[_addr] = true;
    }

    function assignSeller(address _addr) external onlyGovernment {
        sellers[_addr] = true;
    }

    function isBuyer(address _addr) external view returns (bool) {
        return buyers[_addr];
    }

    function isSeller(address _addr) external view returns (bool) {
        return sellers[_addr];
    }
}
