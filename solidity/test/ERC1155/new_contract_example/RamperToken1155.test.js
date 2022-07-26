// test/ERC1155/new_contract_example/RamperToken1155.test.js
// Load dependencies
const { ethers } = require("ethers");
const { expect } = require("chai");

// Import utilities from Test Helpers
const { BN, expectRevert } = require("@openzeppelin/test-helpers");

// Load compiled artifacts
const RamperToken1155 = artifacts.require("RamperToken1155");

// Start test block
contract("RamperToken1155", function ([owner, other]) {
  beforeEach(async function () {
    this.rt1155 = await RamperToken1155.new({ from: owner });
  });

  it("correctly returns the price of 2 different tokens", async function () {
    const returnedPrice = await this.rt1155.price(0, { from: other });
    expect(returnedPrice.toString()).to.be.equal("1300000000000000");
    const returnedPrice2 = await this.rt1155.price(1, { from: other });
    expect(returnedPrice2.toString()).to.be.equal("1900000000000000");
  });

  it("successfully mints a single token", async function () {
    await this.rt1155.mint(other, 1, 0, {
      from: other,
      value: ethers.utils.parseEther("0.0013"),
    });
    const balance = await this.rt1155.balanceOf(other, 0, { from: other });
    expect(balance).to.be.bignumber.equal(new BN(1));
  });

  it("successfully mints multiple tokens and returns correct remaining available", async function () {
    // Initial available should be 10, which is max per txn
    const remaining = await this.rt1155.availableTokens(other, 1, {
      from: other,
    });
    expect(remaining).to.be.bignumber.equal(new BN(10));
    await this.rt1155.mint(other, 10, 1, {
      from: other,
      value: ethers.utils.parseEther("0.019"),
    });
    const balance = await this.rt1155.balanceOf(other, 1, { from: other });
    expect(balance).to.be.bignumber.equal(new BN(10));
    // Should have 5 available (15 - 10 previously minted)
    const remaining2 = await this.rt1155.availableTokens(other, 1, {
      from: other,
    });
    expect(remaining2).to.be.bignumber.equal(new BN(5));
    await this.rt1155.mint(other, 5, 1, {
      from: other,
      value: ethers.utils.parseEther("0.0095"),
    });
    // Should be zero remaining
    const remaining3 = await this.rt1155.availableTokens(other, 1, {
      from: other,
    });
    expect(remaining3).to.be.bignumber.equal(new BN(0));
  });

  it("returns an error if not enough ethereum", async function () {
    await expectRevert(
      this.rt1155.mint(other, 1, 3, {
        from: other,
        value: ethers.utils.parseEther("0.0001"),
      }),
      "Insufficient funds for requested tokens"
    );
  });

  it("returns error for out of range token", async function () {
    await expectRevert(
      this.rt1155.mint(other, 1, 10, {
        from: other,
        value: ethers.utils.parseEther("0.0019"),
      }),
      "Token does not exist"
    );
  });

  it("returns an error if quantity is more than allowed in single txn", async function () {
    await expectRevert(
      this.rt1155.mint(other, 11, 2, {
        from: other,
        value: ethers.utils.parseEther("0.0143"),
      }),
      "Requested number of tokens is over limit for minting"
    );
  });

  it("returns an error if no more remaining tokens", async function () {
    await this.rt1155.mint(other, 10, 3, {
      from: other,
      value: ethers.utils.parseEther("0.019"),
    });
    await this.rt1155.mint(other, 5, 3, {
      from: other,
      value: ethers.utils.parseEther("0.0095"),
    });
    await expectRevert(
      this.rt1155.mint(other, 1, 3, {
        from: other,
        value: ethers.utils.parseEther("0.0019"),
      }),
      "Requested number of tokens is over limit for minting"
    );
  });
});
