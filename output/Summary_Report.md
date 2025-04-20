# 📘 Blockchain Summary Report
Last updated: 4/20/2025, 11:39:38 PM

- Total Blocks: 21
- Total Transactions: 20

---
## 🔗 Recent Transactions

### Block #16
- Hash: `0x14948bba64c30471159019a6ee0819628fb879ea2d939f03cb86ef3a07824f22`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `Deploy LandRegistry` by `0x0cf7798f81e0732f031fa01b703c55f2c7f9d5ef` → `Contract Creation` [undefined ETH]

### Block #17
- Hash: `0x134a8cd8d2f679b3e7d39a4a51c5da6867a46ff08345255ed204618f20f0ece8`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `setAuthority` by `0x0cf7798f81e0732f031fa01b703c55f2c7f9d5ef` → `0x8a905d29d336268fe89751861d3801e045eda32b` [undefined ETH]

### Block #18
- Hash: `0x9a871428298cdde539d838e3993ef55a249a513bc287ac8d391b6af5f09be8be`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `registerLand` by `0x770439e4e9d25a872bd486d33d491875b96e5fa0` → `0x8a905d29d336268fe89751861d3801e045eda32b` [undefined ETH]

### Block #19
- Hash: `0xd2814e1055c4c2954b961b281cad83d73952f8e32eac2ff7f1c2be88f5b736c2`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `registerLand` by `0x770439e4e9d25a872bd486d33d491875b96e5fa0` → `0x8a905d29d336268fe89751861d3801e045eda32b` [undefined ETH]

### Block #20
- Hash: `0xb881bf57cf46d0cfe40c4ee6a058ab9bc702b4133f4c0b3aa0eb593368e45a26`
- Miner: `0x0000000000000000000000000000000000000000`
- Transactions: 1
  - 📦 `buyLand` by `0x560de57d424c5ff43bf2366cefcad09e6a43017b` → `0x8a905d29d336268fe89751861d3801e045eda32b` [undefined ETH]

---
## 🔐 Authority-based Access
This contract enforces Proof of Authority (PoA) via an `onlyAuthority` modifier. The authority is set as the deployer or assigned via `setAuthority()`. All sensitive actions like withdrawals, registry changes, and authority reassignment are restricted.

✅ Demonstrates:
- Access control logic
- Buyer/Seller interactions
- Value transfer logs
- PoA-enforced ownership decisions