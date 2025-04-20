// 1️⃣ Enhanced scripts/sellerRegister.js - Add full land details

const LandRegistry = artifacts.require("LandRegistry");
const readline = require("readline");

module.exports = async function (callback) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q) => new Promise((res) => rl.question(q, res));

    try {
        const accounts = await web3.eth.getAccounts();
        const seller = accounts[1];
        const contract = await LandRegistry.deployed();

        const plot = await ask("📍 Plot Number: ");
        const location = await ask("🏙  Location: ");
        const city = await ask("🌆 City: ");
        const state = await ask("🗺  State: ");
        const priceEth = await ask("💰 Price in ETH: ");
        const priceWei = web3.utils.toWei(priceEth, "ether");

        await contract.registerLand(plot, location, city, state, priceWei, { from: seller });
        console.log(`✅ Land listed at '${location}, ${city}' for ${priceEth} ETH by ${seller}`);
    } catch (err) {
        console.error("❌ Error registering land:", err);
    } finally {
        rl.close();
        callback();
    }
};