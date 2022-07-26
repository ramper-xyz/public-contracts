// test/ERC721/preexisting_contract_example/RamperBridge721.test.js
// Load dependencies
const { ethers } = require("ethers");
const { expect } = require("chai");

// Import utilities from Test Helpers
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

// Load compiled artifacts
const PreExistingRamperToken721 = artifacts.require(
  "PreExistingRamperToken721"
);
const RamperBridge721 = artifacts.require("RamperBridge721");

// Start test block
contract("RamperBridge721", function ([owner, other]) {

  beforeEach(async function () {
    this.pre721 = await PreExistingRamperToken721.new({ from: owner });
    this.bridge721 = await RamperBridge721.new(this.pre721.address, {
      from: owner,
    });
  });

  it("correctly returns the price", async function () {
    const returnedPrice = await this.bridge721.price({ from: other });
    expect(returnedPrice.toString()).to.be.equal("1300000000000000");
  });

  it("successfully mints a single token", async function () {
    await this.bridge721.mint(other, 1, {
      from: other,
      value: ethers.utils.parseEther("0.0013"),
    });
    const balance = await this.pre721.balanceOf(other, { from: other });
    expect(balance).to.be.bignumber.equal(new BN(1));
  });

  it("successfully mints multiple tokens and returns correct remaining available", async function () {
    await this.bridge721.mint(other, 3, {
      from: other,
      value: ethers.utils.parseEther("0.0039"),
    });
    const balance = await this.pre721.balanceOf(other, { from: other });
    expect(balance).to.be.bignumber.equal(new BN(3));
    // Should only have 3 remaining tokens (max per transaction)
    const remaining = await this.bridge721.availableTokens(other, {
      from: other,
    });
    expect(remaining).to.be.bignumber.equal(new BN(3));
  });

  it("returns an error if not enough ethereum", async function () {
    await expectRevert(
      this.bridge721.mint(other, 1, {
        from: other,
        value: ethers.utils.parseEther("0.0010"),
      }),
      "Insufficient funds for requested tokens"
    );
  });

  it("successfully transfers token from 1 address to another", async function () {
    await this.bridge721.mint(owner, 3, {
      from: owner,
      value: ethers.utils.parseEther("0.0039"),
    });
    const balance = await this.pre721.balanceOf(owner, { from: owner });
    expect(balance).to.be.bignumber.equal(new BN(3));

    await this.pre721.safeTransferFrom(owner, other, 0, {
      from: owner,
    });
    const balance2 = await this.pre721.balanceOf(owner, { from: owner });
    expect(balance2).to.be.bignumber.equal(new BN(2));
    const balance3 = await this.pre721.balanceOf(other, { from: other });
    expect(balance3).to.be.bignumber.equal(new BN(1));
  });
});
