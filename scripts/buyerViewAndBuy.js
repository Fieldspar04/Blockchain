// 2️⃣ scripts/buyerViewAndBuy.js - Buyer views and buys land (balance and ID checks)

const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (callback) {
    const prompt = require("prompt-sync")();
    const contract = await LandRegistry.deployed();
    const accounts = await web3.eth.getAccounts();
    const buyer = accounts[2];

    const lands = await contract.getAvailableLands();
    if (lands.length === 0) {
        console.log("⚠️  No available lands to buy.");
        return callback();
    }

    console.table(lands.map((land) => ({
        ID: land.id.toString(),
        Plot: land.plotNumber,
        Location: land.location,
        City: land.city,
        State: land.state,
        Price: web3.utils.fromWei(land.price.toString(), "ether") + " ETH",
        Owner: land.owner
    })));

    const id = prompt("🔑 Enter ID of land to buy: ");

    try {
        const land = await contract.getLandById(id);
        const price = land[6].toString();
        const forSale = land[7];

        const buyerBalance = await web3.eth.getBalance(buyer);
        if (!forSale)
            return console.log("❌ Land is not for sale."), callback();

        if (BigInt(buyerBalance) < BigInt(price))
            return console.log("❌ Not enough balance."), callback();

        await contract.buyLand(id, { from: buyer, value: price });
        console.log(`✅ Land ${id} purchased successfully!`);
    } catch (err) {
        console.error("❌ Could not purchase land:", err.message.includes("Invalid land ID") ? "Invalid land ID." : err.message);
    }
    callback();
};