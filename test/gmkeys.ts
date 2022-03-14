import { expect } from 'chai';
import { ethers } from 'hardhat';

describe.only('gmkeys', async () => {
	let GMKeys: any;
	let gmkeys: any;

	const ownerAddress: string = '0x924634D6964E171498f2a292185b1554893D95E5';
	const baseTokenURI: string = 'https://www.jnpl.me/metadata?id=';

	const receiver1: string = '0x30edec1c25218f5a748cccc54c562d7879e47caa'; // can mint max 20 nft
	const receiver2: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0'; // can mint max 20 nft

	before(async () => {
		GMKeys = await ethers.getContractFactory('GMKeys');
		gmkeys = await GMKeys.deploy(baseTokenURI);
		gmkeys.deployed();
	});

	it('should initialize gmkey contract', async () => {
		const address1 = await gmkeys.getOneAddress('0x9A32c490883adb80BDf05355D7D3FFBd283ddc67');
		expect(address1['exists']).to.equal(false); // sample invalid address

		expect(await gmkeys.getBaseURI()).to.equal('https://www.jnpl.me/metadata?id=');
	});
});
