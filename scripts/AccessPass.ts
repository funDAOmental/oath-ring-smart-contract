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

	try {
		const AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
		const accessPassDescriptor = await AccessPassDescriptor.deploy();
		await accessPassDescriptor.deployed();
		console.log('accesspass descriptor deployed to:', accessPassDescriptor.address);

		const AccessPass = await ethers.getContractFactory('AccessPass');
		const accesspass = await AccessPass.deploy(openseaProxy, accessPassDescriptor.address, 337, 5);
		await accesspass.deployed();
		console.log('accesspass contract deployed to:', accesspass.address);
	} catch (error) {
		throw new Error(`try catch error: ${JSON.stringify(error)}`);
	}
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(`accesspass contract error: ${JSON.stringify(error)}`);
		process.exit(1);
	});
