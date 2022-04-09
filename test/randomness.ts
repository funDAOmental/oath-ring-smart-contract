import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe.only('randomness', async () => {
	let Randomness: any;
	let randomness: any;

	// const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';

	const epoch: number = 1;
	const lastEpoch: number = 7;
	const user1: string = 'EP001-USERA-1';
	const user2: string = 'EP001-USERA-2';
	const user3: string = 'EP001-USERB-1';
	const user4: string = 'EP001-USERB-LASTEPOCH';

	// reference https://docs.chain.link/docs/vrf-contracts/
	const vrfCoordinator: string = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B';
	const linkToken: string = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
	const keyHash: string = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311';
	const fee: BigNumber = ethers.utils.parseEther('0.1');

	// console.log('user:', user1, user2, user3);
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

		await randomness.startMintPhase(3000, epoch);

		const getmintedtickets = await randomness.getMintedTickets();
		expect(getmintedtickets).to.equal(0);

		const gettotaltickets = await randomness.getTotalTickets();
		expect(gettotaltickets).to.equal(3000);

		const getremainingtickets = await randomness.getRemainingTickets();
		expect(getremainingtickets).to.equal(3000);

		const getwinningpercentage = await randomness.getWinningPercentage();
		expect(getwinningpercentage).to.equal(74);

		const mintStatus2 = await randomness.isMintingStart();
		expect(mintStatus2).to.equal(true);

		await randomness.stopMintPhase();

		const mintStatus3 = await randomness.isMintingStart();
		expect(mintStatus3).to.equal(false);
	});

	it('should reject unlock nft (minting phase stop)', async () => {
		await expect(randomness.unlockTestNft(user1, epoch)).to.be.revertedWith('MPS');
	});

	it('should start first epoch', async () => {
		await randomness.startMintPhase(4011, epoch);

		const getmintedtickets = await randomness.getMintedTickets();
		expect(getmintedtickets).to.equal(0);

		const gettotaltickets = await randomness.getTotalTickets();
		expect(gettotaltickets).to.equal(4011);

		const getremainingtickets = await randomness.getRemainingTickets();
		expect(getremainingtickets).to.equal(4011);

		const getwinningpercentage = await randomness.getWinningPercentage();
		expect(getwinningpercentage).to.equal(100);
	});

	it('should unlock nft', async () => {
		await randomness.unlockTestNft(user1, epoch);

		const getnftcount = await randomness.getNftCount();
		expect(getnftcount).to.equal(1);

		const getmintedticket = await randomness.getMintedTickets();
		expect(getmintedticket).to.equal(5);
	});

	it('should show user1 nft data', async () => {
		const user1Data = await randomness.getOneNft(user1);
		// console.log('user1', user1Data);
		expect(user1Data['tickets']).to.be.a('number');

		const user1Ticket = await randomness.getOneTicket(user1);
		// console.log('user1', user1Ticket);
		expect(user1Ticket[0]).to.equal(epoch);
	});

	it('should reject unlock nft (invalid active epoch)', async () => {
		await expect(randomness.unlockTestNft(user2, 2)).to.be.revertedWith('IAE');
	});

	it('should reject unlock nft (key identifier already exists)', async () => {
		await expect(randomness.unlockTestNft(user1, epoch)).to.be.revertedWith('KAE');
	});

	it('should unlock more nft', async () => {
		await randomness.unlockTestNft(user2, epoch);

		const getnftcount1 = await randomness.getNftCount();
		expect(getnftcount1).to.equal(2);

		await randomness.unlockTestNft(user3, epoch);

		const getnftcount2 = await randomness.getNftCount();
		expect(getnftcount2).to.equal(3);

		const getmintedticket = await randomness.getMintedTickets();
		expect(getmintedticket).to.equal(15);
	});

	it('should show user2, user3 nft data', async () => {
		const user2Data = await randomness.getOneNft(user2);
		// console.log('user2', user2Data);
		expect(user2Data['tickets']).to.be.a('number');

		const user2Ticket = await randomness.getOneTicket(user2);
		// console.log('user2', user2Ticket);
		expect(user2Ticket[0]).to.equal(epoch);

		const user3Data = await randomness.getOneNft(user3);
		// console.log('user3', user3Data);
		expect(user3Data['tickets']).to.be.a('number');

		const user3Ticket = await randomness.getOneTicket(user3);
		// console.log('user3', user3Ticket);
		expect(user3Ticket[0]).to.equal(epoch);
	});

	it('should start last epoch', async () => {
		await randomness.stopMintPhase();
		await randomness.startMintPhase(1000, lastEpoch);

		const getmintedtickets = await randomness.getMintedTickets();
		expect(getmintedtickets).to.equal(0);

		const gettotaltickets = await randomness.getTotalTickets();
		expect(gettotaltickets).to.equal(1000);

		const getremainingtickets = await randomness.getRemainingTickets();
		expect(getremainingtickets).to.equal(1000);

		const getwinningpercentage = await randomness.getWinningPercentage();
		expect(getwinningpercentage).to.equal(101);
	});

	it('should unlock more nft', async () => {
		await randomness.unlockTestNft(user4, lastEpoch);

		const getnftcount = await randomness.getNftCount();
		expect(getnftcount).to.equal(4);

		const getmintedticket = await randomness.getMintedTickets();
		expect(getmintedticket).to.equal(5);
	});

	it('should show user4 nft data', async () => {
		const user4Data = await randomness.getOneNft(user4);
		// console.log('user4', user4Data);
		expect(user4Data['tickets']).to.be.a('number');

		const user4Ticket = await randomness.getOneTicket(user4);
		// console.log('user4', user4Ticket);
		expect(user4Ticket[0]).to.equal(lastEpoch);
	});
});
