// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProofOfAuthority {
    address public authority;

    constructor() {
        authority = msg.sender;
    }

    modifier onlyAuthority() {
        require(msg.sender == authority, "Not authorized");
        _;
    }

    function transferAuthority(address newAuthority) external onlyAuthority {
        authority = newAuthority;
    }

    function isAuthority(address addr) external view returns (bool) {
        return addr == authority;
    }
}

// pragma solidity ^0.8.21;

// contract ProofOfAuthority {
//     mapping(address => bool) public validators;

//     event ValidatorAdded(address validator);
//     event ValidatorRemoved(address validator);

//     modifier onlyValidator() {
//         require(validators[msg.sender], "Not a validator");
//         _;
//     }

//     constructor() {
//         validators[msg.sender] = true;
//     }

//     function addValidator(address _validator) external onlyValidator {
//         validators[_validator] = true;
//         emit ValidatorAdded(_validator);
//     }

//     function removeValidator(address _validator) external onlyValidator {
//         validators[_validator] = false;
//         emit ValidatorRemoved(_validator);
//     }

//     function isValidator(address _addr) external view returns (bool) {
//         return validators[_addr];
//     }
// }
