import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe.only('AccessPass TEST', async () => {
	let AccessPass: any;
	let accesspass: any;

	let deployer: any;

	let AccessPassDescriptor: any;
	let accessPassDescriptor: any;

	const openseaProxy: string = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';
	const dataUriPrefix: string = 'data:application/json;base64,';
	const mainCost: BigNumber = ethers.utils.parseEther('0.1');
	const goldQuantity: number = 337;
	const silverQuantity: number = 1000;

	const receiver1: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';
	const receiver2: string = '0x30eDEc1C25218F5a748cccc54C562d7879e47CaA';
	const receiver3: string = '0xB07243398f1d0094b64f4C0a61B8C03233914036';
	const receiver4: string = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';

	describe.only('Constructor', async () => {
		beforeEach(async () => {
			AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
			accessPassDescriptor = await AccessPassDescriptor.deploy();
			accessPassDescriptor.deployed();
			AccessPass = await ethers.getContractFactory('AccessPass');
			accesspass = await AccessPass.deploy(openseaProxy, accessPassDescriptor.address, goldQuantity, silverQuantity);
			accesspass.deployed();
		});

		it('should initialize proxyRegistry', async () => {
			const proxyregistry: string = await accesspass.proxyRegistry();
			expect(proxyregistry).to.equal(openseaProxy);
		});

		it('should initialize accessPassDescriptor', async () => {
			const descriptor: string = await accesspass.accessPassDescriptor();
			expect(descriptor).to.equal(accessPassDescriptor.address);
		});

		it('should initialize totalAccessPasses', async () => {
			const totalaccesspasses: number = await accesspass.totalAccessPasses();
			expect(totalaccesspasses).to.equal(goldQuantity + silverQuantity);
		});

		it('should initialize goldQuantity', async () => {
			const goldQuantity: number = await accesspass.goldQuantity();
			expect(goldQuantity).to.equal(goldQuantity);
		});

		it('should initialize silverQuantity', async () => {
			const silverQuantity: number = await accesspass.silverQuantity();
			expect(silverQuantity).to.equal(silverQuantity);
		});
	});

	describe.only('Admin functions', async () => {
		beforeEach(async () => {
			AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
			accessPassDescriptor = await AccessPassDescriptor.deploy();
			accessPassDescriptor.deployed();
			AccessPass = await ethers.getContractFactory('AccessPass');
			accesspass = await AccessPass.deploy(openseaProxy, accessPassDescriptor.address, goldQuantity, silverQuantity);
			accesspass.deployed();
		});

		it('should updated accessPassDescriptor', async () => {
			const newAddress = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';

			await await accesspass.setAccessPassDescriptor(newAddress);
			const expected: string = await accesspass.accessPassDescriptor();

			expect(expected).to.equal(newAddress);
		});

		it('should revert setAccessPassDescriptor for AddressZero', async () => {
			await expect(accesspass.setAccessPassDescriptor(ethers.constants.AddressZero)).to.be.revertedWith(
				'INVALID_ADDRESS'
			);
		});

		it('should update accesspass hash url', async () => {
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

		it('should reject accesspass token (Nonexistent token)', async () => {
			await expect(accesspass.tokenURI(0)).to.be.revertedWith('Nonexistent token');
		});

		it('should reject accesspass royalty (Nonexistent token)', async () => {
			await expect(accesspass.royaltyInfo(0, mainCost)).to.be.revertedWith('Nonexistent token');
		});

		it('should get accesspass royalty 0', async () => {
			// Setup
			await await accesspass.mintGold(1);
			await await accesspass.setRoyaltyPayout(receiver1);

			const royaltyInfo = await accesspass.royaltyInfo(0, mainCost);
			expect(royaltyInfo['receiver']).to.equal(receiver1);
			expect(royaltyInfo['royaltyAmount']).to.equal(ethers.utils.parseEther('0.01'));
		});

		it('should get AccessPassCount 0', async () => {
			const tokenCount: number = await accesspass.getAccessPassCount();
			expect(tokenCount).to.equal(0);
		});
	});

	describe.only('Mint functions Gold', async () => {
		beforeEach(async () => {
			deployer = (await ethers.getSigners())[0];
			AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
			accessPassDescriptor = await AccessPassDescriptor.deploy();
			accessPassDescriptor.deployed();
			AccessPass = await ethers.getContractFactory('AccessPass');
			accesspass = await AccessPass.deploy(openseaProxy, accessPassDescriptor.address, 7, 7);
			accesspass.deployed();
		});

		it('should reject accesspass mint (quantity exceeds max per tx)', async () => {
			await expect(accesspass.mintGold(6)).to.be.revertedWith('quantity exceeds max per tx');
		});

		it('should reject accesspass mint maxSupply reached', async () => {
			await accesspass.mintGold(5);
			await accesspass.mintGold(2);
			await expect(accesspass.mintGold(2)).to.be.revertedWith('quantity exceeds max supply');
		});

		it('should mint accesspass 0', async () => {
			const blockChain = await accesspass.mintGold(1);
			const blockChainWait = await blockChain.wait();

			const blockChainEvent = blockChainWait.events[0];
			const newTokenId: number = Number(blockChainEvent.args['tokenId']);
			expect(newTokenId).to.equal(0);
		});

		it('should get accesspass token 0 type gold', async () => {
			await await accesspass.mintGold(1);

			const tokenId = 0;
			const base64EncodedData: string = await accesspass.tokenURI(0);
			const name = await accessPassDescriptor.collectionGoldPrefix();
			const description = await accessPassDescriptor.collectionGoldDetails();
			const image = await accessPassDescriptor.collectionGoldImage();
			const attributes: any = ['type', 'â\u0098\u0089'];

			expect(await accesspass.balanceOf(deployer.address)).to.equal(1);

			const metadata = JSON.parse(atob(base64EncodedData.split(',')[1]));
			expect(base64EncodedData).to.include(dataUriPrefix);

			// Check name was correctly combined
			expect(metadata.name).to.equal(name + tokenId.toString());

			// Check description was correctly combined
			expect(metadata.description).to.equal(description + tokenId);

			// Check image is set to collectionImage
			expect(metadata.image).to.deep.equal(image);

			// Check attribues are set correctly
			expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
			expect(metadata.attributes[0].value).to.equal(attributes[1]);
		});
	});

	describe.only('Mint functions Silver', async () => {
		beforeEach(async () => {
			deployer = (await ethers.getSigners())[0];
			AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
			accessPassDescriptor = await AccessPassDescriptor.deploy();
			accessPassDescriptor.deployed();
			AccessPass = await ethers.getContractFactory('AccessPass');
			accesspass = await AccessPass.deploy(openseaProxy, accessPassDescriptor.address, 7, 7);
			accesspass.deployed();
		});

		it('should reject accesspass mint (quantity exceeds max per tx)', async () => {
			await expect(accesspass.mintSilver(6)).to.be.revertedWith('quantity exceeds max per tx');
		});

		it('should reject accesspass mint maxSupply reached', async () => {
			await accesspass.mintSilver(5);
			await accesspass.mintSilver(2);
			await expect(accesspass.mintSilver(2)).to.be.revertedWith('quantity exceeds max supply');
		});

		it('should mint accesspass 0', async () => {
			const blockChain = await accesspass.mintSilver(1);
			const blockChainWait = await blockChain.wait();

			const blockChainEvent = blockChainWait.events[0];
			const newTokenId: number = Number(blockChainEvent.args['tokenId']);
			expect(newTokenId).to.equal(0);
		});

		// it('should get accesspass token 0 type silver', async () => {
		// 	await await accesspass.mintSilver(1);

		// 	const tokenId = 0;
		// 	const base64EncodedData: string = await accesspass.tokenURI(0);
		// 	const name = await accessPassDescriptor.collectionSilverPrefix();
		// 	const description = await accessPassDescriptor.collectionSilverDetails();
		// 	const image = await accessPassDescriptor.collectionSilverImage();
		// 	const attributes: any = ['type', 'â\u0098\u0089'];

		// 	expect(await accesspass.balanceOf(deployer.address)).to.equal(1);

		// 	const metadata = JSON.parse(atob(base64EncodedData.split(',')[1]));
		// 	expect(base64EncodedData).to.include(dataUriPrefix);

		// 	// Check name was correctly combined
		// 	expect(metadata.name).to.equal(name + tokenId.toString());

		// 	// // Check description was correctly combined
		// 	// expect(metadata.description).to.equal(description + tokenId);

		// 	// // Check image is set to collectionImage
		// 	// expect(metadata.image).to.deep.equal(image);

		// 	// // Check attribues are set correctly
		// 	// expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
		// 	// expect(metadata.attributes[0].value).to.equal(attributes[1]);
		// });
	});
});
