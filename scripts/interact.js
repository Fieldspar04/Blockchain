const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (callback) {
    const accounts = await web3.eth.getAccounts();
    const landReg = await LandRegistry.deployed();

    await landReg.assignSeller(accounts[1], { from: accounts[0] });
    await landReg.assignBuyer(accounts[2], { from: accounts[0] });

    await landReg.listLand("Ahmedabad Sector 21", web3.utils.toWei("1", "ether"), { from: accounts[1] });

    const before = await landReg.getLand(1);
    console.log("Before Buying:", before);

    await landReg.buyLand(1, { from: accounts[2], value: web3.utils.toWei("1", "ether") });

    const after = await landReg.getLand(1);
    console.log("After Buying:", after);

    callback();
};
