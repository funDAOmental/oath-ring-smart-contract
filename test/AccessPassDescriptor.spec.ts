import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe.only('AccessPassDescriptor TEST', async () => {
	let AccessPassDescriptor: any;
	let descriptor: any;

	const receiver: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';

	before(async () => {
		AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
		descriptor = await AccessPassDescriptor.deploy();
		descriptor.deployed();
	});

    it('should return base64 encoded metadata', async () => {
        
    });

});