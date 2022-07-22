import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const RamperToken721 = await ethers.getContractFactory("RamperToken721");
  console.log("Deploying RamperToken721...");
  const rt = await RamperToken721.deploy();
  await rt.deployed();
  console.log("RamperToken721 deployed to:", rt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
