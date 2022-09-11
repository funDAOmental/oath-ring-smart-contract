import { Contract } from "ethers";
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const openseaProxy: string = "0xF57B2c51dED3A29e6891aba85459d600256Cf317";
  const councilQuantity: number = 337;
  const guildQuantity: number = 1000;

  const [deployer] = await ethers.getSigners(); // get the account to deploy the contract
  console.log("deploying oathRings contract with the account:", deployer.address);
  console.log("account balance:", (await deployer.getBalance()).toString());

  try {
    const OathRingsDescFactory = await ethers.getContractFactory("OathRingsDescriptor");
    const oathRingsDescriptor: Contract = await OathRingsDescFactory.deploy();
    await oathRingsDescriptor.deployed();
    console.log("oathRings descriptor deployed to:", oathRingsDescriptor.address);

    const OathRingsFactory = await ethers.getContractFactory("OathRings");
    const oathRings = await OathRingsFactory.deploy(
      openseaProxy,
      oathRingsDescriptor.address,
      councilQuantity,
      guildQuantity,
    );
    await oathRings.deployed();
    console.log("oathRings contract deployed to:", oathRings.address);
  } catch (error) {
    throw new Error(`try catch error: ${JSON.stringify(error)}`);
  }
}

main()
  .then(() => {})
  .catch(error => {
    console.error(`oathRings contract error: ${JSON.stringify(error)}`);
    throw new Error("Failed deployment");
  });
