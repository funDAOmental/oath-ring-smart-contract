import { ethers } from 'hardhat';

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	const openseaProxy: string = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';

	const [deployer] = await ethers.getSigners(); // get the account to deploy the contract
	console.log('deploying accesspass contract with the account:', deployer.address);
	console.log('account balance:', (await deployer.getBalance()).toString());

	const AccessPass = await ethers.getContractFactory('AccessPass');
	const accesspass = await AccessPass.deploy(openseaProxy, 337);

	await accesspass.deployed();

	console.log('accesspass contract deployed to:', accesspass.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('accesspass deployment error:', error);
		process.exit(1);
	});
