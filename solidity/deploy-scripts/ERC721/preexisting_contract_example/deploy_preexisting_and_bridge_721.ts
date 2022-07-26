import { ethers } from "hardhat";

async function main() {
  // We get the "preexisting" contract to deploy
  const PreExistingRamperToken721 = await ethers.getContractFactory(
    "PreExistingRamperToken721"
  );
  console.log("Deploying PreExistingRamperToken721...");
  const rt = await PreExistingRamperToken721.deploy();
  await rt.deployed();
  console.log("PreExistingRamperToken721 deployed to:", rt.address);

  // Next deploy the bridge using the preexisting address
  const RamperBridge721 = await ethers.getContractFactory("RamperBridge721");
  console.log("Deploying RamperBridge721...");
  const rb = await RamperBridge721.deploy(rt.address);
  await rb.deployed();
  console.log("RamperBridge721 deployed to:", rb.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
