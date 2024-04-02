const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const VsTokenModule = buildModule("VsTokenModule", (m) => {
    const token = m.contract("VsToken");
    return { token };
  });

const VsTokenSaleModule = buildModule("VsTokenSale", (m) => {
  const  tokenPrice =100;
  const tokenSale = m.contract("VsTokenSale", [VsTokenModule.contract, tokenPrice]);
  return { tokenSale };
});

module.exports = VsTokenSaleModule;