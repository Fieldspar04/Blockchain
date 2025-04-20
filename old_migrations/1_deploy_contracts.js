const RegistryAdmin = artifacts.require("RegistryAdmin");
const ParcelManager = artifacts.require("ParcelManager");
const TransferHandler = artifacts.require("TransferHandler");

module.exports = async function (deployer) {
    await deployer.deploy(RegistryAdmin);
    await deployer.deploy(ParcelManager);
    const managerInstance = await ParcelManager.deployed();
    await deployer.deploy(TransferHandler, managerInstance.address);
};
