import { expect } from "chai";
import hre from "hardhat";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("VsToken", function () {
  it("Should test deployment", async function () {
     const vsToken = await hre.ethers.deployContract("VsToken");
     expect(await vsToken.name()).to.equal("VsToken");
     expect(await vsToken.symbol()).to.equal("VS");
     expect(await vsToken.totalSupply()).to.equal(1000000 * (10**18));
    });

  });
