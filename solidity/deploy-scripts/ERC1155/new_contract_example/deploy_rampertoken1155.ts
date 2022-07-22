import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const RamperToken1155 = await ethers.getContractFactory("RamperToken1155");
  console.log("Deploying RamperToken1155...");
  const rt = await RamperToken1155.deploy();
  await rt.deployed();
  console.log("RamperToken1155 deployed to:", rt.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
