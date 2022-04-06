import { ethers } from 'hardhat';

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	const [deployer] = await ethers.getSigners(); // get the account to deploy the contract
	console.log('deploying gmkeys contract with the account:', deployer.address);
	console.log('account balance:', (await deployer.getBalance()).toString());

	const baseTokenURI: string = 'https://www.nftxt.xyz/metadata?id=';

	const GMKeys = await ethers.getContractFactory('GMKeys');
	const gmkeys = await GMKeys.deploy(baseTokenURI, ethers.utils.parseEther('0.1'));

	await gmkeys.deployed();

	console.log('gmkeys contract deployed to:', gmkeys.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('gmkeys deployment error:', error);
		process.exit(1);
	});
