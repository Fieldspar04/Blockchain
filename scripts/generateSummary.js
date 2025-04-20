// scripts/generateSummary.js — Viva-friendly Markdown generator

const fs = require("fs");
const path = require("path");
const blockchainData = require("../output/blockchain.json");

function generateMarkdown(blocks) {
    const summary = [];
    summary.push(`# 📘 Blockchain Summary Report`);
    summary.push(`Last updated: ${new Date().toLocaleString()}`);

    const totalTx = blocks.reduce((acc, block) => acc + block.txCount, 0);
    summary.push(`\n- Total Blocks: ${blocks.length}`);
    summary.push(`- Total Transactions: ${totalTx}`);

    summary.push(`\n---\n## 🔗 Recent Transactions`);

    for (const block of blocks.slice(-5)) {
        summary.push(`\n### Block #${block.number}`);
        summary.push(`- Hash: \`${block.hash}\``);
        summary.push(`- Miner: \`${block.miner}\``);
        summary.push(`- Transactions: ${block.txCount}`);

        for (const tx of block.transactions) {
            summary.push(`  - 📦 \`${tx.method}\` by \`${tx.from}\` → \`${tx.to || "Contract Creation"}\` [${tx.valueETH} ETH]`);
        }
    }

    summary.push(`\n---\n## 🔐 Authority-based Access`);
    summary.push(`This contract enforces Proof of Authority (PoA) via an \`onlyAuthority\` modifier. The authority is set as the deployer or assigned via \`setAuthority()\`. All sensitive actions like withdrawals, registry changes, and authority reassignment are restricted.`);

    summary.push(`\n✅ Demonstrates:
- Access control logic
- Buyer/Seller interactions
- Value transfer logs
- PoA-enforced ownership decisions`);

    return summary.join("\n");
}

const mdOutput = generateMarkdown(blockchainData);
const outputPath = path.join(__dirname, "../output/Summary_Report.md");
fs.writeFileSync(outputPath, mdOutput);
console.log("📘 Markdown summary exported to output/Summary_Report.md");
