// import * as bs58 from 'bs58';

// import { expect } from 'chai';
// import { ethers } from 'hardhat';

// const ipfsHashToBytes32 = (ipfsHash: string): string => {
// 	var h = bs58.decode(ipfsHash).toString('hex').replace(/^1220/, '');
// 	if (h.length != 64) {
// 		return '';
// 	}
// 	return '0x' + h;
// };

// const bytes32ToIPFSHash = (hashHex: string): string => {
// 	if (hashHex === '0x0000000000000000000000000000000000000000000000000000000000000000') {
// 		return '';
// 	}

// 	var buf = Buffer.from(hashHex.replace(/^0x/, '1220'), 'hex');
// 	return bs58.encode(buf);
// };

// describe.only('gmkey', async () => {
// 	let GMKey: any;
// 	let gMKey: any;

// 	const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';
// 	const baseTokenURI: string = 'https://www.jnpl.me/metadata?id=';

// 	const project1Name: string = ethers.utils.formatBytes32String('CryptoKittens'); // set limit to 500
// 	const project1Code: string = '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d';
// 	const project2Name: string = ethers.utils.formatBytes32String('CryptoPunks'); // set limit to 3
// 	const project2Code: string = '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb';

// 	// add to blockchain test data
// 	const ipfsText: string = ipfsHashToBytes32('QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'); // 'https://ipfs.io/ipfs/QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG'
// 	const ipfsImage: string = ipfsHashToBytes32('QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'); // 'https://ipfs.io/ipfs/QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT'

// 	const receiver1: string = '0x924634D6964E171498f2a292185b1554893D95E5'; // can mint unlimitted nft
// 	const receiver2: string = '0x30edec1c25218f5a748cccc54c562d7879e47caa'; // can mint max 3 nft
// 	const receiver3: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0'; // can mint max 3 nft

// 	before(async () => {
// 		GMKey = await ethers.getContractFactory('GMKey');
// 		gMKey = await GMKey.deploy(ownerAddress, baseTokenURI);
// 		gMKey.deployed();
// 	});

// 	it('should initialize gmkey contract', async () => {
// 		const project1 = await gMKey.getOneProject('0x9A32c490883adb80BDf05355D7D3FFBd283ddc67'); // sample invalid project
// 		expect(project1['exists']).to.equal(false);

// 		const address1 = await gMKey.getOneAddress('0x9A32c490883adb80BDf05355D7D3FFBd283ddc67'); // sample invalid address
// 		expect(address1['exists']).to.equal(false);

// 		const address2 = await gMKey.getOneAddress(ownerAddress); // sample address
// 		expect(address2['exists']).to.equal(true);

// 		expect(await gMKey.getBaseURI()).to.equal('https://www.jnpl.me/metadata?id=');
// 	});

// 	it('should add whitelisted user', async () => {
// 		await gMKey.addWhitelistedUser(receiver2);
// 		const whitelistedUser1 = await gMKey.verifyWhitelistedUser(receiver2);
// 		expect(whitelistedUser1).to.equal(true);
// 	});

// 	it('should add multiple whitelisted user', async () => {
// 		await gMKey.addAllWhitelistedUser([receiver2, receiver3]);
// 		const whitelistedUser2 = await gMKey.verifyWhitelistedUser(receiver3);
// 		expect(whitelistedUser2).to.equal(true);
// 	});

// 	it('should reject whitelisted user (address already exixts)', async () => {
// 		await expect(gMKey.addWhitelistedUser(receiver2)).to.be.revertedWith('AAE');
// 	});

// 	it('should add project', async () => {
// 		await gMKey.addProject(500, ethers.utils.parseEther('0.1'), project1Name, project1Code);
// 		const project1 = await gMKey.getOneProject(project1Code);
// 		expect(project1['exists']).to.equal(true);

// 		await gMKey.addProject(3, ethers.utils.parseEther('0.1'), project2Name, project2Code);
// 		const project2 = await gMKey.getOneProject(project1Code);
// 		expect(project2['exists']).to.equal(true);
// 	});

// 	it('should reject duplicate project (project already exixts)', async () => {
// 		await expect(gMKey.addProject(500, ethers.utils.parseEther('0.1'), project1Name, project1Code)).to.be.revertedWith(
// 			'PAE'
// 		);
// 	});

// 	it('should get project data 1', async () => {
// 		const project1 = await gMKey.getOneProject(project1Code);
// 		// console.log(project1);
// 		expect(project1['maxUnit']).to.equal(500);
// 		expect(project1['currentUnit']).to.equal(0);
// 		expect(project1['amount']).to.equal(ethers.utils.parseEther('0.1'));
// 		expect(ethers.utils.parseBytes32String(project1['name'])).to.equal('CryptoKittens');
// 		expect(project1['exists']).to.equal(true);
// 	});

// 	it('should add to blockchain', async () => {
// 		const blockChain = await gMKey.addToBlockChain(receiver1, project1Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		const blockChainWait = await blockChain.wait();
// 		const blockChainEvent = blockChainWait.events[0];
// 		const newTokenId: number = Number(blockChainEvent.args['tokenId']);

