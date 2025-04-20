// NOTE:
// This script was built to demonstrate live event logging.
// Due to Ganache and Truffle `.exec` limitations on subscriptions or event polling,
// we left this file for reference only. Not currently invoked.

// 4️⃣ scripts/watchEvents.js - Real-time event viewer, polling-based fallback for HTTP providers

const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (callback) {
    try {
        const contract = await LandRegistry.deployed();
        const latestBlock = await web3.eth.getBlockNumber();

        console.log("\n📡 Polling for contract events from block", latestBlock);

        const events = await contract.getPastEvents("allEvents", {
            fromBlock: latestBlock - 10 > 0 ? latestBlock - 10 : 0,
            toBlock: "latest",
        });

        if (events.length === 0) {
            console.log("🕐 No recent events found.");
        } else {
            for (const event of events) {
                switch (event.event) {
                    case "LandRegistered":
                        console.log(`📝 [LandRegistered] ID: ${event.returnValues.id}, Owner: ${event.returnValues.owner}`);
                        break;
                    case "LandPurchased":
                        console.log(`💸 [LandPurchased] ID: ${event.returnValues.id}, From: ${event.returnValues.oldOwner}, To: ${event.returnValues.newOwner}, Price: ${web3.utils.fromWei(event.returnValues.price, 'ether')} ETH`);
                        break;
                    case "AuthorityChanged":
                        console.log(`🔐 [AuthorityChanged] New Authority: ${event.returnValues.newAuthority}`);
                        break;
                    case "Withdrawal":
                        console.log(`🏦 [Withdrawal] To: ${event.returnValues.to}, Amount: ${web3.utils.fromWei(event.returnValues.amount, 'ether')} ETH`);
                        break;
                    default:
                        console.log(`📢 [${event.event}]`, event.returnValues);
                }
            }
        }
    } catch (err) {
        console.error("❌ Error fetching events:", err.message);
    }
    callback();
};
