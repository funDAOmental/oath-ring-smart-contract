import { expect } from 'chai';
import { ethers } from 'hardhat';

describe.only('gmkeys', async () => {
	let GMKeys: any;
	let gmkeys: any;

	const randomessContract: string = '0xaE0A647EBa5a817f1b183303305b715E22391d1e';

	const baseTokenURI: string = 'https://www.jnpl.me/metadata?id=';

	const receiver1: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';
	const identifier1: string = 'EPN001-0x58933D8678b574349bE3CdDd3de115468e8cb3f0-A';
	const receiver2: string = '0x30eDEc1C25218F5a748cccc54C562d7879e47CaA';
	const identifier2: string = 'EPN001-0x30eDEc1C25218F5a748cccc54C562d7879e47CaA-B';

	before(async () => {
		GMKeys = await ethers.getContractFactory('GMKeys');
		gmkeys = await GMKeys.deploy(baseTokenURI, ethers.utils.parseEther('0.1'));
		gmkeys.deployed();
	});

	it('should initialize gmkey contract', async () => {
		const address1 = await gmkeys.getOneAddress('EP001-0x9A32c490883adb80BDf05355D7D3FFBd283ddc67');
		expect(address1['exists']).to.equal(false); // sample invalid address

		expect(await gmkeys.getPrice()).to.equal(ethers.utils.parseEther('0.1'));

		expect(await gmkeys.getBaseURI()).to.equal('https://www.jnpl.me/metadata?id=');
	});

	it('should start/stop minting', async () => {
		const mintStatus1 = await gmkeys.isMintingStart();
		expect(mintStatus1).to.equal(false);

		await gmkeys.startMintPhase(1111);

		const gettotalkeys = await gmkeys.getTotalKeys();
		expect(gettotalkeys).to.equal(1111);

		const mintStatus2 = await gmkeys.isMintingStart();
		expect(mintStatus2).to.equal(true);

		await gmkeys.stopMintPhase();

		const mintStatus3 = await gmkeys.isMintingStart();
		expect(mintStatus3).to.equal(false);
	});

	it('should reject generate gmkeys (minting phase stop)', async () => {
		await expect(
			gmkeys.mintTestKeys(receiver1, identifier1, randomessContract, 1, {
				value: ethers.utils.parseEther('0.1'),
			})
		).to.be.revertedWith('MPS');
	});

	it('should generate gmkeys (1)', async () => {
		await gmkeys.startMintPhase(1111);

		const blockChain = await gmkeys.mintTestKeys(receiver1, identifier1, randomessContract, 1, {
			value: ethers.utils.parseEther('0.1'),
		});
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['tokenId']);

		expect(newTokenId).to.equal(0);
		expect(await gmkeys.getNftCount()).to.equal(1);

		const tokenURI = await gmkeys.tokenURI(newTokenId);
		expect(tokenURI).to.equal(`${baseTokenURI}${newTokenId}`);

		// const blockChainAll = await gmkeys.getAllNft();
		// console.log(blockChainAll);
	});

	it('should reject the gmkeys (not enough coins)', async () => {
		await expect(
			gmkeys.mintTestKeys(receiver1, identifier1, randomessContract, 1, {
				value: ethers.utils.parseEther('0.01'),
			})
		).to.be.revertedWith('NEC');
	});

	it('should get all gmkeys data (result 1)', async () => {
		const blockChainAll = await gmkeys.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(1);
	});

	it('should get gmkeys data 0', async () => {
		const blockChain = await gmkeys.getOneNft(0);
		// console.log(blockChain);
		expect(blockChain['receiver']).to.equal(receiver1);
	});

	it('should reject get blockchain (token id dosent exists)', async () => {
		await expect(gmkeys.getOneNft(10)).to.be.revertedWith('TID');
	});

	it('should generate gmkeys new reciever1 (4)', async () => {
		const blockChain = await gmkeys.mintTestKeys(receiver1, identifier1, randomessContract, 4, {
			value: ethers.utils.parseEther('0.4'),
		});
		await blockChain.wait();
		expect(await gmkeys.getNftCount()).to.equal(5);
	});

	it('should reject get gmkeys (max user/address max gmkeys has been mint)', async () => {
		await expect(
			gmkeys.mintTestKeys(receiver1, identifier1, randomessContract, 1, {
				value: ethers.utils.parseEther('0.1'),
			})
		).to.be.revertedWith('AMM');
	});

	it('should generate gmkeys new reciever2 (3)', async () => {
		const blockChain = await gmkeys.mintTestKeys(receiver2, identifier2, randomessContract, 3, {
			value: ethers.utils.parseEther('0.3'),
		});
		await blockChain.wait();
		expect(await gmkeys.getNftCount()).to.equal(8);
	});

	it('should check address of recievers', async () => {
		const address1 = await gmkeys.getOneAddress(identifier1);
		// console.log(address1);
		expect(address1['currentAddress']).to.equal(receiver1);
		expect(address1['currentUnit']).to.equal(5);
		expect(address1['exists']).to.equal(true);

		const address2 = await gmkeys.getOneAddress(identifier2);
		// console.log(address2);
		expect(address2['currentAddress']).to.equal(receiver2);
		expect(address2['currentUnit']).to.equal(3);
		expect(address2['exists']).to.equal(true);
	});

	it('should get all gmkeys data by epoch (result 8)', async () => {
		const getmintedkeys = await gmkeys.getMintedKeys();
		expect(getmintedkeys).to.equal(8);
	});

	it('should get all gmkeys data (result 8)', async () => {
		const blockChainAll = await gmkeys.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(8);
	});

	it('should burn gmkeys', async () => {
		await gmkeys.burnKeys(0);

		await expect(gmkeys.getOneNft(0)).to.be.revertedWith('TID');
	});

	it('should withdraw contract balance', async () => {
		const ethBalance = await gmkeys.getEthBalance();
		expect(Number(ethBalance)).to.equal(800000000000000000);

		const withdraw = await gmkeys.withdrawEthBalance();
		const blockChainWait = await withdraw.wait();
		expect(blockChainWait.status).to.equal(1);
	});
});
