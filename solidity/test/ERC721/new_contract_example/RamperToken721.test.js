// test/ERC721/new_contract_example/RamperToken721.test.js
// Load dependencies
const { ethers } = require("ethers");
const { expect } = require("chai");

// Import utilities from Test Helpers
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

// Load compiled artifacts
const RamperToken721 = artifacts.require("RamperToken721");

// Start test block
contract("RamperToken721", function ([owner, other]) {

  beforeEach(async function () {
    this.rt721 = await RamperToken721.new({ from: owner });
  });

  it("correctly returns the price", async function () {
    const returnedPrice = await this.rt721.price({ from: other });
    expect(returnedPrice.toString()).to.be.equal("1300000000000000");
  });

  it("successfully mints a single token", async function () {
    await this.rt721.mint(other, 1, {
      from: other,
      value: ethers.utils.parseEther("0.0013"),
    });
    const balance = await this.rt721.balanceOf(other, { from: other });
    expect(balance).to.be.bignumber.equal(new BN(1));
  });

  it("successfully mints multiple tokens and returns correct remaining available", async function () {
    await this.rt721.mint(other, 3, {
      from: other,
      value: ethers.utils.parseEther("0.0039"),
    });
    const balance = await this.rt721.balanceOf(other, { from: other });
    expect(balance).to.be.bignumber.equal(new BN(3));
    // Should only have 2 remaining tokens (5 allowed per wallet - 3 minted)
    const remaining = await this.rt721.availableTokens(other, { from: other });
    expect(remaining).to.be.bignumber.equal(new BN(2));
    await this.rt721.mint(other, 2, {
      from: other,
      value: ethers.utils.parseEther("0.0026"),
    });
    // Should be zero remaining
    const remaining2 = await this.rt721.availableTokens(other, { from: other });
    expect(remaining2).to.be.bignumber.equal(new BN(0));
  });

  it("returns an error if not enough ethereum", async function () {
    await expectRevert(
      this.rt721.mint(other, 1, {
        from: other,
        value: ethers.utils.parseEther("0.0010"),
      }),
      "Insufficient funds for requested tokens"
    );
  });

  it("returns an error if user can't purchase any more tokens", async function () {
    await this.rt721.mint(other, 3, {
      from: other,
      value: ethers.utils.parseEther("0.0039"),
    });
    await this.rt721.mint(other, 2, {
      from: other,
      value: ethers.utils.parseEther("0.0026"),
    });
    await expectRevert(
      this.rt721.mint(other, 1, {
        from: other,
        value: ethers.utils.parseEther("0.0013"),
      }),
      "Requested number of tokens is over limit for minting"
    );
  });

  it("successfully transfers multiple tokens from 1 address to another", async function () {
    await this.rt721.mint(owner, 3, {
      from: owner,
      value: ethers.utils.parseEther("0.0039"),
    });
    const balance = await this.rt721.balanceOf(owner, { from: owner });
    expect(balance).to.be.bignumber.equal(new BN(3));

    await this.rt721.safeBulkTransferFrom(owner, other, [0, 1, 2], {
      from: owner,
    });
    const balance2 = await this.rt721.balanceOf(owner, { from: owner });
    expect(balance2).to.be.bignumber.equal(new BN(0));
    const balance3 = await this.rt721.balanceOf(other, { from: other });
    expect(balance3).to.be.bignumber.equal(new BN(3));
  });
});