// 		expect(newTokenId).to.equal(0);
// 		expect(await gMKey.getNftCount()).to.equal(1);

// 		const tokenURI = await gMKey.tokenURI(newTokenId);
// 		expect(tokenURI).to.equal(`${baseTokenURI}${newTokenId}`);
// 	});

// 	it('should reject to blockchain (receiver is not whitelisted)', async () => {
// 		await expect(
// 			gMKey.addToBlockChain('0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d', project1Code, ipfsText, ipfsImage, {
// 				value: ethers.utils.parseEther('0.1'),
// 			})
// 		).to.be.revertedWith('RNW');
// 	});

// 	it('should reject to blockchain (project dosent exists)', async () => {
// 		await expect(
// 			gMKey.addToBlockChain(receiver1, '0xF5b0A3eFB8e8E4c201e2A935F110eAaF3FFEcb8d', ipfsText, ipfsImage, {
// 				value: ethers.utils.parseEther('0.1'),
// 			})
// 		).to.be.revertedWith('PDE');
// 	});

// 	it('should reject to blockchain (not enough coins)', async () => {
// 		await expect(
// 			gMKey.addToBlockChain(receiver1, project1Code, ipfsText, ipfsImage, {
// 				value: ethers.utils.parseEther('0.01'),
// 			})
// 		).to.be.revertedWith('NEC');
// 	});

// 	it('should get all blockchain data (result 1)', async () => {
// 		const blockChainAll = await gMKey.getAllNft();
// 		// console.log(blockChainAll);
// 		expect(blockChainAll.length).to.equal(1);
// 	});

// 	it('should get blockchain data 0', async () => {
// 		const blockChainOne = await gMKey.getOneNft('0');
// 		// console.log(blockChainOne);
// 		expect(blockChainOne['receiver']).to.equal(receiver1);
// 		expect(blockChainOne['code']).to.equal(project1Code);
// 		expect(bytes32ToIPFSHash(blockChainOne['text'])).to.equal('QmcJ3ZVxrj2Py1Jt7DWR8HksVaXeR6T8ZM9CSVJZzSEHuG');
// 		expect(bytes32ToIPFSHash(blockChainOne['image'])).to.equal('QmPsVS4jM5e1JmJR7Sp6ULui1PqbmpwsajaVTT6HNxrvQT');
// 	});

// 	it('should reject get blockchain (token id dosent exists)', async () => {
// 		await expect(gMKey.getOneNft('10')).to.be.revertedWith('TID');
// 	});

// 	it('should max blockchain project creation (CryptoPunks)', async () => {
// 		const blockChain1 = await gMKey.addToBlockChain(receiver1, project2Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain1.wait();
// 		expect(await gMKey.getNftCount()).to.equal(2);

// 		const blockChain2 = await gMKey.addToBlockChain(receiver1, project2Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain2.wait();
// 		expect(await gMKey.getNftCount()).to.equal(3);

// 		const blockChain3 = await gMKey.addToBlockChain(receiver1, project2Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain3.wait();
// 		expect(await gMKey.getNftCount()).to.equal(4);
// 	});

// 	it('should reject to blockchain (max project has been mint)', async () => {
// 		await expect(
// 			gMKey.addToBlockChain(receiver1, project2Code, ipfsText, ipfsImage, {
// 				value: ethers.utils.parseEther('0.1'),
// 			})
// 		).to.be.revertedWith('PMM');
// 	});

// 	it('should get project data 2', async () => {
// 		const project1 = await gMKey.getOneProject(project2Code);
// 		// console.log(project1);
// 		expect(project1['maxUnit']).to.equal(3);
// 		expect(project1['currentUnit']).to.equal(3);
// 		expect(project1['amount']).to.equal(ethers.utils.parseEther('0.1'));
// 		expect(ethers.utils.parseBytes32String(project1['name'])).to.equal('CryptoPunks');
// 		expect(project1['exists']).to.equal(true);
// 	});

// 	it('should get all blockchain data (result 4)', async () => {
// 		const blockChainAll = await gMKey.getAllNft();
// 		// console.log(blockChainAll);
// 		expect(blockChainAll.length).to.equal(4);
// 	});

// 	it('should add to blockchain new reciever', async () => {
// 		const blockChain1 = await gMKey.addToBlockChain(receiver2, project1Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain1.wait();
// 		expect(await gMKey.getNftCount()).to.equal(5);

// 		const address1 = await gMKey.getOneAddress(receiver2);
// 		// console.log(address1);
// 		expect(address1['maxUnit']).to.equal(3);
// 		expect(address1['currentUnit']).to.equal(1);
// 		expect(address1['exists']).to.equal(true);
// 	});

// 	it('should max blockchain user creation (0x58933D8678b574349bE3CdDd3de115468e8cb3f0)', async () => {
// 		const blockChain1 = await gMKey.addToBlockChain(receiver3, project1Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain1.wait();
// 		expect(await gMKey.getNftCount()).to.equal(6);

