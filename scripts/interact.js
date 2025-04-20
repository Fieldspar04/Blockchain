const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const landRegistry = await LandRegistry.deployed();

        // Seller registers land
        await landRegistry.registerLand("Ahmedabad Sector 21", web3.utils.toWei("1", "ether"), { from: accounts[1] });

        const land = await landRegistry.lands(1);
        console.log("Before Buying:", land);

        // Buyer buys it
        await landRegistry.buyLand(1, { from: accounts[2], value: web3.utils.toWei("1", "ether") });

        const updatedLand = await landRegistry.lands(1);
        console.log("After Buying:", updatedLand);
        callback();
    } catch (err) {
        console.error(err);
        callback(err);
    }
};
