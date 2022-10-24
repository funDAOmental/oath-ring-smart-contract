import { expect } from 'chai';
import { BigNumber, Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import { ethers as tsEthers } from 'ethers';

describe.only('OathRings', async () => {
  let OathRings: ContractFactory;
  let TestToken: ContractFactory;
  let oathRings: Contract;
  let testToken: Contract;

  let deployer: any;
  let minter: any;
  let user: tsEthers.Wallet;

  let OathRingsDescriptor: any;
  let oathRingsDescriptor: any;

  const openseaProxy: string = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';
  const dataUriPrefix: string = 'data:application/json;base64,';
  const mainCost: BigNumber = tsEthers.utils.parseEther('0.1');
  const councilQuantity: number = 337;
  const guildQuantity: number = 1000;

  const receiver1: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';

  describe('Constructor', async () => {
    beforeEach(async () => {
      OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
      oathRingsDescriptor = await OathRingsDescriptor.deploy();
      oathRingsDescriptor.deployed();
      OathRings = await ethers.getContractFactory('OathRings');
      oathRings = await OathRings.deploy(
        openseaProxy,
        oathRingsDescriptor.address,
        councilQuantity,
        guildQuantity,
      );
      oathRings.deployed();
    });

    it('should initialize proxyRegistry', async () => {
      const proxyRegistry: string = await oathRings.proxyRegistry();
      expect(proxyRegistry).to.equal(openseaProxy);
    });

    it('should initialize oathRingsDescriptor', async () => {
      const descriptor: string = await oathRings.oathRingsDescriptor();
      expect(descriptor).to.equal(oathRingsDescriptor.address);
    });

    it('should initialize totalOathRings', async () => {
      const totalOathRings: number = await oathRings.totalOathRings();
      expect(totalOathRings).to.equal(councilQuantity + guildQuantity);
    });

    it('should initialize councilQuantity', async () => {
      const councilQuantity: number = await oathRings.councilQuantity();
      expect(councilQuantity).to.equal(councilQuantity);
    });

    it('should initialize guildQuantity', async () => {
      const guildQuantity: number = await oathRings.guildQuantity();
      expect(guildQuantity).to.equal(guildQuantity);
    });
  });

  describe('Admin functions', async () => {
    beforeEach(async () => {
      deployer = (await ethers.getSigners())[0];
      minter = (await ethers.getSigners())[1];
      TestToken = await ethers.getContractFactory('TestToken');
      testToken = await TestToken.deploy('TestToken', 'Test');
      testToken.deployed();
      OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
      oathRingsDescriptor = await OathRingsDescriptor.deploy();
      oathRingsDescriptor.deployed();

      OathRings = await ethers.getContractFactory('OathRings');
      oathRings = await OathRings.deploy(
        openseaProxy,
        oathRingsDescriptor.address,
        councilQuantity,
        guildQuantity,
      );
      oathRings.deployed();
    });

    it('should allow owner with minter role', async () => {
      await (await oathRings.mintCouncilOathRings(1)).wait();
      expect(await oathRings.balanceOf(deployer.address)).to.equal(1);
    });

    it('should allow owner reinstate minter role', async () => {
      await (await oathRings.removeMinter(deployer.address)).wait();
      await expect(oathRings.mintCouncilOathRings(1)).to.be.revertedWith(
        'caller is not the minter',
      );
      await (await oathRings.addMinter(deployer.address)).wait();
      await (await oathRings.mintCouncilOathRings(1)).wait();
      expect(await oathRings.balanceOf(deployer.address)).to.equal(1);
    });

    it('should allow minter when added', async () => {
      await (await oathRings.addMinter(minter.address)).wait();
      await (await oathRings.connect(minter).mintCouncilOathRings(1)).wait();
      expect(await oathRings.balanceOf(minter.address)).to.equal(1);
    });

    it('should allow reject minter after revoke minter role', async () => {
      await (await oathRings.addMinter(minter.address)).wait();
      await (await oathRings.connect(minter).mintCouncilOathRings(1)).wait();
      expect(await oathRings.balanceOf(minter.address)).to.equal(1);
      await (await oathRings.removeMinter(minter.address)).wait();
      await expect(oathRings.connect(minter).mintCouncilOathRings(1)).to.be.revertedWith(
        'caller is not the minter',
      );
    });

    it('should reject mintCouncilOathRings when not minter role', async () => {
      await expect(oathRings.connect(minter).mintCouncilOathRings(1)).to.be.revertedWith(
        'caller is not the minter',
      );
    });

    it('should reject mintToCouncilOathRings when not minter role', async () => {
      await expect(
        oathRings.connect(minter).mintToCouncilOathRings(minter.address, 1),
      ).to.be.revertedWith('caller is not the minter');
    });

    it('should reject mintCouncilOathRings when not mintGuildOathRings role', async () => {
      await expect(oathRings.connect(minter).mintGuildOathRings(1)).to.be.revertedWith(
        'caller is not the minter',
      );
    });

    it('should reject mintToGuildOathRings when not minter role', async () => {
      await expect(
        oathRings.connect(minter).mintToGuildOathRings(minter.address, 1),
      ).to.be.revertedWith('caller is not the minter');
    });

    it('should updated oathRingsDescriptor', async () => {
      const newAddress = '0xF57B2c51dED3A29e6891aba85459d600256Cf317';

      await await oathRings.setOathRingsDescriptor(newAddress);
      const expected: string = await oathRings.oathRingsDescriptor();

      expect(expected).to.equal(newAddress);
    });

    it('should revert setOathRingsDescriptor for AddressZero', async () => {
      await expect(
        oathRings.setOathRingsDescriptor(ethers.constants.AddressZero),
      ).to.be.revertedWith('INVALID_ADDRESS');
    });

    it('should update oathRings hash url', async () => {
      const url1: string = await oathRings.contractURI();
      expect(url1).to.equal('ipfs://bafkreieqlwueeyrgf3ramhpw3aw2oeoryidtdib57fmjhpyfr4r2uz6uou');

      const blockChain = await oathRings.setContractURI('ipfs://ABCDEF');
      await blockChain.wait();

      const url2: string = await oathRings.contractURI();
      expect(url2).to.equal('ipfs://ABCDEF');
    });

    it('should reject oathRings royalty (Max royalty check failed! > 20%)', async () => {
      await expect(oathRings.setSellerFeeBasisPoints(2501)).to.be.revertedWith(
        'Max royalty check failed! > 20%',
      );
    });

    it('should process oathRings royalty', async () => {
      await (await oathRings.setIsOpenSeaProxyActive(true)).wait();
      await (await oathRings.setSellerFeeBasisPoints(199)).wait();
      await (await oathRings.setRoyaltyPayout(receiver1)).wait();

      const sellerFeeBasisPoints: number = await oathRings.sellerFeeBasisPoints();
      expect(sellerFeeBasisPoints).to.equal(199);
    });

    it('should reject oathRings token (non-existent tokenId)', async () => {
      await expect(oathRings.tokenURI(0)).to.be.revertedWith('non-existent tokenId');
    });

    it('should reject oathRings royalty (non-existent tokenId)', async () => {
      await expect(oathRings.royaltyInfo(0, mainCost)).to.be.revertedWith('non-existent tokenId');
    });

    it('should get oathRings royalty 1', async () => {
      // Setup
      await (await oathRings.mintCouncilOathRings(1)).wait();
      await (await oathRings.setRoyaltyPayout(receiver1)).wait();

      const royaltyInfo = await oathRings.royaltyInfo(1, mainCost);
      expect(royaltyInfo['receiver']).to.equal(receiver1);
      expect(royaltyInfo['royaltyAmount']).to.equal(ethers.utils.parseEther('0.01'));
    });

    it('should get OathRingsCount 0', async () => {
      const tokenCount: number = await oathRings.getTotalOathRings();
      expect(tokenCount).to.equal(0);
    });
    describe('Receive/Withdraw', () => {
      it('should receive ether and emit event', async () => {
        const tx = await deployer.sendTransaction({
          to: oathRings.address,
          value: ethers.utils.parseEther('1.0'), // Sends exactly 1.0 ether
        });
        await expect(tx)
          .to.emit(oathRings, 'PaymentReceived')
          .withArgs(deployer.address, ethers.utils.parseEther('1.0'));
      });

      it('should revert withdraw for non owner', async () => {
        await expect(oathRings.connect(minter).withdraw(minter.address)).to.be.revertedWith(
          'Ownable: caller is not the owner',
        );
      });

      it('should revert withdraw for zero address', async () => {
        await expect(oathRings.withdraw(ethers.constants.AddressZero)).to.be.revertedWith(
          'InvalidAddress()',
        );
      });

      it('should revert withdraw when contract balance is zero', async () => {
        await expect(oathRings.withdraw(minter.address)).to.be.revertedWith(
          'Contract balance is zero',
        );
      });

      it('should revert withdrawTokens for non owner', async () => {
        await expect(
          oathRings.connect(minter).withdrawTokens(testToken.address, minter.address),
        ).to.be.revertedWith('Ownable: caller is not the owner');
      });

      it('should revert withdrawTokens for zero address', async () => {
        await expect(
          oathRings.withdrawTokens(testToken.address, ethers.constants.AddressZero),
        ).to.be.revertedWith('InvalidAddress()');
      });

      it('should revert withdrawTokens when contract token balance is zero', async () => {
        await expect(
          oathRings.withdrawTokens(testToken.address, minter.address),
        ).to.be.revertedWith('Contract Token balance is zero');
      });

      it('should revert withdrawTokens for non ERC20 address', async () => {
        await expect(oathRings.withdrawTokens(oathRings.address, minter.address)).to.be.reverted;
      });

      it('should withdraw for onlyOwner', async () => {
        const expectedValue = ethers.utils.parseEther('1.0');
        const tx = await deployer.sendTransaction({
          to: oathRings.address,
          value: expectedValue, // Sends exactly 1.0 ether
        });
        await expect(oathRings.withdraw(minter.address))
          .to.emit(oathRings, 'EthWithdrawn')
          .withArgs(minter.address, expectedValue);
      });

      it('should withdrawTokens for onlyOwner', async () => {
        // test setup
        const expectedAmount = ethers.utils.parseUnits('10', 18);
        await (await testToken.transfer(oathRings.address, expectedAmount)).wait();

        // Test
        await expect(await oathRings.withdrawTokens(testToken.address, minter.address))
          .to.emit(oathRings, 'TokensWithdrawn')
          .withArgs(testToken.address, minter.address, expectedAmount);
      });
    });
  });

  describe('Mint functions Council', async () => {
    beforeEach(async () => {
      deployer = (await ethers.getSigners())[0];
      user = new ethers.Wallet(
        '0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef',
        deployer.provider,
      );
      OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
      oathRingsDescriptor = await OathRingsDescriptor.deploy();
      oathRingsDescriptor.deployed();
      OathRings = await ethers.getContractFactory('OathRings');
      oathRings = await OathRings.deploy(openseaProxy, oathRingsDescriptor.address, 7, 7);
      oathRings.deployed();
    });

    it('should reject oathRings mint maxSupply reached', async () => {
      await (await oathRings.mintCouncilOathRings(5)).wait();
      await (await oathRings.mintCouncilOathRings(2)).wait();
      await expect(oathRings.mintCouncilOathRings(2)).to.be.revertedWith(
        'quantity exceeds max supply',
      );
    });

    it('should mintToCouncilOathRings user oathRings 1', async () => {
      const tx = await oathRings.mintToCouncilOathRings(user.address, 1);
      const result = await tx.wait();
      const blockChainEvent = result.events[0];
      const newTokenId: number = Number(blockChainEvent.args['tokenId']);
      expect(newTokenId).to.equal(1);
      expect(await oathRings.balanceOf(user.address)).to.equal(1);
    });

    it('should mint oathRings 1', async () => {
      const blockChain = await oathRings.mintCouncilOathRings(1);
      const blockChainWait = await blockChain.wait();

      const blockChainEvent = blockChainWait.events[0];
      const newTokenId: number = Number(blockChainEvent.args['tokenId']);
      expect(newTokenId).to.equal(1);
    });

    it('should get oathRings token 1 type council', async () => {
      await await oathRings.mintCouncilOathRings(1);

      const collectionPrefix = await oathRingsDescriptor.__collectionPrefix();

      const tokenId = 1;
      const base64EncodedData: string = await oathRings.tokenURI(tokenId);

      const name = 'Council ';
      const description = await oathRingsDescriptor.councilDetails();
      const image = await oathRingsDescriptor.councilImage();

      expect(await oathRings.balanceOf(deployer.address)).to.equal(1);
      expect(await oathRings.hasCouncilRole(tokenId)).to.equal(true);
      expect(base64EncodedData).to.include(dataUriPrefix);

      const metadata = JSON.parse(atob(base64EncodedData.split(',')[1]));

      // Check name was correctly combined
      expect(metadata.name).to.equal(name + collectionPrefix + tokenId.toString());

      // Check description was correctly combined
      expect(metadata.description).to.equal(description);

      // Check image is set to collectionImage
      expect(metadata.image).to.deep.equal(image);
    });
  });

  describe('Mint functions Guild', async () => {
    beforeEach(async () => {
      deployer = (await ethers.getSigners())[0];
      user = new ethers.Wallet(
        '0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef',
        deployer.provider,
      );
      OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
      oathRingsDescriptor = await OathRingsDescriptor.deploy();
      oathRingsDescriptor.deployed();
      OathRings = await ethers.getContractFactory('OathRings');
      oathRings = await OathRings.deploy(openseaProxy, oathRingsDescriptor.address, 7, 7);
      oathRings.deployed();
    });

    it('should reject oathRings mint maxSupply reached', async () => {
      await oathRings.mintGuildOathRings(7);
      await expect(oathRings.mintGuildOathRings(2)).to.be.revertedWith(
        'quantity exceeds max supply',
      );
    });

    it('should mint oathRings 1', async () => {
      const blockChain = await oathRings.mintGuildOathRings(1);
      const blockChainWait = await blockChain.wait();

      const blockChainEvent = blockChainWait.events[0];
      const newTokenId: number = Number(blockChainEvent.args['tokenId']);
      expect(newTokenId).to.equal(8);
    });

    it('should mintToGuildOathRings user oathRings 1', async () => {
      const tx = await oathRings.mintToGuildOathRings(user.address, 1);
      const result = await tx.wait();
      const blockChainEvent = result.events[0];
      const newTokenId: number = Number(blockChainEvent.args['tokenId']);
      expect(newTokenId).to.equal(8);
      expect(await oathRings.balanceOf(user.address)).to.equal(1);
    });

    it('should get oathRings token 1 type guild', async () => {
      await await oathRings.mintGuildOathRings(1);
      const collectionPrefix = await oathRingsDescriptor.__collectionPrefix();

      const tokenId = 8;
      const base64EncodedData: string = await oathRings.tokenURI(tokenId);

      const name = 'Guild ';
      const description = await oathRingsDescriptor.guildDetails();
      const image = await oathRingsDescriptor.guildImage();

      expect(await oathRings.balanceOf(deployer.address)).to.equal(1);
      expect(await oathRings.hasCouncilRole(tokenId)).to.equal(false);
      expect(base64EncodedData).to.include(dataUriPrefix);

      const metadata = JSON.parse(atob(base64EncodedData.split(',')[1]));

      // Check name was correctly combined
      expect(metadata.name).to.equal(name + collectionPrefix + tokenId.toString());

      // Check description was correctly combined
      expect(metadata.description).to.equal(description);

      // Check image is set to collectionImage
      expect(metadata.image).to.deep.equal(image);
    });
  });

  describe('Mint All', async () => {
    beforeEach(async () => {
      deployer = (await ethers.getSigners())[0];
      user = new ethers.Wallet(
        '0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef',
        deployer.provider,
      );
      OathRingsDescriptor = await ethers.getContractFactory('OathRingsDescriptor');
      oathRingsDescriptor = await OathRingsDescriptor.deploy();
      oathRingsDescriptor.deployed();
      OathRings = await ethers.getContractFactory('OathRings');
      oathRings = await OathRings.deploy(openseaProxy, oathRingsDescriptor.address, 337, 1000);
      oathRings.deployed();
    });

    it('should mint all Oath rings', async () => {
      const maxCouncil = 337;
      const maxGuild = 1000;
      await (await oathRings.mintCouncilOathRings(137)).wait();
      await (await oathRings.mintCouncilOathRings(100)).wait();
      await (await oathRings.mintCouncilOathRings(100)).wait();

      expect(await oathRings.getTotalCouncilOathRings()).to.equal(maxCouncil);

      for (let i = 0; i < 10; i++) {
        await (await oathRings.mintGuildOathRings(100)).wait();
      }
      expect(await oathRings.getTotalGuildOathRings()).to.equal(maxGuild);

      expect(await oathRings.getTotalOathRings()).to.equal(maxCouncil + maxGuild);
    });
  });
});
