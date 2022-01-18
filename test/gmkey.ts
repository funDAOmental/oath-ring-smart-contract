import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('GMKey', function () {
	const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';
	const baseTokenURI: string = 'https://www.jnpl.me/metadata?id=';

	it('should initialize gmkey contract', async function () {
		const GMKey = await ethers.getContractFactory('GMKey');
		const gMKey = await GMKey.deploy(ownerAddress, baseTokenURI);
		await gMKey.deployed();

		expect(await gMKey.getProjectCount()).to.equal(0);

		const project = await gMKey.getOneProject('0x111114D6964E171498f2a292185b155489311111'); // sample address
		expect(project['name']).to.equal('');
		expect(project['exists']).to.equal(false);

		expect(await gMKey.getBaseURI()).to.equal('https://www.jnpl.me/metadata?id=');
	});

	it('should add project', async function () {
		const projectName: string = 'CryptoKittens';
		const projectCode: string = '0x06012c8cf97bead5deae237070f9587f8e7a266d';

		const GMKey = await ethers.getContractFactory('GMKey');
		const gMKey = await GMKey.deploy(ownerAddress, baseTokenURI);
		await gMKey.deployed();

		await gMKey.addProject(500, ethers.utils.parseEther('0.1'), projectName, projectCode);

		expect(await gMKey.getProjectCount()).to.equal(1);

		const projectCryptoKittens = await gMKey.getOneProject(projectCode);
		// console.log(projectCryptoKittens);
		expect(projectCryptoKittens['name']).to.equal(projectName);
		expect(projectCryptoKittens['exists']).to.equal(true);
	});

	it('should add to blockchain', async function () {
		const receiver: string = '0x924634D6964E171498f2a292185b1554893D95E5';

		const projectName: string = 'CryptoKittens';
		const projectCode: string = '0x06012c8cf97bead5deae237070f9587f8e7a266d';

		const ipfsText: string = 'QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'; //'https://ipfs.io/ipfs/QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'
		const ipfsImage: string = 'QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'; //'https://ipfs.io/ipfs/QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'

		const GMKey = await ethers.getContractFactory('GMKey');
		const gMKey = await GMKey.deploy(ownerAddress, baseTokenURI);
		await gMKey.deployed();

		await gMKey.addProject(500, ethers.utils.parseEther('0.1'), projectName, projectCode);
		const blockChain = await gMKey.addToBlockChain(receiver, projectCode, 'random-name', ipfsText, ipfsImage);
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['tokenId']);

		expect(await gMKey.getNftCount()).to.equal(1);

		const tokenURI = await gMKey.tokenURI(newTokenId);
		expect(tokenURI).to.equal('https://www.jnpl.me/metadata?id=0');

		const blockChainAll = await gMKey.getAllNft();
		// console.log(blockChainAll);
		expect(blockChainAll.length).to.equal(1);

		const blockChainOne = await gMKey.getOneNft(newTokenId);
		// console.log(blockChainOne);
		expect(blockChainOne['name']).to.equal('random-name');
		expect(blockChainOne['code']).to.equal(projectCode);
	});
});
