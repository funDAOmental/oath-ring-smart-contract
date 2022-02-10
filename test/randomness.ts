import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe.only('randomness', async () => {
	let Randomness: any;
	let randomness: any;

	const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';

	const user1: string = ethers.utils.formatBytes32String('USERA-1');
	const user2: string = ethers.utils.formatBytes32String('USERA-2');
	const user3: string = ethers.utils.formatBytes32String('USERB-1');

	const vrfCoordinator: string = '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9';
	const linkToken: string = '0xa36085F69e2889c224210F603D836748e7dC0088';
	const keyHash: string = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4';
	const fee: BigNumber = ethers.utils.parseEther('0.1');

	console.log(user1, user2, user3, fee);

	before(async () => {
		Randomness = await ethers.getContractFactory('Randomness');
		randomness = await Randomness.deploy(vrfCoordinator, linkToken, keyHash, fee);
		randomness.deployed();
	});

	it('should initialize randomness contract', async () => {
		const getkeyhash = await randomness.getKeyHash();
		expect(getkeyhash).to.equal(keyHash);

		const getfee = await randomness.getFee();
		expect(getfee).to.equal(fee);

		const getnftcount = await randomness.getNftCount();
		expect(getnftcount).to.equal(0);
	});

	it('should start/stop minting', async () => {
		const mintStatus1 = await randomness.isMintingStart();
		expect(mintStatus1).to.equal(false);

		await randomness.startMintPhase(70, 1000);

		const gettotalkey = await randomness.getTotalKeys();
		expect(gettotalkey).to.equal(1000);

		const getwinningpercentahe = await randomness.getWinningPercentage();
		expect(getwinningpercentahe).to.equal(70);

		const mintStatus2 = await randomness.isMintingStart();
		expect(mintStatus2).to.equal(true);

		await randomness.stopMintPhase();

		const mintStatus3 = await randomness.isMintingStart();
		expect(mintStatus3).to.equal(false);
	});

	it('should reject unlock nft (minting phase stop)', async () => {
		await expect(randomness.unlockNft(user1)).to.be.revertedWith('MPS');
	});

	it('should unlock nft', async () => {
		await randomness.startMintPhase(70, 1000);
		await randomness.unlockNft(user1);

		const getnftcount = await randomness.getNftCount();
		expect(getnftcount).to.equal(1);
	});

	it('should show user1 nft data', async () => {
		const user1Data = await randomness.getOneNft(user1);
		// console.log('user1', user1Data);
		expect(user1Data['status']).to.be.a('number');
	});

	it('should reject unlock nft (key identifier already exists)', async () => {
		await expect(randomness.unlockNft(user1)).to.be.revertedWith('KAE');
	});

	it('should unlock more nft', async () => {
		await randomness.unlockNft(user2);

		const getnftcount1 = await randomness.getNftCount();
		expect(getnftcount1).to.equal(2);

		await randomness.unlockNft(user3);

		const getnftcount2 = await randomness.getNftCount();
		expect(getnftcount2).to.equal(3);
	});

	it('should show user2, user3 nft data', async () => {
		const user2Data = await randomness.getOneNft(user2);
		// console.log('user2', user2Data);
		expect(user2Data['status']).to.be.a('number');

		const user3Data = await randomness.getOneNft(user3);
		// console.log('user3', user3Data);
		expect(user3Data['status']).to.be.a('number');
	});
});
