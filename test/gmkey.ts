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
		expect(await gMKey.getAddressCount()).to.equal(1);

		const project1 = await gMKey.getOneProject('0x9A32c490883adb80BDf05355D7D3FFBd283ddc67'); // sample invalid project
		expect(project1['exists']).to.equal(false);

		const address1 = await gMKey.getOneAddress('0x9A32c490883adb80BDf05355D7D3FFBd283ddc67'); // sample invalid address
		expect(address1['exists']).to.equal(false);

		const address2 = await gMKey.getOneAddress(ownerAddress); // sample address
		expect(address2['exists']).to.equal(true);

		expect(await gMKey.getBaseURI()).to.equal('https://www.jnpl.me/metadata?id=');
	});

	it('should add project', async function () {
		const projectName: string = 'CryptoKittens';
		const projectCode: string = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';

		const GMKey = await ethers.getContractFactory('GMKey');
		const gMKey = await GMKey.deploy(ownerAddress, baseTokenURI);
		await gMKey.deployed();

		await gMKey.addProject(500, ethers.utils.parseEther('0.1'), projectName, projectCode);

		expect(await gMKey.getProjectCount()).to.equal(1);

		const project1 = await gMKey.getOneProject(projectCode);
		expect(project1['name']).to.equal(projectName);
		expect(project1['exists']).to.equal(true);
	});

	it('should add to blockchain', async function () {
		const receiver: string = '0x924634D6964E171498f2a292185b1554893D95E5';

		const projectName: string = 'CryptoKittens';
		const projectCode: string = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';

		const ipfsText: string = 'QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'; //'https://ipfs.io/ipfs/QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'
		const ipfsImage: string = 'QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'; //'https://ipfs.io/ipfs/QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'

		const GMKey = await ethers.getContractFactory('GMKey');
		const gMKey = await GMKey.deploy(ownerAddress, baseTokenURI);
		await gMKey.deployed();

		await gMKey.addProject(500, ethers.utils.parseEther('0.1'), projectName, projectCode);
		const blockChain = await gMKey.addToBlockChain(receiver, projectCode, 'random-name', ipfsText, ipfsImage, {
			value: ethers.utils.parseEther('0.1'),
		});
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
