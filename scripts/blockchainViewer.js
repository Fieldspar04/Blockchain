// Enhanced blockchainViewer.js — decode function names, save txs to blockchain.json

const Web3 = require("web3");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const artifacts = {
    LandRegistry: require("../build/contracts/LandRegistry.json"),
    ProofOfAuthority: require("../build/contracts/ProofOfAuthority.json"),
    Stakeholders: require("../build/contracts/Stakeholders.json")
};

const web3 = new Web3.default("http://127.0.0.1:8545");

async function viewBlockchain() {
    const latestBlock = await web3.eth.getBlockNumber();
    const blocks = [];

    console.log(chalk.cyan(`📦 Blockchain contains ${Number(latestBlock) + 1} blocks\n`));

    for (let i = 0; i <= latestBlock; i++) {
        const block = await web3.eth.getBlock(i, true);

        console.log(chalk.bold(`🔗 Block ${block.number}`));
        console.log(`Hash: ${block.hash}`);
        console.log(`Parent: ${block.parentHash}`);
        console.log(`Miner: ${block.miner}`);
        console.log(`Tx Count: ${block.transactions.length}`);

        const blockInfo = {
            number: block.number,
            hash: block.hash,
            parentHash: block.parentHash,
            miner: block.miner,
            timestamp: block.timestamp,
            txCount: block.transactions.length,
            transactions: []
        };

        if (block.transactions.length > 0) {
            console.log("Transactions:");
        }

        for (let j = 0; j < block.transactions.length; j++) {
            const tx = block.transactions[j];
            let decodedMethod = "Unknown";
            let contractName = "Unknown";

            // Try function decoding
            if (tx.input && tx.input !== "0x") {
                for (const name in artifacts) {
                    try {
                        const abi = artifacts[name].abi;
                        const iface = new web3.eth.Contract(abi);
                        const signature = tx.input.slice(0, 10);
                        const method = abi.find((m) => signature === web3.eth.abi.encodeFunctionSignature(m));
                        if (method) {
                            decodedMethod = method.name;
                            contractName = name;
                            break;
                        }
                    } catch (err) { }
                }
            } else {
                decodedMethod = "(Contract Creation)";
            }

            const txDetails = {
                hash: tx.hash,
                from: tx.from,
                to: tx.to || null,
                valueETH: web3.utils.fromWei(tx.value.toString(), "ether"),
                method: decodedMethod,
                contract: contractName
            };

            console.log(
                chalk.green(`  ${j + 1}. From: ${tx.from} → To: ${tx.to || "[Contract Creation]"}`)
            );
            console.log(
                `     💰 ${txDetails.valueETH} ETH | 📥 Method: ${decodedMethod} | 📦 Contract: ${contractName}`
            );

            blockInfo.transactions.push(txDetails);
        }
        console.log();
        blocks.push(blockInfo);
    }

    const outputPath = path.join(__dirname, "../output/blockchain.json");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(
        outputPath,
        JSON.stringify(blocks, (key, value) =>
            typeof value === "bigint" ? value.toString() : value,
            2
        )
    );

    console.log(chalk.yellow(`✅ Blockchain exported to output/blockchain.json`));
}

viewBlockchain();
