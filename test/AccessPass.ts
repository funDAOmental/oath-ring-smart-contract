import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe.only('AccessPass TEST', async () => {
	let AccessPass: any;
	let accesspass: any;

	let AccessPassDescriptor: any;
	let accessPassDescriptor: any;

	const openseaProxy: string = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';
	const mainUrl: string = 'https://www.nftxt.xyz';
	const mainCost: BigNumber = ethers.utils.parseEther('0.1');

	const receiver1: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';
	const receiver2: string = '0x30eDEc1C25218F5a748cccc54C562d7879e47CaA';
	const receiver3: string = '0xB07243398f1d0094b64f4C0a61B8C03233914036';
	const receiver4: string = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';

	before(async () => {
		AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
		accessPassDescriptor = await AccessPassDescriptor.deploy();
		accessPassDescriptor.deployed()
		AccessPass = await ethers.getContractFactory('AccessPass');
		accesspass = await AccessPass.deploy(openseaProxy, accessPassDescriptor.address, 337);
		accesspass.deployed();
	});

	it('should initialize base accesspass data', async () => {
		const proxyregistry: string = await accesspass.proxyRegistry();
		expect(proxyregistry).to.equal(openseaProxy);

		const descriptor: string = await accesspass.accessPassDescriptor();
		expect(descriptor).to.equal(accessPassDescriptor.address);

		const totalaccesspasses: number = await accesspass.totalAccessPasses();
		expect(totalaccesspasses).to.equal(337);
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

		const blockChain3 = await accesspass.setRoyaltyPayout(receiver1);
		await blockChain3.wait();

		const sellerfeebasispoints: number = await accesspass.sellerFeeBasisPoints();
		expect(sellerfeebasispoints).to.equal(199);
	});

	it('should reject accesspass token (nonexistent token)', async () => {
		await expect(accesspass.tokenURI(0)).to.be.revertedWith('nonexistent token');
	});

	it('should reject accesspass royalty (nonexistent token)', async () => {
		await expect(accesspass.royaltyInfo(0, mainCost)).to.be.revertedWith('nonexistent token');
	});

	it('should reject accesspass mint (quantity exceeds)', async () => {
		await expect(accesspass.mint(6)).to.be.revertedWith('quantity exceeds');
	});

	it('should mint accesspass 0', async () => {
		const blockChain = await accesspass.mint(1);
		const blockChainWait = await blockChain.wait();

		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['tokenId']);
		expect(newTokenId).to.equal(0);
	});

	it('should get accesspass token 0', async () => {
		const tokenUrl: string = await accesspass.tokenURI(0);
		expect(tokenUrl).to.equal(`${mainUrl}/0.json`);
	});

	it('should get accesspass count 0', async () => {
		const tokenCount: number = await accesspass.getAccesspassCount();
		expect(tokenCount).to.equal(1);
	});

	it('should get accesspass royalty 0', async () => {
		const royaltyInfo = await accesspass.royaltyInfo(0, mainCost);
		// console.log(royaltyInfo);
		expect(royaltyInfo['receiver']).to.equal(receiver1);
		expect(royaltyInfo['royaltyAmount']).to.equal(ethers.utils.parseEther('0.0199'));
	});

	it('should mint accesspass 1', async () => {
		const blockChain = await accesspass.mintTo(receiver2, 1);
		const blockChainWait = await blockChain.wait();

		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['tokenId']);
		expect(newTokenId).to.equal(1);
	});

	it('should get accesspass token 1', async () => {
		const tokenUrl: string = await accesspass.tokenURI(1);
		expect(tokenUrl).to.equal(`${mainUrl}/1.json`);
	});

	it('should get accesspass count 1', async () => {
		const tokenCount: number = await accesspass.getAccesspassCount();
		expect(tokenCount).to.equal(2);
	});

	it('should get accesspass royalty 1', async () => {
		const royaltyInfo = await accesspass.royaltyInfo(1, mainCost);
		// console.log(royaltyInfo);
		expect(royaltyInfo['receiver']).to.equal(receiver1);
		expect(royaltyInfo['royaltyAmount']).to.equal(ethers.utils.parseEther('0.0199'));
	});
});
