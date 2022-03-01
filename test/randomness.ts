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

	// reference https://docs.chain.link/docs/vrf-contracts/
	const vrfCoordinator: string = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B';
	const linkToken: string = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
	const keyHash: string = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311';
	const fee: BigNumber = ethers.utils.parseEther('0.1');

	console.log('user:', user1, user2, user3);
	console.log('fee:', fee);

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

		const gettotalticket = await randomness.getTotalTickets();
		expect(gettotalticket).to.equal(0);

		const getwinningpercentahe = await randomness.getWinningPercentage();
		expect(getwinningpercentahe).to.equal(70);

		const mintStatus2 = await randomness.isMintingStart();
		expect(mintStatus2).to.equal(true);

		await randomness.stopMintPhase();

		const mintStatus3 = await randomness.isMintingStart();
		expect(mintStatus3).to.equal(false);
	});

	it('should reject unlock nft (minting phase stop)', async () => {
		await expect(randomness.unlockTestNft(user1)).to.be.revertedWith('MPS');
	});

	it('should unlock nft', async () => {
		await randomness.startMintPhase(70, 1000);
		await randomness.unlockTestNft(user1);

		const getnftcount = await randomness.getNftCount();
		expect(getnftcount).to.equal(1);
	});

	it('should show user1 nft data', async () => {
		const user1Data = await randomness.getOneNft(user1);
		// console.log('user1', user1Data);
		expect(user1Data['status']).to.be.a('number');
	});

	it('should reject unlock nft (key identifier already exists)', async () => {
		await expect(randomness.unlockTestNft(user1)).to.be.revertedWith('KAE');
	});

	it('should unlock more nft', async () => {
		await randomness.unlockTestNft(user2);

		const getnftcount1 = await randomness.getNftCount();
		expect(getnftcount1).to.equal(2);

		await randomness.unlockTestNft(user3);

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
