const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (callback) {
    const prompt = require("prompt-sync")();
    const id = prompt("🔍 Enter land ID to view: ");
    try {
        const contract = await LandRegistry.deployed();
        const result = await contract.getLandById(id);
        const [id_, owner, plot, location, city, state, price, forSale] = result;

        console.log(`\n🧾 LAND DETAILS:`);
        console.log(`🆔 ID: ${id_}`);
        console.log(`📍 Plot: ${plot}`);
        console.log(`📌 Location: ${location}, ${city}, ${state}`);
        console.log(`👤 Owner: ${owner}`);
        console.log(`💰 Price: ${web3.utils.fromWei(price.toString(), "ether")} ETH`);
        console.log(`🛒 For Sale: ${forSale}`);
    } catch (err) {
        console.error("❌ Could not fetch land:", err.message.includes("Invalid land ID") ? "Invalid land ID." : err.message);
    }
    callback();
};