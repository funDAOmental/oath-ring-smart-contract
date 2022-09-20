import { expect } from 'chai';
import { ethers } from 'hardhat';

describe.only('OathRingsDescriptor', async () => {
  let OathRingsDescriptor: any;
  let descriptor: any;

  describe.only('metadata', async () => {
    before(async () => {
      OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
      descriptor = await OathRingsDescriptor.deploy();
      descriptor.deployed();
    });

    it('should return correct Council base64 encoded metadata', async () => {
      const name = 'Council ';
      const description = await descriptor.collectionCouncilDetails();
      const image = await descriptor.collectionCouncilImage();

      const collectionPrefix = await descriptor.__collectionPrefix();
      const attributes: string[] = ['Role', 'Access Pass'];
      const attributeValues: any = ['Council', 'True'];
      const expected_prefix = 'data:application/json;base64,';
      const tokenId = '1';

      const result = await descriptor.genericDataURI(tokenId, true);
      // Extract and base64 decode metadata
      const metadata = JSON.parse(atob(result.split(',')[1]));

      expect(result).to.include(expected_prefix);

      //Check name was correctly combined
      expect(metadata.name).to.equal(name + collectionPrefix + tokenId);

      //Check description was correctly combined
      expect(metadata.description).to.equal(description);

      // Check image is set to collectionImage
      expect(metadata.image).to.deep.equal(image);

      // Check attributes are set correctly
      expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
      expect(metadata.attributes[0].value).to.equal(attributeValues[0]);
      expect(metadata.attributes[1].trait_type).to.equal(attributes[1]);
      expect(metadata.attributes[1].value).to.equal(attributeValues[1]);
    });

    it('should return correct guild base64 encoded metadata', async () => {
      const name = 'Guild ';
      const description = await descriptor.collectionGuildDetails();
      const image = await descriptor.collectionGuildImage();

      const collectionPrefix = await descriptor.__collectionPrefix();
      const attributes: string[] = ['Role', 'Access Pass'];
      const attributeValues: any = ['Guild', 'False'];
      const expected_prefix = 'data:application/json;base64,';
      const tokenId = '1';

      const result = await descriptor.genericDataURI(tokenId, false);

      // Extract and base64 decode metadata
      const metadata = JSON.parse(atob(result.split(',')[1]));

      // Check data prefix is correct
      expect(result).to.include(expected_prefix);

      // Check name was correctly combined
      expect(metadata.name).to.equal(name + collectionPrefix + tokenId);

      // Check description was correctly combined
      expect(metadata.description).to.equal(description);

      // Check image is set to collectionImage
      expect(metadata.image).to.deep.equal(image);

      // Check attributes are set correctly
      expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
      expect(metadata.attributes[0].value).to.equal(attributeValues[0]);
      expect(metadata.attributes[1].trait_type).to.equal(attributes[1]);
      expect(metadata.attributes[1].value).to.equal(attributeValues[1]);
    });
  });

  describe.only('Admin functions', async () => {
    beforeEach(async () => {
      OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
      descriptor = await OathRingsDescriptor.deploy();
      descriptor.deployed();
    });

    it('should update collectionCouncilPrefix', async () => {
      const beforeUpdate = await descriptor.collectionCouncilPrefix();
      const expected = 'Some String';
      await await descriptor.setCollectionCouncilPrefix(expected);

      const afterUpdate = await descriptor.collectionCouncilPrefix();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after namePrefix update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update collectionGuildPrefix', async () => {
      const beforeUpdate = await descriptor.collectionGuildPrefix();
      const expected = 'Some String';
      await await descriptor.setCollectionGuildPrefix(expected);

      const afterUpdate = await descriptor.collectionGuildPrefix();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after namePrefix update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update collectionCouncilDetails', async () => {
      const beforeUpdate = await descriptor.collectionCouncilDetails();
      const expected = 'Some Council';
      await await descriptor.setCollectionCouncilDetails(expected);

      const afterUpdate = await descriptor.collectionCouncilDetails();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after collectionDetails update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update collectionGuildDetails', async () => {
      const beforeUpdate = await descriptor.collectionGuildDetails();
      const expected = 'Some Guild';
      await await descriptor.setCollectionGuildDetails(expected);

      const afterUpdate = await descriptor.collectionGuildDetails();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after collectionDetails update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update setCollectionCouncilImage', async () => {
      const beforeUpdate = await descriptor.collectionCouncilImage();
      const expected = 'Some String';
      await await descriptor.setCollectionCouncilImage(expected);

      const afterUpdate = await descriptor.collectionCouncilImage();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after collectionDetails update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update setCollectionGuildImage', async () => {
      const beforeUpdate = await descriptor.collectionGuildImage();
      const expected = 'Some String';
      await await descriptor.setCollectionGuildImage(expected);

      const afterUpdate = await descriptor.collectionGuildImage();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after collectionDetails update it's correct
      expect(afterUpdate).to.equal(expected);
    });
  });
});
