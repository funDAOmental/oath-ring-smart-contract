import { Contract } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	const openseaProxy: string = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';
	const goldQuantity: number = 5;
	const silverQuantity: number = 1000;

	const [deployer] = await ethers.getSigners(); // get the account to deploy the contract
	console.log('deploying oathrings contract with the account:', deployer.address);
	console.log('account balance:', (await deployer.getBalance()).toString());

	try {
		const OathRingsDescFactory = await ethers.getContractFactory('OathRingsDescriptor');
		const oathRingsDescriptor:Contract = await OathRingsDescFactory.deploy();
		await oathRingsDescriptor.deployed();
		console.log('oathrings descriptor deployed to:', oathRingsDescriptor.address);

		const OathRingsFactory = await ethers.getContractFactory('OathRings');
		const oathrings = await OathRingsFactory.deploy(
			openseaProxy,
			oathRingsDescriptor.address,
			goldQuantity,
			silverQuantity
		);
		await oathrings.deployed();
		console.log('oathrings contract deployed to:', oathrings.address);
	} catch (error) {
		throw new Error(`try catch error: ${JSON.stringify(error)}`);
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(`oathrings contract error: ${JSON.stringify(error)}`);
		process.exit(1);
	});
