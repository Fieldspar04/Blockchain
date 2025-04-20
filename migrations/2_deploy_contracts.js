const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (deployer, network, accounts) {
    const landRegistry = await LandRegistry.deployed();

    // Set initial authority address (usually the first account)
    await landRegistry.setAuthority(accounts[0]);
    console.log("Authority set to:", accounts[0]);
};
