import { expect } from 'chai';
import { ethers } from 'hardhat';

describe.only('AccessPass TEST', async () => {
	let AccessPass: any;
	let accesspass: any;

	const owner: string = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
	const receiver1: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';
	const receiver2: string = '0x30eDEc1C25218F5a748cccc54C562d7879e47CaA';
	const receiver3: string = '0xB07243398f1d0094b64f4C0a61B8C03233914036';

	before(async () => {
		AccessPass = await ethers.getContractFactory('AccessPass');
		accesspass = await AccessPass.deploy(owner, 111);
		accesspass.deployed();
	});
});
