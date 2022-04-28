import { ethers } from 'hardhat';

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	const [deployer] = await ethers.getSigners(); // get the account to deploy the contract
	console.log('deploying zerokeys contract with the account:', deployer.address);
	console.log('account balance:', (await deployer.getBalance()).toString());

	const baseTokenURI: string = 'https://www.nftxt.xyz/metadata?id=';

	const ZEROKeys = await ethers.getContractFactory('ZEROKeys');
	const zerokeys = await ZEROKeys.deploy(baseTokenURI, ethers.utils.parseEther('0.1'));

	await zerokeys.deployed();

	console.log('zerokeys contract deployed to:', zerokeys.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('zerokeys deployment error:', error);
		process.exit(1);
	});
