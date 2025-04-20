const Web3 = require("web3");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

// Load ABIs
const artifacts = {
    LandRegistry: require("../build/contracts/LandRegistry.json"),
    ProofOfAuthority: require("../build/contracts/ProofOfAuthority.json"),
    Stakeholders: require("../build/contracts/Stakeholders.json"),
};

const web3 = new Web3.default("http://127.0.0.1:8545");

async function viewBlockchain() {
    const latestBlock = await web3.eth.getBlockNumber();
    const latestBlockNumber = Number(latestBlock);
    console.log(chalk.blue(`📦 Blockchain contains ${latestBlockNumber + 1} blocks\n`));

    const blocks = [];
    const ifaceMap = {};

    // Build contract ABI method signature lookup
    for (const [name, artifact] of Object.entries(artifacts)) {
        ifaceMap[name] = {
            abi: artifact.abi,
            bytecode: artifact.bytecode,
            contract: new web3.eth.Contract(artifact.abi),
        };
    }

    for (let i = 0; i <= latestBlockNumber; i++) {
        const block = await web3.eth.getBlock(i, true);
        const blockInfo = {
            number: block.number,
            hash: block.hash,
            parentHash: block.parentHash,
            miner: block.miner,
            timestamp: new Date(Number(block.timestamp) * 1000).toISOString(),
            txCount: block.transactions.length,
            transactions: [],
        };

        console.log(chalk.bold(`🔗 Block ${block.number}`));
        console.log(`Hash: ${block.hash}`);
        console.log(`Parent: ${block.parentHash}`);
        console.log(`Miner: ${block.miner}`);
        console.log(`Tx Count: ${block.transactions.length}`);

        if (block.transactions.length > 0) console.log("Transactions:");

        for (const [j, tx] of block.transactions.entries()) {
            let decodedMethod = "Unknown";
            let contractName = "Unknown";
            let isPoA = false;

            // Try to match constructor (contract deployment)
            if (tx.to === null) {
                for (const [name, artifact] of Object.entries(artifacts)) {
                    if (tx.input.startsWith(artifact.bytecode.slice(0, 20))) {
                        contractName = name;
                        decodedMethod = `Deploy ${name}`;
                        break;
                    }
                }
            }

            // If not deployment, try to decode function call
            if (tx.to && tx.input && tx.input !== "0x") {
                const sig = tx.input.slice(0, 10);

                for (const [name, ifaceObj] of Object.entries(ifaceMap)) {
                    const method = ifaceObj.abi.find(
                        (m) => m.type === "function" && sig === web3.eth.abi.encodeFunctionSignature(m)
                    );
                    if (method) {
                        contractName = name;
                        decodedMethod = method.name;

                        if (method.name.toLowerCase().includes("authority")) {
                            isPoA = true;
                        }
                        break;
                    }
                }
            }

            const tag = isPoA ? "🔐 " : "";
            const txValue = web3.utils.fromWei(tx.value, "ether");

            console.log(
                chalk.green(
                    `  ${j + 1}. From: ${tx.from} → To: ${tx.to || "[Contract Creation]"}`
                )
            );
            console.log(
                `     💰 ${txValue} ETH | 📥 Method: ${tag}${decodedMethod} | 📦 Contract: ${contractName}`
            );

            blockInfo.transactions.push({
                from: tx.from,
                to: tx.to || null,
                value: txValue,
                method: decodedMethod,
                contract: contractName,
                authorityTx: isPoA,
                hash: tx.hash,
            });
        }

        console.log();
        blocks.push(blockInfo);
    }

    const outputPath = path.join(__dirname, "../output/blockchain.json");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(
        outputPath,
        JSON.stringify(
            blocks,
            (_, value) => (typeof value === "bigint" ? value.toString() : value),
            2
        )
    );

    console.log(chalk.cyan(`✅ Blockchain exported to output/blockchain.json`));
}

viewBlockchain();
