// 1_deploy_contracts.js
const Stakeholders = artifacts.require("Stakeholders");
const ProofOfAuthority = artifacts.require("ProofOfAuthority");
const LandRegistry = artifacts.require("LandRegistry");

module.exports = async function (deployer) {
    await deployer.deploy(Stakeholders);
    await deployer.deploy(ProofOfAuthority);
    await deployer.deploy(LandRegistry);
};
