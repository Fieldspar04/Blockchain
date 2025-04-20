const Web3Module = require("web3");
const Web3 = Web3Module.default || Web3Module;  // ✅ Works with both import/export styles

const web3 = new Web3("http://127.0.0.1:8545");

async function viewBlockchain() {
    const latestBlock = await web3.eth.getBlockNumber();

    console.log(`🧱 Blockchain Viewer (Latest Block: ${latestBlock})`);
    console.log("---------------------------------------------------");

    for (let i = 0; i <= latestBlock; i++) {
        const block = await web3.eth.getBlock(i, true);
        console.log(`📦 Block #${block.number}`);
        console.log(`🔑 Hash: ${block.hash}`);
        console.log(`👷‍♂️ Miner: ${block.miner}`);
        console.log(`📄 Tx Count: ${block.transactions.length}`);
        console.log("---------------------------------------------------\n");
    }
}

viewBlockchain();
