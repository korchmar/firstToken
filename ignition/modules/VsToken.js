const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const VsTokenModule = buildModule("VsTokenModule", (m) => {
  const token = m.contract("VsToken");
  return { token };
});

module.exports = VsTokenModule;