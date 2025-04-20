const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (callback) {
    try {
        const accounts = await web3.eth.getAccounts();
        const contractInstance = await LandRegistry.new({
            from: accounts[0],
            value: web3.utils.toWei("1", "ether") // ✅ sending 1 ETH
        });

        console.log("📦 LandRegistry deployed at:", contractInstance.address);
        callback();
    } catch (err) {
        console.error(err);
        callback(err);
    }
};
