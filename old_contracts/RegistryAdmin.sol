// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegistryAdmin {
    address public systemAdmin;

    mapping(address => bool) public verifiedUsers;

    event VerifierAdded(address user);
    event VerifierRevoked(address user);

    constructor() {
        systemAdmin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == systemAdmin, "Not system admin");
        _;
    }

    function addVerifier(address _user) external onlyAdmin {
        verifiedUsers[_user] = true;
        emit VerifierAdded(_user);
    }

    function revokeVerifier(address _user) external onlyAdmin {
        verifiedUsers[_user] = false;
        emit VerifierRevoked(_user);
    }

    function isVerifier(address _user) public view returns (bool) {
        return verifiedUsers[_user];
    }
}
