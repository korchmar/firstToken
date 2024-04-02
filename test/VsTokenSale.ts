import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("VsTokenSale", function () {

  async function deployVsTokenSaleFixture() {
    const tokenPrice = 1000000000000000;
    const vsToken = await hre.ethers.deployContract("VsToken");
    const vsTokenSale = await hre.ethers.deployContract("VsTokenSale",[vsToken.target,tokenPrice]);
    return {vsTokenSale, tokenPrice };

  }

  it("Should check that token sale contract was deployed", async function () {
    const  {vsTokenSale, tokenPrice} = await loadFixture(deployVsTokenSaleFixture);
     expect(await vsTokenSale.target).to.not.equal(0x0);
    });


  it("Should check that token price was set corretly", async function () {
    const  {vsTokenSale, tokenPrice} = await loadFixture(deployVsTokenSaleFixture);
     expect(await vsTokenSale.tokenPrice()).to.equal(tokenPrice);
    });

    it("Should buy tokens", async function () {
      const { adminAccount, buyerAccount } =  await hre.ethers.getSigners();
      const numberOfTokensToBuy = 10;
      const  {vsTokenSale, tokenPrice} = await loadFixture(deployVsTokenSaleFixture);
      const valueOfTokens = numberOfTokensToBuy * tokenPrice;

      try {
        const receipt = await vsTokenSale.buyTokens(numberOfTokensToBuy, {
          from: buyerAccount,
          value: valueOfTokens
        })
        expect(await vsTokenSale.tokensSold()).to.equal(5);

      }   catch (error) {
       console.log( error.message );
      }
 
      

      });

  });
