import { expect } from 'chai';
import { ethers } from 'hardhat';

describe.only('zerokeys', async () => {
	let ZEROKeys: any;
	let zerokeys: any;

	const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';
	const baseTokenURI: string = 'https://www.jnpl.me/metadata?id=';

	const receiver1: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';
	const receiver2: string = '0x30eDEc1C25218F5a748cccc54C562d7879e47CaA';

	before(async () => {
		ZEROKeys = await ethers.getContractFactory('ZEROKeys');
		zerokeys = await ZEROKeys.deploy(baseTokenURI, ethers.utils.parseEther('0.1'));
		zerokeys.deployed();
	});

	it('should initialize zerokey contract', async () => {
		expect(await zerokeys.getPrice()).to.equal(ethers.utils.parseEther('0.1'));

		expect(await zerokeys.getBaseURI()).to.equal('https://www.jnpl.me/metadata?id=');
	});

	it('should start/stop minting', async () => {
		const mintStatus1 = await zerokeys.isMintingStart();
		expect(mintStatus1).to.equal(false);

		await zerokeys.startMintPhase(1111);

		const gettotalkeys = await zerokeys.getTotalKeys();
		expect(gettotalkeys).to.equal(1111);

		const mintStatus2 = await zerokeys.isMintingStart();
		expect(mintStatus2).to.equal(true);

		await zerokeys.stopMintPhase();

		const mintStatus3 = await zerokeys.isMintingStart();
		expect(mintStatus3).to.equal(false);
	});

	it('should reject generate zerokeys (minting phase stop)', async () => {
		await expect(
			zerokeys.mintTestKeys(receiver1, 1, {
				value: ethers.utils.parseEther('0.1'),
			})
		).to.be.revertedWith('MPS');
	});

	it('should generate zerokeys (1)', async () => {
		await zerokeys.startMintPhase(1111);

		const blockChain = await zerokeys.mintTestKeys(receiver1, 1, {
			value: ethers.utils.parseEther('0.1'),
		});
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['tokenId']);

		expect(newTokenId).to.equal(0);
		expect(await zerokeys.getNftCount()).to.equal(1);

		const tokenURI = await zerokeys.tokenURI(newTokenId);
		expect(tokenURI).to.equal(`${baseTokenURI}${newTokenId}`);

		// const blockChainAll = await zerokeys.getAllNft();
		// console.log(blockChainAll);
	});

	it('should reject the zerokeys (not enough coins)', async () => {
		await expect(
			zerokeys.mintTestKeys(receiver1, 1, {
				value: ethers.utils.parseEther('0.01'),
			})
		).to.be.revertedWith('NEC');
	});

	it('should get all zerokeys data (result 1)', async () => {
		const blockChainAll = await zerokeys.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(1);
	});

	it('should get zerokeys data 0', async () => {
		const blockChain = await zerokeys.getOneNft(0);
		// console.log(blockChain);
		expect(blockChain['receiver']).to.equal(receiver1);
	});

	it('should reject get blockchain (token id dosent exists)', async () => {
		await expect(zerokeys.getOneNft(10)).to.be.revertedWith('TID');
	});

	it('should generate zerokeys new reciever1 (4)', async () => {
		const blockChain = await zerokeys.mintTestKeys(receiver1, 4, {
			value: ethers.utils.parseEther('0.4'),
		});
		await blockChain.wait();
		expect(await zerokeys.getNftCount()).to.equal(5);
	});

	it('should generate zerokeys new reciever2 (3)', async () => {
		const blockChain = await zerokeys.mintTestKeys(receiver2, 3, {
			value: ethers.utils.parseEther('0.3'),
		});
		await blockChain.wait();
		expect(await zerokeys.getNftCount()).to.equal(8);
	});

	it('should get all zerokeys data by epoch (result 8)', async () => {
		const getmintedkeys = await zerokeys.getMintedKeys();
		expect(getmintedkeys).to.equal(8);
	});

	it('should get all zerokeys data (result 8)', async () => {
		const blockChainAll = await zerokeys.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(8);
	});

	it('should burn zerokeys', async () => {
		await zerokeys.burnKeys(0);

		await expect(zerokeys.getOneNft(0)).to.be.revertedWith('TID');
	});

	it('should withdraw contract balance', async () => {
		const ethBalance = await zerokeys.getEthBalance();
		expect(Number(ethBalance)).to.equal(800000000000000000);

		const withdraw = await zerokeys.withdrawEthBalance();
		const blockChainWait = await withdraw.wait();
		expect(blockChainWait.status).to.equal(1);
	});
});
