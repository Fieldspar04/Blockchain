const ParcelManager = artifacts.require("ParcelManager");

contract("ParcelManager", accounts => {
    it("should register a parcel and retrieve it", async () => {
        const instance = await ParcelManager.deployed();
        await instance.registerParcel("Sector 21", "Delhi", 150, { from: accounts[0] });

        const myParcels = await instance.listMyParcels({ from: accounts[0] });
        const parcel = await instance.getParcelDetails(myParcels[0]);

        assert.equal(parcel.city, "Delhi", "City should be Delhi");
    });
});