// 		const blockChain2 = await gMKey.addToBlockChain(receiver3, project1Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain2.wait();
// 		expect(await gMKey.getNftCount()).to.equal(7);

// 		const blockChain3 = await gMKey.addToBlockChain(receiver3, project1Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain3.wait();
// 		expect(await gMKey.getNftCount()).to.equal(8);
// 	});

// 	it('should reject to blockchain (max user/address been mint)', async () => {
// 		await expect(
// 			gMKey.addToBlockChain(receiver3, project1Code, ipfsText, ipfsImage, {
// 				value: ethers.utils.parseEther('0.1'),
// 			})
// 		).to.be.revertedWith('AMM');
// 	});

// 	it('should get all blockchain data (result 8)', async () => {
// 		const blockChainAll = await gMKey.getAllNft();
// 		// console.log(blockChainAll);
// 		expect(blockChainAll.length).to.equal(8);
// 	});

// 	it('should get all filtered blockchain data', async () => {
// 		const [blockChainFiltered1, len1] = await gMKey.getFilteredNft(1, 99, '0x0000000000000000000000000000000000000000');
// 		// console.log(blockChainFiltered1);
// 		expect(len1).to.equal(8);

// 		const [blockChainFiltered2, len2] = await gMKey.getFilteredNft(2, 3, '0x0000000000000000000000000000000000000000');
// 		// console.log(blockChainFiltered2);
// 		expect(len2).to.equal(3);

// 		const [blockChainFiltered3, len3] = await gMKey.getFilteredNft(3, 3, '0x0000000000000000000000000000000000000000');
// 		// console.log(blockChainFiltered3);
// 		expect(len3).to.equal(2);

// 		const [blockChainFiltered4, len4] = await gMKey.getFilteredNft(4, 3, '0x0000000000000000000000000000000000000000');
// 		// console.log(blockChainFiltered4);
// 		expect(len4).to.equal(0);
// 	});

// 	it('should get all filtered blockchain data by project code', async () => {
// 		const [blockChainFiltered1, len1] = await gMKey.getFilteredNft(1, 10, project1Code);
// 		// console.log(blockChainFiltered1);
// 		expect(len1).to.equal(5);

// 		const [blockChainFiltered2, len2] = await gMKey.getFilteredNft(1, 10, project2Code);
// 		// console.log(blockChainFiltered2);
// 		expect(len2).to.equal(3);
// 	});

// 	it('should get remove from blockchain', async () => {
// 		const blockChain = await gMKey.removeFromBlockChain('1');
// 		const blockChainWait = await blockChain.wait();
// 		const blockChainEvent = blockChainWait.events[0];
// 		const newTokenId: number = Number(blockChainEvent.args['tokenId']);

// 		expect(newTokenId).to.equal(1);
// 	});

// 	it('should reject to blockchain (token id dosent exists)', async () => {
// 		await expect(gMKey.removeFromBlockChain('10')).to.be.revertedWith('TID');
// 	});

// 	it('should reject to blockchain (project dosent exists)', async () => {
// 		await expect(gMKey.removeFromBlockChain('1')).to.be.revertedWith('ERC721: owner query for nonexistent token');
// 	});

// 	it('should get removed blockchain data 1', async () => {
// 		const blockChainOne = await gMKey.getOneNft('1');
// 		// console.log(blockChainOne);
// 		expect(blockChainOne['receiver']).to.equal('0x0000000000000000000000000000000000000000');
// 		expect(blockChainOne['code']).to.equal('0x0000000000000000000000000000000000000000');
// 		expect(bytes32ToIPFSHash(blockChainOne['text'])).to.equal('');
// 		expect(bytes32ToIPFSHash(blockChainOne['image'])).to.equal('');
// 	});

// 	it('should add to blockchain old reciever', async () => {
// 		const blockChain1 = await gMKey.addToBlockChain(receiver1, project1Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain1.wait();
// 		expect(await gMKey.getNftCount()).to.equal(9);

// 		const blockChain2 = await gMKey.addToBlockChain(receiver1, project1Code, ipfsText, ipfsImage, {
// 			value: ethers.utils.parseEther('0.1'),
// 		});
// 		await blockChain2.wait();
// 		expect(await gMKey.getNftCount()).to.equal(10);
// 	});

// 	it('should get all blockchain data (result 10)', async () => {
// 		const blockChainAll = await gMKey.getAllNft();
// 		// console.log(blockChainAll);
// 		expect(blockChainAll.length).to.equal(10);
// 	});

// 	it('should get my nft', async () => {
// 		const [blockChainFiltered1, len1] = await gMKey.getMyNft(receiver1);
// 		// console.log(blockChainFiltered1);
// 		expect(len1).to.equal(5);

// 		const [blockChainFiltered2, len2] = await gMKey.getMyNft(receiver2);
// 		// console.log(blockChainFiltered2);
// 		expect(len2).to.equal(1);
// 	});
// });
