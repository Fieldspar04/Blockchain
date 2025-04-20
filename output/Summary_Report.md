# 📘 Blockchain Summary Report
Last updated: 4/20/2025, 10:35:48 PM

- Total Blocks: 5
- Total Transactions: 4

---
## 🔗 Recent Transactions

### Block #0
- Hash: `0x26b9f5c90dcc0bd4eb0ed1cd49b8965c6dd963190f22f351d371c8a9e45b0867`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 0

### Block #1
- Hash: `0xfb78c7e53ba1ab9f70b8d1db3229f958e3c470ad5b4bfcaa75c6c54074ab8b5f`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `Unknown` by `0x041fe955fb1ea77580fbe0e5028d7dcd107457b2` → `Contract Creation` [0 ETH]

### Block #2
- Hash: `0x6f67feb86950ff20476dbef6e7a5a56e8602e263ea779516ac9dc75c1ba25e70`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `Unknown` by `0x041fe955fb1ea77580fbe0e5028d7dcd107457b2` → `Contract Creation` [0 ETH]

### Block #3
- Hash: `0x5769d3daf0b3372b58584c043cf0e2d963e3cd880d23e729f61e678a4945eefb`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `Unknown` by `0x041fe955fb1ea77580fbe0e5028d7dcd107457b2` → `Contract Creation` [0 ETH]

### Block #4
- Hash: `0x5040f065d951ce3138c218db76dcce27ba58e1e8e692213fb0fe782dae432287`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `Unknown` by `0x041fe955fb1ea77580fbe0e5028d7dcd107457b2` → `0xc1395cde15151d40af847db94d0fd3f542e1571b` [0 ETH]

---
## 🔐 Authority-based Access
This contract enforces Proof of Authority (PoA) via an `onlyAuthority` modifier. The authority is set as the deployer or assigned via `setAuthority()`. All sensitive actions like withdrawals, registry changes, and authority reassignment are restricted.

✅ Demonstrates:
- Access control logic
- Buyer/Seller interactions
- Value transfer logs
- PoA-enforced ownership decisions