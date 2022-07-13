import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe.only('AccessPassDescriptor TEST', async () => {
	let AccessPassDescriptor: any;
	let descriptor: any;

	const receiver: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';

	describe.only('metadata', async () => {
		before(async () => {
			AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
			descriptor = await AccessPassDescriptor.deploy();
			descriptor.deployed();
		});

		it('should return correct gold base64 encoded metadata', async () => {
			const name = await descriptor.collectionGoldPrefix();
			const description = await descriptor.collectionGoldDetails();
			const image = await descriptor.collectionGoldImage();

			const collectionPrefix = await descriptor.__collectionPrefix();
			const attributes: string[] = ['symbol', 'type', 'access pass', 'role', 'weight'];
			const attributeValues: any = ['â\u0098\u0089', 'GOLD', 'true', 'high council', '1'];
			const expected_prefix = 'data:application/json;base64,';
			const tokenId = '1';

			const result = await descriptor.genericDataURI(tokenId, 0);
			// Extract and base64 decode metadata
			const metadata = JSON.parse(atob(result.split(',')[1]));

			expect(result).to.include(expected_prefix);

			//Check name was correctly combined
			expect(metadata.name).to.equal(collectionPrefix + tokenId + name);

			//Check description was correctly combined
			expect(metadata.description).to.equal(description);

			// Check image is set to collectionImage
			expect(metadata.image).to.deep.equal(image);

			// Check attribues are set correctly
			expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
			expect(metadata.attributes[0].value).to.equal(attributeValues[0]);
			expect(metadata.attributes[1].trait_type).to.equal(attributes[1]);
			expect(metadata.attributes[1].value).to.equal(attributeValues[1]);
			expect(metadata.attributes[2].trait_type).to.equal(attributes[2]);
			expect(metadata.attributes[2].value).to.equal(attributeValues[2]);
			expect(metadata.attributes[3].trait_type).to.equal(attributes[3]);
			expect(metadata.attributes[3].value).to.equal(attributeValues[3]);
			expect(metadata.attributes[4].trait_type).to.equal(attributes[4]);
			expect(metadata.attributes[4].value).to.equal(attributeValues[4]);
		});

		it('should return correct silver base64 encoded metadata', async () => {
			const name = await descriptor.collectionSilverPrefix();
			const description = await descriptor.collectionSilverDetails();
			const image = await descriptor.collectionSilverImage();

			const collectionPrefix = await descriptor.__collectionPrefix();
			const attributes: string[] = ['symbol', 'type', 'access pass', 'role', 'weight'];
			const attributeValues: any = ['ð\u009f\u009c\u009b', 'SILVER', 'false', 'low council', '1'];
			const expected_prefix = 'data:application/json;base64,';
			const tokenId = '1';

			const result = await descriptor.genericDataURI(tokenId, 1);

			// Extract and base64 decode metadata
			const metadata = JSON.parse(atob(result.split(',')[1]));

			// Check data prefix is correct
			expect(result).to.include(expected_prefix);

			// Check name was correctly combined
			expect(metadata.name).to.equal(collectionPrefix + tokenId + name);

			// Check description was correctly combined
			expect(metadata.description).to.equal(description);

			// Check image is set to collectionImage
			expect(metadata.image).to.deep.equal(image);

			// Check attribues are set correctly
			expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
			expect(metadata.attributes[0].value).to.equal(attributeValues[0]);
			expect(metadata.attributes[1].trait_type).to.equal(attributes[1]);
			expect(metadata.attributes[1].value).to.equal(attributeValues[1]);
			expect(metadata.attributes[2].trait_type).to.equal(attributes[2]);
			expect(metadata.attributes[2].value).to.equal(attributeValues[2]);
			expect(metadata.attributes[3].trait_type).to.equal(attributes[3]);
			expect(metadata.attributes[3].value).to.equal(attributeValues[3]);
			expect(metadata.attributes[4].trait_type).to.equal(attributes[4]);
			expect(metadata.attributes[4].value).to.equal(attributeValues[4]);
		});
	});

	describe.only('Admin functions', async () => {
		beforeEach(async () => {
			AccessPassDescriptor = await ethers.getContractFactory('AccessPassDescriptor');
			descriptor = await AccessPassDescriptor.deploy();
			descriptor.deployed();
		});

		it('should update collectionGoldPrefix', async () => {
			const beforeUpdate = await descriptor.collectionGoldPrefix();
			const expected = 'Some String';
			await await descriptor.setCollectionGoldPrefix(expected);

			const afterUpdate = await descriptor.collectionGoldPrefix();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after namePrefix update it's correct
			expect(afterUpdate).to.equal(expected);
		});

		it('should update collectionSilverPrefix', async () => {
			const beforeUpdate = await descriptor.collectionSilverPrefix();
			const expected = 'Some String';
			await await descriptor.setCollectionSilverPrefix(expected);

			const afterUpdate = await descriptor.collectionSilverPrefix();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after namePrefix update it's correct
			expect(afterUpdate).to.equal(expected);
		});

		it('should update collectionGoldDetails', async () => {
			const beforeUpdate = await descriptor.collectionGoldDetails();
			const expected = 'Some Gold';
			await await descriptor.setCollectionGoldDetails(expected);

			const afterUpdate = await descriptor.collectionGoldDetails();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after collectionDetails update it's correct
			expect(afterUpdate).to.equal(expected);
		});

		it('should update collectionSilverDetails', async () => {
			const beforeUpdate = await descriptor.collectionSilverDetails();
			const expected = 'Some Silver';
			await await descriptor.setCollectionSilverDetails(expected);

			const afterUpdate = await descriptor.collectionSilverDetails();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after collectionDetails update it's correct
			expect(afterUpdate).to.equal(expected);
		});

		it('should update setCollectionGoldImage', async () => {
			const beforeUpdate = await descriptor.collectionGoldImage();
			const expected = 'Some String';
			await await descriptor.setCollectionGoldImage(expected);

			const afterUpdate = await descriptor.collectionGoldImage();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after collectionDetails update it's correct
			expect(afterUpdate).to.equal(expected);
		});

		it('should update setCollectionSilverImage', async () => {
			const beforeUpdate = await descriptor.collectionSilverImage();
			const expected = 'Some String';
			await await descriptor.setCollectionSilverImage(expected);

			const afterUpdate = await descriptor.collectionSilverImage();

			// Check before and new are different
			expect(afterUpdate).to.not.equal(beforeUpdate);

			// Check after collectionDetails update it's correct
			expect(afterUpdate).to.equal(expected);
		});
	});
});
