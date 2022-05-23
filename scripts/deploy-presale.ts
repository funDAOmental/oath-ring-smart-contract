import { ethers } from 'hardhat';

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	const [deployer] = await ethers.getSigners(); // get the account to deploy the contract
	console.log('deploying presale contract with the account:', deployer.address);
	console.log('account balance:', (await deployer.getBalance()).toString());

	const PreSale = await ethers.getContractFactory('PreSale');
	const presale = await PreSale.deploy(ethers.utils.parseEther('0.1'));

	await presale.deployed();

	console.log('presale contract deployed to:', presale.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('presale deployment error:', error);
		process.exit(1);
	});
