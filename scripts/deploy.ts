import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	const [deployer] = await ethers.getSigners(); //get the account to deploy the contract
	console.log('deploying contract with the account:', deployer.address);
	console.log('account balance:', (await deployer.getBalance()).toString());

	// We get the contract to deploy
	const vrfCoordinator: string = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9';
	const linkToken: string = '0xa36085F69e2889c224210F603D836748e7dC0088';
	const keyHash: string = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4';
	const fee: BigNumber = ethers.utils.parseEther('0.1');

	const Randomness = await ethers.getContractFactory('Randomness');
	const randomness = await Randomness.deploy(vrfCoordinator, linkToken, keyHash, fee);

	await randomness.deployed();

	console.log('contract deployed to:', randomness.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('deployment error:', error);
		process.exit(1);
	});
