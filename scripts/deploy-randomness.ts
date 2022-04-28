import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

async function main() {
	// Hardhat always runs the compile task when running scripts with its command
	// line interface.
	//
	// If this script is run directly using `node` you may want to call compile
	// manually to make sure everything is compiled
	// await hre.run('compile');

	const [deployer] = await ethers.getSigners(); // get the account to deploy the contract
	console.log('deploying randomness contract with the account:', deployer.address);
	console.log('account balance:', (await deployer.getBalance()).toString());

	// reference https://docs.chain.link/docs/vrf-contracts/
	const vrfCoordinator: string = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B';
	const linkToken: string = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
	const keyHash: string = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311';
	const fee: BigNumber = ethers.utils.parseEther('0.1');

	const Randomness = await ethers.getContractFactory('Randomness');
	const randomness = await Randomness.deploy(vrfCoordinator, linkToken, keyHash, fee);

	await randomness.deployed();

	console.log('randomness contract deployed to:', randomness.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('randomness deployment error:', error);
		process.exit(1);
	});
