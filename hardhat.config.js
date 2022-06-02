require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

if (process.env.REPORT_GAS) {
  require('hardhat-gas-reporter');
}

if (process.env.REPORT_COVERAGE) {
  require('solidity-coverage');
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    showTimeSpent: true,
  },
  plugins: ['solidity-coverage'],
  networks: {
    mainnet: {
      url: "https://mainnet.infura.io/v3/redacted",
      accounts: ["redacted"]
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/redacted",
      accounts: ["redacted"]
    },
  },
  etherscan: {
    apiKey: "63EQXB7PPAHS878I39WTK56JHS6ZUAF4QQ"
  }
};

