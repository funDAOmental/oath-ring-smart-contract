import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('gmkey contract', async () => {
	let GMKey: any;
	let gMKey: any;

	const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';
	const baseTokenURI: string = 'https://www.jnpl.me/metadata?id=';

	const project1Name: string = 'CryptoKittens'; // set limit to 500
	const project1Code: string = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';
	const project2Name: string = 'CryptoPunks'; // set limit to 3
	const project2Code: string = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';

	// add to blockchain test data
	let newTokenId: number;
	const nftName: string = 'random-name';
	const ipfsText: string = 'QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'; // 'https://ipfs.io/ipfs/QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'
	const ipfsImage: string = 'QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'; // 'https://ipfs.io/ipfs/QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'

	const receiver1: string = '0x924634D6964E171498f2a292185b1554893D95E5'; // can mint unlimitted nft
	const receiver2: string = '0x30edec1c25218f5a748cccc54c562d7879e47caa'; // can mint max 3 nft
	const receiver3: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0'; // can mint max 3 nft

	before(async () => {
		GMKey = await ethers.getContractFactory('GMKey');
		gMKey = await GMKey.deploy(ownerAddress, baseTokenURI);
		gMKey.deployed();
	});

	it('should initialize gmkey contract', async () => {
		expect(await gMKey.getProjectCount()).to.equal(0);
		expect(await gMKey.getAddressCount()).to.equal(1);

		const project1 = await gMKey.getOneProject('0x9A32c490883adb80BDf05355D7D3FFBd283ddc67'); // sample invalid project
		expect(project1['exists']).to.equal(false);

		const address1 = await gMKey.getOneAddress('0x9A32c490883adb80BDf05355D7D3FFBd283ddc67'); // sample invalid address
		expect(address1['exists']).to.equal(false);

		const address2 = await gMKey.getOneAddress(ownerAddress); // sample address
		expect(address2['exists']).to.equal(true);

		expect(await gMKey.getBaseURI()).to.equal('https://www.jnpl.me/metadata?id=');
	});

	it('should add project', async () => {
		await gMKey.addProject(500, ethers.utils.parseEther('0.1'), project1Name, project1Code);
		expect(await gMKey.getProjectCount()).to.equal(1);

		await gMKey.addProject(3, ethers.utils.parseEther('0.1'), project2Name, project2Code);
		expect(await gMKey.getProjectCount()).to.equal(2);
	});

	it('should reject duplicate project (project already exixts)', async () => {
		await expect(gMKey.addProject(500, ethers.utils.parseEther('0.1'), project1Name, project1Code)).to.be.revertedWith(
			'project already exixts'
		);
	});

	it('should get project data 1', async () => {
		const project1 = await gMKey.getOneProject(project1Code);
		// console.log(project1);
		expect(project1['maxUnit']).to.equal(500);
		expect(project1['currentUnit']).to.equal(0);
		expect(project1['amount']).to.equal(ethers.utils.parseEther('0.1'));
		expect(project1['name']).to.equal(project1Name);
		expect(project1['exists']).to.equal(true);
	});

	it('should add to blockchain', async () => {
		const blockChain = await gMKey.addToBlockChain(receiver1, project1Code, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		newTokenId = Number(blockChainEvent.args['tokenId']);

		expect(await gMKey.getNftCount()).to.equal(1);

		const tokenURI = await gMKey.tokenURI(newTokenId);
		expect(tokenURI).to.equal(`${baseTokenURI}${newTokenId}`);
	});

	it('should reject to blockchain (project dosent exists)', async () => {
		await expect(
			gMKey.addToBlockChain(receiver1, '0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d', nftName, ipfsText, ipfsImage, {
				value: ethers.utils.parseEther('0.1'),
			})
		).to.be.revertedWith('project code dosent exixts');
	});

	it('should reject to blockchain (not enough coins)', async () => {
		await expect(
			gMKey.addToBlockChain(receiver1, project1Code, nftName, ipfsText, ipfsImage, {
				value: ethers.utils.parseEther('0.01'),
			})
		).to.be.revertedWith('not enough coins');
	});

	it('should get all blockchain data 1', async () => {
		const blockChainAll = await gMKey.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(1);
	});

	it('should get blockchain data 1', async () => {
		const blockChainOne = await gMKey.getOneNft(newTokenId);
		// console.log(blockChainOne);
		expect(blockChainOne['receiver']).to.equal(receiver1);
		expect(blockChainOne['amount']).to.equal(ethers.utils.parseEther('0.1'));
		expect(blockChainOne['code']).to.equal(project1Code);
		expect(blockChainOne['name']).to.equal(nftName);
		expect(blockChainOne['text']).to.equal(ipfsText);
		expect(blockChainOne['image']).to.equal(ipfsImage);
	});

	it('should max blockchain project creation (CryptoPunks)', async () => {
		const blockChain1 = await gMKey.addToBlockChain(receiver1, project2Code, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain1.wait();
		expect(await gMKey.getNftCount()).to.equal(2);

		const blockChain2 = await gMKey.addToBlockChain(receiver1, project2Code, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain2.wait();
		expect(await gMKey.getNftCount()).to.equal(3);

		const blockChain3 = await gMKey.addToBlockChain(receiver1, project2Code, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain3.wait();
		expect(await gMKey.getNftCount()).to.equal(4);
	});

	it('should reject to blockchain (max project has been mint)', async () => {
		await expect(
			gMKey.addToBlockChain(receiver1, project2Code, nftName, ipfsText, ipfsImage, {
				value: ethers.utils.parseEther('0.1'),
			})
		).to.be.revertedWith('max project has been mint');
	});

	it('should get project data 2', async () => {
		const project1 = await gMKey.getOneProject(project2Code);
		// console.log(project1);
		expect(project1['maxUnit']).to.equal(3);
		expect(project1['currentUnit']).to.equal(3);
		expect(project1['amount']).to.equal(ethers.utils.parseEther('0.1'));
		expect(project1['name']).to.equal(project2Name);
		expect(project1['exists']).to.equal(true);
	});

	it('should get all blockchain data 2', async () => {
		const blockChainAll = await gMKey.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(4);
	});

	it('should add to blockchain new reciever', async () => {
		const blockChain1 = await gMKey.addToBlockChain(receiver2, project1Code, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain1.wait();
		expect(await gMKey.getNftCount()).to.equal(5);
		expect(await gMKey.getAddressCount()).to.equal(2);

		const address1 = await gMKey.getOneAddress(receiver2);
		// console.log(address1);
		expect(address1['maxUnit']).to.equal(3);
		expect(address1['currentUnit']).to.equal(1);
		expect(address1['exists']).to.equal(true);
	});

	it('should max blockchain user creation (0x58933D8678b574349bE3CdDd3de115468e8cb3f0)', async () => {
		const blockChain1 = await gMKey.addToBlockChain(receiver3, project1Code, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain1.wait();
		expect(await gMKey.getNftCount()).to.equal(6);

		const blockChain2 = await gMKey.addToBlockChain(receiver3, project1Code, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain2.wait();
		expect(await gMKey.getNftCount()).to.equal(7);

		const blockChain3 = await gMKey.addToBlockChain(receiver3, project1Code, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		await blockChain3.wait();
		expect(await gMKey.getNftCount()).to.equal(8);
	});

	it('should reject to blockchain (max user/address been mint)', async () => {
		await expect(
			gMKey.addToBlockChain(receiver3, project1Code, nftName, ipfsText, ipfsImage, {
				value: ethers.utils.parseEther('0.1'),
			})
		).to.be.revertedWith('max user/address been mint');
	});

	it('should get all blockchain data 3', async () => {
		const blockChainAll = await gMKey.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(8);
	});
});
