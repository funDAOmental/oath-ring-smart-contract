import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe.only('AccessPassDescriptor TEST', async () => {
	let AccessPassDescriptor: any;
	let descriptor: any;

	const receiver: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';

	describe.only('Metadata', async () => {
		before(async () => {
			AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
			descriptor = await AccessPassDescriptor.deploy();
			descriptor.deployed();
		});
		it('should return correct base64 encoded metadata', async () => {
			const name = await descriptor.collectionNamePrefix();
			const description = await descriptor.collectionDetails();
			const image = await descriptor.collectionImage();
			const expected_prefix = "data:application/json;base64,"
			const tokenId = "1"
			const result = await descriptor.genericDataURI(tokenId);
			// Extract and base64 decode metadata
			const metadata = JSON.parse(atob(result.split(",")[1]));

			expect(result).to.include(expected_prefix)

			//Check name was correctly combined
			expect(metadata.name).to.equal(name + tokenId);

			//Check description was correctly combined
			expect(metadata.description).to.equal(description + tokenId);

			//Check attributes is empty
			expect(metadata.attributes).to.deep.equal([]);

			//Check image is set to collectionImage
			expect(metadata.image).to.deep.equal(image)
		});

		it('should return base64 encoded metadata with single attribute', async () => {
			const name = await descriptor.collectionNamePrefix();
			const description = await descriptor.collectionDetails();
			const image = await descriptor.collectionImage();

			const attributes: any = ['test', 'value']
			const expected_prefix = "data:application/json;base64,"
			const tokenId = "1"

			// Set expected attributes
			await (await descriptor.setCollectionAttributes(attributes))

			const result = await descriptor.genericDataURI(tokenId);

			// Extract and base64 decode metadata
			const metadata = JSON.parse(atob(result.split(",")[1]));

			// Check data prefix is correct 
			expect(result).to.include(expected_prefix)


			// Check name was correctly combined
			expect(metadata.name).to.equal(name + tokenId);

			// Check description was correctly combined
			expect(metadata.description).to.equal(description + tokenId);

			// Check image is set to collectionImage
			expect(metadata.image).to.deep.equal(image)

			// Check attribues are set correctly
			expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
			expect(metadata.attributes[0].value).to.equal(attributes[1]);
		});
	});
	describe.only('Admin functions', async () => {
		beforeEach(async () => {
			AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
			descriptor = await AccessPassDescriptor.deploy();
			descriptor.deployed();
		});

		it('should update collectionNamePrefix', async () => {
			const beforeUpdate = await descriptor.collectionNamePrefix();
			const expected = "Some String"
			await (await descriptor.setCollectionNamePrefix(expected));

			const afterUpdate = await descriptor.collectionNamePrefix();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after namePrefix update it's correct
			expect(afterUpdate).to.equal(expected);
		});

		it('should update collectionDetails', async () => {
			const beforeUpdate = await descriptor.collectionDetails();
			const expected = "Some String"
			await (await descriptor.setCollectionDetails(expected));

			const afterUpdate = await descriptor.collectionDetails();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after collectionDetails update it's correct
			expect(afterUpdate).to.equal(expected);
		});

		it('should update collectionAttributes', async () => {

			const attributes: string[] = ['Some String', 'Some Value']
			await (await descriptor.setCollectionAttributes(attributes))

			// Check before and new are different
			for (var i in attributes) {
				expect(await descriptor.collectionAttributes(i)).to.equal(attributes[i]);
			}

		});

		it('should update collectionImage', async () => {
			const beforeUpdate = await descriptor.collectionImage();
			const expected = "Some String"
			await (await descriptor.setCollectionImage(expected));

			const afterUpdate = await descriptor.collectionImage();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after collectionDetails update it's correct
			expect(afterUpdate).to.equal(expected);
		});


	});

	it('should return base64 encoded metadata with multiple attribute', async () => {
		const name = await descriptor.collectionNamePrefix();
		const description = await descriptor.collectionDetails();
		const image = await descriptor.collectionImage();

		const attributes: any = ['attribute1', 'value', "attribute2", "value"]
		const expected_prefix = "data:application/json;base64,"
		const tokenId = "1"

		// Set expected attributes
		await (await descriptor.setCollectionAttributes(attributes))

		const result = await descriptor.genericDataURI(tokenId);

		// Extract and base64 decode metadata
		const metadata = JSON.parse(atob(result.split(",")[1]));

		// Check data prefix is correct 
		expect(result).to.include(expected_prefix)

		// Check name was correctly combined
		expect(metadata.name).to.equal(name + tokenId);

		// Check description was correctly combined
		expect(metadata.description).to.equal(description + tokenId);

		// Check image is set to collectionImage
		expect(metadata.image).to.deep.equal(image)

		// Check attribues are set correctly
		expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
		expect(metadata.attributes[0].value).to.equal(attributes[1]);
		expect(metadata.attributes[1].trait_type).to.equal(attributes[2]);
		expect(metadata.attributes[1].value).to.equal(attributes[3]);
	});
});