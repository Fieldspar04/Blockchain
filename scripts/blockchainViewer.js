const Web3 = require("web3");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const abi = require("../build/contracts/LandRegistry.json").abi; // Adjust if your contract file differs

const web3 = new Web3.default("http://127.0.0.1:8545");
const iface = new web3.eth.Contract(abi);

const artifacts = {
    "LandRegistry": require("../build/contracts/LandRegistry.json"),
    "ProofOfAuthority": require("../build/contracts/ProofOfAuthority.json"),
    "Stakeholders": require("../build/contracts/Stakeholders.json")
};


async function viewBlockchain() {
    const latestBlock = await web3.eth.getBlockNumber();
    console.log(chalk.blue(`📦 Blockchain contains ${Number(latestBlock) + 1} blocks\n`));

    const blocks = [];

    for (let i = 0; i <= latestBlock; i++) {
        const block = await web3.eth.getBlock(i, true);

        const blockInfo = {
            number: block.number,
            hash: block.hash,
            parentHash: block.parentHash,
            miner: block.miner,
            // timestamp: block.timestamp,
            timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
            txCount: block.transactions.length,
            transactions: [],
        };

        console.log(chalk.bold(`🔗 Block ${block.number}`));
        console.log(`Hash: ${block.hash}`);
        console.log(`Parent: ${block.parentHash}`);
        console.log(`Miner: ${block.miner}`);
        console.log(`Tx Count: ${block.transactions.length}`);

        if (block.transactions.length > 0) {
            console.log("Transactions:");
        }

        for (let j = 0; j < block.transactions.length; j++) {
            const tx = block.transactions[j];
            let decodedMethod = "Unknown";

            if (tx.to === null) {
                const bytecode = tx.input;
                let matchedContract = "Unknown Contract";

                for (let name in artifacts) {
                    const contractBytecode = artifacts[name].bytecode;
                    if (bytecode.startsWith(contractBytecode.slice(0, 20))) {
                        matchedContract = name;
                        break;
                    }
                }

                decodedMethod = `Contract Deployment (${matchedContract})`;
            }

            // if (tx.to === null) {
            //     decodedMethod = "Contract Deployment";
            // } else if (tx.input && tx.input !== "0x") {
            //     try {
            //         const signature = tx.input.slice(0, 10);
            //         const method = abi.find((m) => signature === web3.eth.abi.encodeFunctionSignature(m));
            //         decodedMethod = method ? method.name : "Unknown";
            //     } catch (e) {
            //         decodedMethod = "Error decoding";
            //     }
            // }

            console.log(
                chalk.green(`  ${j + 1}. From: ${tx.from} → To: ${tx.to || chalk.yellow("Contract Creation")}`)
            );
            console.log(`     Value: ${web3.utils.fromWei(tx.value, "ether")} ETH | Function: ${decodedMethod}`);

            blockInfo.transactions.push({
                from: tx.from,
                to: tx.to,
                value: web3.utils.fromWei(tx.value, "ether"),
                function: decodedMethod,
                hash: tx.hash,
            });
        }

        console.log();
        blocks.push(blockInfo);
    }

    const outputPath = path.join(__dirname, "../output/blockchain.json");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    // fs.writeFileSync(outputPath, JSON.stringify(blocks, null, 2));
    fs.writeFileSync(outputPath, JSON.stringify(blocks, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value, 2));

    console.log(chalk.cyan(`✅ Blockchain exported to output/blockchain.json`));
}

viewBlockchain();



// const Web3 = require("web3");
// const web3 = new Web3("http://127.0.0.1:8545");

// async function viewBlocks() {
//     const latest = await web3.eth.getBlockNumber();

//     for (let i = 0; i <= latest; i++) {
//         const block = await web3.eth.getBlock(i, true); // include txs
//         console.log(`\nBlock #${block.number}`);
//         console.log(`Hash: ${block.hash}`);
//         console.log(`Timestamp: ${new Date(block.timestamp * 1000).toLocaleString()}`);
//         console.log(`Miner (Authority): ${block.miner}`);
//         console.log(`Transactions: ${block.transactions.length}`);
//         block.transactions.forEach((tx, index) => {
//             console.log(`  Tx ${index + 1}: From ${tx.from} To ${tx.to} Value: ${web3.utils.fromWei(tx.value, "ether")} ETH`);
//         });
//     }
// }

// viewBlocks();
