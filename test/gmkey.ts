import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('gmkey contract', async () => {
	let GMKey: any;
	let gMKey: any;

	const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';
	const baseTokenURI: string = 'https://www.jnpl.me/metadata?id=';

	const projectName: string = 'CryptoKittens';
	const projectCode: string = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';

	// add to blockchain test data
	let newTokenId: number;
	const receiver: string = '0x924634D6964E171498f2a292185b1554893D95E5';
	const nftName: string = 'random-name';
	const ipfsText: string = 'QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'; //'https://ipfs.io/ipfs/QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'
	const ipfsImage: string = 'QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'; //'https://ipfs.io/ipfs/QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'

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
		await gMKey.addProject(500, ethers.utils.parseEther('0.1'), projectName, projectCode);

		expect(await gMKey.getProjectCount()).to.equal(1);
	});

	it('should reject duplicate project', async () => {
		await expect(gMKey.addProject(500, ethers.utils.parseEther('0.1'), projectName, projectCode)).to.be.revertedWith(
			'project already exixts'
		);
	});

	it('should get project data', async () => {
		const project1 = await gMKey.getOneProject(projectCode);
		// console.log(project1);
		expect(project1['maxUnit']).to.equal(500);
		expect(project1['currentUnit']).to.equal(0);
		expect(project1['amount']).to.equal(ethers.utils.parseEther('0.1'));
		expect(project1['name']).to.equal(projectName);
		expect(project1['exists']).to.equal(true);
	});

	it('should add to blockchain', async () => {
		const blockChain = await gMKey.addToBlockChain(receiver, projectCode, nftName, ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		newTokenId = Number(blockChainEvent.args['tokenId']);

		expect(await gMKey.getNftCount()).to.equal(1);

		const tokenURI = await gMKey.tokenURI(newTokenId);
		expect(tokenURI).to.equal(`${baseTokenURI}${newTokenId}`);
	});

	it('should get all blockchain data', async () => {
		const blockChainAll = await gMKey.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(1);
	});

	it('should get blockchain data', async () => {
		const blockChainOne = await gMKey.getOneNft(newTokenId);
		// console.log(blockChainOne);
		expect(blockChainOne['receiver']).to.equal(receiver);
		expect(blockChainOne['amount']).to.equal(ethers.utils.parseEther('0.1'));
		expect(blockChainOne['code']).to.equal(projectCode);
		expect(blockChainOne['name']).to.equal(nftName);
		expect(blockChainOne['text']).to.equal(ipfsText);
		expect(blockChainOne['image']).to.equal(ipfsImage);
	});
});
