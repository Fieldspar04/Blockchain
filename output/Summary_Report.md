# 📘 Blockchain Summary Report
Last updated: 4/23/2025, 4:44:14 PM

- Total Blocks: 15
- Total Transactions: 14

---
## 🔗 Recent Transactions

### Block #10
- Hash: `0xcdff06ff244381bde37935c2dfe9df48e4ad7ed411d484ad1ad010633b8aba81`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `registerLand` by `0x60e5451fd178fe4e829da44d5798d62c45cabaf3` → `0xa885aa97eb5a4c95d74d389f6bd33c49580d3a6c` [undefined ETH]

### Block #11
- Hash: `0xbd5e55b2b25bc2ab54c5565d6a88cc30e5a753e6500276f5e7b5dde0f7076e19`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `Deploy LandRegistry` by `0x5f39dcaed2ddcfe37633edf88b52feaaf2dd0be1` → `Contract Creation` [undefined ETH]

### Block #12
- Hash: `0x8dcd9059cbba62ec83059072b7771355058b66bb8c599cd8755440c7c0d8cd93`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `registerLand` by `0x60e5451fd178fe4e829da44d5798d62c45cabaf3` → `0xa885aa97eb5a4c95d74d389f6bd33c49580d3a6c` [undefined ETH]

### Block #13
- Hash: `0xcbc011f317e3f1c30c77baa7f549f1acc3513b37581aacc1607a3e0a63201752`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `registerLand` by `0x60e5451fd178fe4e829da44d5798d62c45cabaf3` → `0xa885aa97eb5a4c95d74d389f6bd33c49580d3a6c` [undefined ETH]

### Block #14
- Hash: `0x1f0c778d6eb3eff3d65059aafaa63c88c0ddad9a4cfbc65034464fe65e6de73a`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `buyLand` by `0x58a96174d2c4e32f14a41906e97807c193951809` → `0xa885aa97eb5a4c95d74d389f6bd33c49580d3a6c` [undefined ETH]

---
## 🔐 Authority-based Access
This contract enforces Proof of Authority (PoA) via an `onlyAuthority` modifier. The authority is set as the deployer or assigned via `setAuthority()`. All sensitive actions like withdrawals, registry changes, and authority reassignment are restricted.

✅ Demonstrates:
- Access control logic
- Buyer/Seller interactions
- Value transfer logs
- PoA-enforced ownership decisions