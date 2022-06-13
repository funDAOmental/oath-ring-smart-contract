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
        const name = "Access Pass";
		const description = "Sample description";
		const attributes:any = []
		const image  = "IPFS://ABCD"
		const expected_prefix="data:application/json;base64,"
		const result = await descriptor.genericDataURI(name, description, attributes, image);
		const data = result.split(",");
		const base64String = atob(data[1]);
		const metadata = JSON.parse(base64String);
		expect(result).to.include(expected_prefix)
		
		expect(metadata.name).to.equal(name);
		expect(metadata.description).to.equal(description);
		expect(metadata.attributes).to.deep.equal(attributes);
		expect(metadata.image).to.deep.equal(image)
    });

	it('should return base64 encoded metadata with attributes', async () => {
        const name = "Access Pass";
		const description = "Sample description";
		const attributes:any = ['test', 'value']
		const image  = "IPFS://ABCD"
		const expected_prefix="data:application/json;base64,"
		const result = await descriptor.genericDataURI(name, description, attributes, image);
		const data = result.split(",");
		const base64String = atob(data[1]);
		const metadata = JSON.parse(base64String);
		expect(result).to.include(expected_prefix)
		
		expect(metadata.name).to.equal(name);
		expect(metadata.description).to.equal(description);
		expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
		expect(metadata.attributes[0].value).to.equal(attributes[1]);
		expect(metadata.image).to.deep.equal(image)
    });

});