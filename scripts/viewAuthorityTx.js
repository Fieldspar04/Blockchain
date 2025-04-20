const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const blockchainPath = path.join(__dirname, "../output/blockchain.json");

// 💼 Replace this with your actual authority address
const authorityAddress = "0x770439E4E9d25A872BD486D33d491875B96E5fa0".toLowerCase();

function viewAuthorityTransactions() {
    if (!fs.existsSync(blockchainPath)) {
        console.log("❌ No blockchain.json found. Run `blockchainViewer.js` first.");
        return;
    }

    const blocks = JSON.parse(fs.readFileSync(blockchainPath, "utf8"));
    let count = 0;

    console.log(chalk.bold(`\n🔐 Authority Transactions in Blockchain:\n`));

    for (const block of blocks) {
        for (const tx of block.transactions) {
            if (tx.from.toLowerCase() === authorityAddress) {
                count++;
                console.log(chalk.yellow(`📦 Block #${block.number} | Tx Hash: ${tx.hash}`));
                console.log(`   📤 From: ${tx.from}`);
                console.log(`   📥 To: ${tx.to || "[Contract Creation]"}`);
                console.log(`   💰 Value: ${tx.value} ETH`);
                console.log(`   🔧 Method: ${tx.function || "Unknown"}\n`);
            }
        }
    }

    if (count === 0) {
        console.log("🚫 No authority transactions found.");
    } else {
        console.log(chalk.green(`✅ Found ${count} authority transaction(s)`));
    }
}

viewAuthorityTransactions();
