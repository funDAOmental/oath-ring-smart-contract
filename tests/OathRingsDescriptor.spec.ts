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
      const description = await descriptor.councilDetails();
      console.log(description);
      const image = await descriptor.councilImage();
      const animationUrl = await descriptor.councilAnimationUrl();

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

      // Check image is set to image
      expect(metadata.image).to.deep.equal(image);

      // Check image is set to animationUrl
      expect(metadata.animation_url).to.deep.equal(animationUrl);

      // Check attributes are set correctly
      expect(metadata.attributes[0].trait_type).to.equal(attributes[0]);
      expect(metadata.attributes[0].value).to.equal(attributeValues[0]);
      expect(metadata.attributes[1].trait_type).to.equal(attributes[1]);
      expect(metadata.attributes[1].value).to.equal(attributeValues[1]);
    });

    it('should return correct Guild base64 encoded metadata', async () => {
      const name = 'Guild ';
      const description = await descriptor.guildDetails();
      const image = await descriptor.guildImage();
      const animationUrl = await descriptor.guildAnimationUrl();

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

      // Check image is set to collectionImage
      expect(metadata.animation_url).to.deep.equal(animationUrl);

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

    it('should update councilPrefix', async () => {
      const beforeUpdate = await descriptor.councilPrefix();
      const expected = 'Some String';
      await await descriptor.setCouncilPrefix(expected);

      const afterUpdate = await descriptor.councilPrefix();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after namePrefix update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update guildPrefix', async () => {
      const beforeUpdate = await descriptor.guildPrefix();
      const expected = 'Some String';
      await await descriptor.setGuildPrefix(expected);

      const afterUpdate = await descriptor.guildPrefix();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after namePrefix update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update councilDetails', async () => {
      const beforeUpdate = await descriptor.councilDetails();
      const expected = 'Some Council';
      await await descriptor.setCouncilDetails(expected);

      const afterUpdate = await descriptor.councilDetails();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after collectionDetails update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update guildDetails', async () => {
      const beforeUpdate = await descriptor.guildDetails();
      const expected = 'Some Guild';
      await await descriptor.setGuildDetails(expected);

      const afterUpdate = await descriptor.guildDetails();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after collectionDetails update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update setCouncilImage', async () => {
      const beforeUpdate = await descriptor.councilImage();
      const expected = 'Some String';
      await await descriptor.setCouncilImage(expected);

      const afterUpdate = await descriptor.councilImage();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after collectionDetails update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update setGuildImage', async () => {
      const beforeUpdate = await descriptor.guildImage();
      const expected = 'Some String';
      await await descriptor.setGuildImage(expected);

      const afterUpdate = await descriptor.guildImage();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after collectionDetails update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update setCouncilAnimationUrl', async () => {
      const beforeUpdate = await descriptor.councilAnimationUrl();
      const expected = 'Some String';
      await await descriptor.setCouncilAnimationUrl(expected);

      const afterUpdate = await descriptor.councilAnimationUrl();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after AnimationUrl update it's correct
      expect(afterUpdate).to.equal(expected);
    });

    it('should update setGuildAnimationUrl', async () => {
      const beforeUpdate = await descriptor.guildAnimationUrl();
      const expected = 'Some String';
      await await descriptor.setGuildAnimationUrl(expected);

      const afterUpdate = await descriptor.guildAnimationUrl();

      // Check before and new are different
      expect(afterUpdate).to.not.equal(beforeUpdate);

      // Check after AnimationUrl update it's correct
      expect(afterUpdate).to.equal(expected);
    });
  });
});
