const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address); 
  const HentaiNFT = await hre.ethers.getContractFactory("HentaiNFT");
  const hentaiNFT = await HentaiNFT.deploy();
  await hentaiNFT.deployed();
  console.log("HentaiNFT deployed to:", hentaiNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

