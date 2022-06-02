import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe.only('AccessPass TEST', async () => {
	let AccessPass: any;
	let accesspass: any;

	const openseaProxy: string = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';
	const mainUrl: string = 'https://www.nftxt.xyz';
	const mainCost: BigNumber = ethers.utils.parseEther('0.1');

	const owner: string = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
	const receiver: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';

	before(async () => {
		AccessPass = await ethers.getContractFactory('AccessPass');
		accesspass = await AccessPass.deploy(openseaProxy, 111);
		accesspass.deployed();
	});

	it('should initialize base accesspass data', async () => {
		const proxyregistry: string = await accesspass.proxyRegistry();
		expect(proxyregistry).to.equal(openseaProxy);

		const totalaccesspasses: number = await accesspass.totalAccessPasses();
		expect(totalaccesspasses).to.equal(111);
	});

	it('should initialize accesspass base url', async () => {
		const url1: string = await accesspass.getBaseURI();
		expect(url1).to.equal('');

		const blockChain = await accesspass.setBaseURI(mainUrl);
		await blockChain.wait();

		const url2: string = await accesspass.getBaseURI();
		expect(url2).to.equal(mainUrl);
	});

	it('should initialize accesspass hash url', async () => {
		const url1: string = await accesspass.contractURI();
		expect(url1).to.equal('ipfs://TODO');

		const blockChain = await accesspass.setContractURIHash('ABCDEF');
		await blockChain.wait();

		const url2: string = await accesspass.contractURI();
		expect(url2).to.equal('ipfs://ABCDEF');
	});

	it('should reject accesspass royalty (Max Roalty check failed! > 20%)', async () => {
		await expect(accesspass.setSellerFeeBasisPoints(201)).to.be.revertedWith('Max Roalty check failed! > 20%');
	});

	it('should process accesspass royalty', async () => {
		const blockChain1 = await accesspass.setIsOpenSeaProxyActive(true);
		await blockChain1.wait();

		const blockChain2 = await accesspass.setSellerFeeBasisPoints(199);
		await blockChain2.wait();

		const blockChain3 = await accesspass.setRoyaltyPayout(receiver);
		await blockChain3.wait();

		const sellerfeebasispoints: number = await accesspass.sellerFeeBasisPoints();
		expect(sellerfeebasispoints).to.equal(199);
	});

	it('should reject accesspass token (Nonexistent token)', async () => {
		await expect(accesspass.tokenURI(0)).to.be.revertedWith('Nonexistent token');
	});

	it('should reject accesspass royalty (Nonexistent token)', async () => {
		await expect(accesspass.royaltyInfo(0, mainCost)).to.be.revertedWith('Nonexistent token');
	});

	it('should mint accesspass 0', async () => {
		const blockChain = await accesspass.mint();
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];

		const newTokenId: number = Number(blockChainEvent.args['tokenId']);
		expect(newTokenId).to.equal(0);
	});

	it('should get accesspass token 0', async () => {
		const tokenUrl: string = await accesspass.tokenURI(0);
		expect(tokenUrl).to.equal(`${mainUrl}/0.json`);
	});

	it('should get accesspass royalty 0', async () => {
		const royaltyInfo = await accesspass.royaltyInfo(0, mainCost);
		// console.log(royaltyInfo);
		expect(royaltyInfo['receiver']).to.equal(receiver);
		expect(royaltyInfo['royaltyAmount']).to.equal(ethers.utils.parseEther('0.0199'));
	});
});
