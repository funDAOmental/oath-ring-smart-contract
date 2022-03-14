import { expect } from 'chai';
import { ethers } from 'hardhat';

describe.only('gmkeys', async () => {
	let GMKeys: any;
	let gmkeys: any;

	const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';
	const baseTokenURI: string = 'https://www.jnpl.me/metadata?id=';

	const receiver1: string = '0x30eDEc1C25218F5a748cccc54C562d7879e47CaA'; // can mint max 20 nft
	const receiver2: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0'; // can mint max 20 nft

	before(async () => {
		GMKeys = await ethers.getContractFactory('GMKeys');
		gmkeys = await GMKeys.deploy(baseTokenURI, ethers.utils.parseEther('0.1'));
		gmkeys.deployed();
	});

	it('should initialize gmkey contract', async () => {
		const address1 = await gmkeys.getOneAddress('0x9A32c490883adb80BDf05355D7D3FFBd283ddc67');
		expect(address1['exists']).to.equal(false); // sample invalid address

		expect(await gmkeys.getPrice()).to.equal(ethers.utils.parseEther('0.1'));

		expect(await gmkeys.getBaseURI()).to.equal('https://www.jnpl.me/metadata?id=');
	});

	it('should generate gmkeys', async () => {
		const blockChain = await gmkeys.mintKeys(receiver1, 'EP1', {
			value: ethers.utils.parseEther('0.1'),
		});
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['tokenId']);

		expect(newTokenId).to.equal(0);
		expect(await gmkeys.getNftCount()).to.equal(1);

		const tokenURI = await gmkeys.tokenURI(newTokenId);
		expect(tokenURI).to.equal(`${baseTokenURI}${newTokenId}`);
	});

	it('should reject the gmkeys (not enough coins)', async () => {
		await expect(
			gmkeys.mintKeys(receiver1, 'EP1', {
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
		// console.log(blockChain1);
		expect(blockChain['receiver']).to.equal(receiver1);
		expect(blockChain['epoch']).to.equal('EP1');
	});

	it('should reject get blockchain (token id dosent exists)', async () => {
		await expect(gmkeys.getOneNft(10)).to.be.revertedWith('TID');
	});

	it('should add to blockchain new reciever1', async () => {
		const blockChain = await gmkeys.mintKeys(receiver1, 'EP1', {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain.wait();
		expect(await gmkeys.getNftCount()).to.equal(2);
	});

	it('should add to blockchain new reciever2', async () => {
		const blockChain = await gmkeys.mintKeys(receiver2, 'EP1', {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain.wait();
		expect(await gmkeys.getNftCount()).to.equal(3);
	});

	it('should check address of recievers', async () => {
		const address1 = await gmkeys.getOneAddress(receiver1);
		// console.log(address1);
		expect(address1['maxUnit']).to.equal(20);
		expect(address1['currentUnit']).to.equal(2);
		expect(address1['exists']).to.equal(true);

		const address2 = await gmkeys.getOneAddress(receiver2);
		// console.log(address2);
		expect(address2['maxUnit']).to.equal(20);
		expect(address2['currentUnit']).to.equal(1);
		expect(address2['exists']).to.equal(true);
	});

	it('should get all gmkeys data (result 3)', async () => {
		const blockChainAll = await gmkeys.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(3);
	});

	it('should get my gmkeys', async () => {
		const [blockChainFiltered1, len1] = await gmkeys.getMyNft(receiver1);
		// console.log(blockChainFiltered1);
		expect(len1).to.equal(2);

		const [blockChainFiltered2, len2] = await gmkeys.getMyNft(receiver2);
		// console.log(blockChainFiltered2);
		expect(len2).to.equal(1);
	});
});
