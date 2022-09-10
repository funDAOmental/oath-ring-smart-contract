import { expect } from 'chai';
import { BigNumber, Contract } from 'ethers';
import { ethers } from 'hardhat';
import { ethers as tsEthers } from 'ethers';

describe.only('OathRings', async () => {
	let OathRings: any;
	let oathRings: Contract

	let deployer: any;
	let user: tsEthers.Wallet;

	let OathRingsDescriptor: any;
	let oathRingsDescriptor: any;

	const openseaProxy: string = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';
	const dataUriPrefix: string = 'data:application/json;base64,';
	const mainCost: BigNumber = tsEthers.utils.parseEther('0.1');
	const goldQuantity: number = 337;
	const silverQuantity: number = 1000;

	const receiver1: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';
	const receiver2: string = '0x30eDEc1C25218F5a748cccc54C562d7879e47CaA';
	const receiver3: string = '0xB07243398f1d0094b64f4C0a61B8C03233914036';
	const receiver4: string = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';

	describe.only('Constructor', async () => {
		beforeEach(async () => {
			OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
			oathRingsDescriptor = await OathRingsDescriptor.deploy();
			oathRingsDescriptor.deployed();
			OathRings = await ethers.getContractFactory('OathRings');
			oathRings = await OathRings.deploy(openseaProxy, oathRingsDescriptor.address, goldQuantity, silverQuantity);
			oathRings.deployed();
		});

		it('should initialize proxyRegistry', async () => {
			const proxyRegistry: string = await oathRings.proxyRegistry();
			expect(proxyRegistry).to.equal(openseaProxy);
		});

		it('should initialize oathRingsDescriptor', async () => {
			const descriptor: string = await oathRings.oathRingsDescriptor();
			expect(descriptor).to.equal(oathRingsDescriptor.address);
		});

		it('should initialize totalOathRings', async () => {
			const totalOathRings: number = await oathRings.totalOathRings();
			expect(totalOathRings).to.equal(goldQuantity + silverQuantity);
		});

		it('should initialize goldQuantity', async () => {
			const goldQuantity: number = await oathRings.goldQuantity();
			expect(goldQuantity).to.equal(goldQuantity);
		});

		it('should initialize silverQuantity', async () => {
			const silverQuantity: number = await oathRings.silverQuantity();
			expect(silverQuantity).to.equal(silverQuantity);
		});
	});

	describe.only('Admin functions', async () => {
		beforeEach(async () => {
			OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
			oathRingsDescriptor = await OathRingsDescriptor.deploy();
			oathRingsDescriptor.deployed();
			OathRings = await ethers.getContractFactory('OathRings');
			oathRings = await OathRings.deploy(openseaProxy, oathRingsDescriptor.address, goldQuantity, silverQuantity);
			oathRings.deployed();
		});

		it('should updated oathRingsDescriptor', async () => {
			const newAddress = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';

			await await oathRings.setOathRingsDescriptor(newAddress);
			const expected: string = await oathRings.oathRingsDescriptor();

			expect(expected).to.equal(newAddress);
		});

		it('should revert setOathRingsDescriptor for AddressZero', async () => {
			await expect(oathRings.setOathRingsDescriptor(ethers.constants.AddressZero)).to.be.revertedWith(
				'INVALID_ADDRESS'
			);
		});

		it('should update oathRings hash url', async () => {
			const url1: string = await oathRings.contractURI();
			expect(url1).to.equal('ipfs://TODO');

			const blockChain = await oathRings.setContractURIHash('ABCDEF');
			await blockChain.wait();

			const url2: string = await oathRings.contractURI();
			expect(url2).to.equal('ipfs://ABCDEF');
		});

		it('should reject oathRings royalty (Max royalty check failed! > 20%)', async () => {
			await expect(oathRings.setSellerFeeBasisPoints(201)).to.be.revertedWith('Max royalty check failed! > 20%');
		});

		it('should process oathRings royalty', async () => {
			await (await oathRings.setIsOpenSeaProxyActive(true)).wait();
			await (await oathRings.setSellerFeeBasisPoints(199)).wait();
			await (await oathRings.setRoyaltyPayout(receiver1)).wait();

			const sellerFeeBasisPoints: number = await oathRings.sellerFeeBasisPoints();
			expect(sellerFeeBasisPoints).to.equal(199);
		});

		it('should reject oathRings token (non-existent tokenId)', async () => {
			await expect(oathRings.tokenURI(0)).to.be.revertedWith('non-existent tokenId');
		});

		it('should reject oathRings royalty (non-existent tokenId)', async () => {
			await expect(oathRings.royaltyInfo(0, mainCost)).to.be.revertedWith('non-existent tokenId');
		});

		it('should get oathRings royalty 0', async () => {
			// Setup
			await (await oathRings.mintGold(1)).wait();
			await (await oathRings.setRoyaltyPayout(receiver1)).wait();

			const royaltyInfo = await oathRings.royaltyInfo(0, mainCost);
			expect(royaltyInfo['receiver']).to.equal(receiver1);
			expect(royaltyInfo['royaltyAmount']).to.equal(ethers.utils.parseEther('0.01'));
		});

		it('should get OathRingsCount 0', async () => {
			const tokenCount: number = await oathRings.getTotalOathRings();
			expect(tokenCount).to.equal(0);
		});
	});

	describe.only('Mint functions Gold', async () => {
		beforeEach(async () => {
			deployer = (await ethers.getSigners())[0];
			user = new ethers.Wallet('0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef', deployer.provider);
			OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
			oathRingsDescriptor = await OathRingsDescriptor.deploy();
			oathRingsDescriptor.deployed();
			OathRings = await ethers.getContractFactory('OathRings');
			oathRings = await OathRings.deploy(openseaProxy, oathRingsDescriptor.address, 7, 7);
			oathRings.deployed();
		});

		it('should reject oathRings mint (quantity exceeds max per tx)', async () => {
			await expect(oathRings.mintGold(6)).to.be.revertedWith('quantity exceeds max per tx');
		});

		it('should reject oathRings mint maxSupply reached', async () => {
			await oathRings.mintGold(5);
			await oathRings.mintGold(2);
			await expect(oathRings.mintGold(2)).to.be.revertedWith('quantity exceeds max supply');
		});

		it('should mintToGold user oathRings 0', async () => {
			const tx = await oathRings.mintToGold(user.address, 1);
			const result = await tx.wait();
			const blockChainEvent = result.events[0];
			const newTokenId: number = Number(blockChainEvent.args['tokenId']);
			expect(newTokenId).to.equal(0);
			expect(await oathRings.balanceOf(user.address)).to.equal(1);
		});

		it('should mint oathRings 0', async () => {
			const blockChain = await oathRings.mintGold(1);
			const blockChainWait = await blockChain.wait();

			const blockChainEvent = blockChainWait.events[0];
			const newTokenId: number = Number(blockChainEvent.args['tokenId']);
			expect(newTokenId).to.equal(0);
		});

		it('should get oathRings token 0 type gold', async () => {
			await await oathRings.mintGold(1);

			const collectionPrefix = await oathRingsDescriptor.__collectionPrefix();

			const tokenId = 0;
			const base64EncodedData: string = await oathRings.tokenURI(0);

			const name = ' High Council';
			const description = await oathRingsDescriptor.collectionGoldDetails();
			const image = await oathRingsDescriptor.collectionGoldImage();

			expect(await oathRings.balanceOf(deployer.address)).to.equal(1);
			expect(await oathRings.tokenType(0)).to.equal(true);
			expect(base64EncodedData).to.include(dataUriPrefix);

			const metadata = JSON.parse(atob(base64EncodedData.split(',')[1]));

			// Check name was correctly combined
			expect(metadata.name).to.equal(collectionPrefix + tokenId.toString() + name);

			// Check description was correctly combined
			expect(metadata.description).to.equal(description);

			// Check image is set to collectionImage
			expect(metadata.image).to.deep.equal(image);
		});
	});

	describe.only('Mint functions Silver', async () => {
		beforeEach(async () => {
			deployer = (await ethers.getSigners())[0];
			user = new ethers.Wallet('0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef', deployer.provider);
			OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
			oathRingsDescriptor = await OathRingsDescriptor.deploy();
			oathRingsDescriptor.deployed();
			OathRings = await ethers.getContractFactory('OathRings');
			oathRings = await OathRings.deploy(openseaProxy, oathRingsDescriptor.address, 7, 7);
			oathRings.deployed();
		});

		it('should reject oathRings mint (quantity exceeds max per tx)', async () => {
			await expect(oathRings.mintSilver(6)).to.be.revertedWith('quantity exceeds max per tx');
		});

		it('should reject oathRings mint gold token not minted', async () => {
			await expect(oathRings.mintSilver(2)).to.be.revertedWith('gold token is not yet minted');
		});

		it('should reject oathRings mint maxSupply reached', async () => {
			await oathRings.mintGold(5);
			await oathRings.mintGold(2);

			await oathRings.mintSilver(5);
			await oathRings.mintSilver(2);
			await expect(oathRings.mintSilver(2)).to.be.revertedWith('quantity exceeds max supply');
		});

		it('should mint oathRings 0', async () => {
			await oathRings.mintGold(5);
			await oathRings.mintGold(2);

			const blockChain = await oathRings.mintSilver(1);
			const blockChainWait = await blockChain.wait();

			const blockChainEvent = blockChainWait.events[0];
			const newTokenId: number = Number(blockChainEvent.args['tokenId']);
			expect(newTokenId).to.equal(7);
		});

		it('should mintToSilver user oathRings 0', async () => {
			await oathRings.mintGold(5);
			await oathRings.mintGold(2);

			const tx = await oathRings.mintToSilver(user.address, 1);
			const result = await tx.wait();
			const blockChainEvent = result.events[0];
			const newTokenId: number = Number(blockChainEvent.args['tokenId']);
			expect(newTokenId).to.equal(7);
			expect(await oathRings.balanceOf(user.address)).to.equal(1);
		});

		it('should get oathRings token 0 type silver', async () => {
			await oathRings.mintGold(5);
			await oathRings.mintGold(2);
			await await oathRings.mintSilver(1);

			const collectionPrefix = await oathRingsDescriptor.__collectionPrefix();

			const tokenId = 7;
			const base64EncodedData: string = await oathRings.tokenURI(7);

			const name = ' Low Council';
			const description = await oathRingsDescriptor.collectionSilverDetails();
			const image = await oathRingsDescriptor.collectionSilverImage();

			expect(await oathRings.balanceOf(deployer.address)).to.equal(8);
			expect(await oathRings.tokenType(7)).to.equal(false);
			expect(base64EncodedData).to.include(dataUriPrefix);

			const metadata = JSON.parse(atob(base64EncodedData.split(',')[1]));

			// Check name was correctly combined
			expect(metadata.name).to.equal(collectionPrefix + tokenId.toString() + name);

			// Check description was correctly combined
			expect(metadata.description).to.equal(description);

			// Check image is set to collectionImage
			expect(metadata.image).to.deep.equal(image);
		});
	});
});
