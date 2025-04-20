const ParcelManager = artifacts.require("ParcelManager");

module.exports = async function (callback) {
    const accounts = await web3.eth.getAccounts();
    const manager = await ParcelManager.deployed();

    const tx = await manager.registerParcel("Block 501, Alpha Zone", "Ahmedabad", 250);
    console.log(`📝 Parcel Registered: ${tx.logs[0].args.parcelId.toString()} by ${accounts[0]}`);

    const myParcels = await manager.listMyParcels({ from: accounts[0] });
    console.log("📦 Your Parcel IDs:", myParcels.map(id => id.toString()));

    const details = await manager.getParcelDetails(myParcels[0]);
    console.log("📄 Parcel Details:", details);

    callback();
};
