import { expect } from 'chai';
import { ethers } from 'hardhat';

describe.only('presale', async () => {
	let PreSale: any;
	let presale: any;

	const owner: string = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
	const receiver1: string = '0x58933D8678b574349bE3CdDd3de115468e8cb3f0';
	const receiver2: string = '0x30eDEc1C25218F5a748cccc54C562d7879e47CaA';
	const receiver3: string = '0xB07243398f1d0094b64f4C0a61B8C03233914036';

	before(async () => {
		PreSale = await ethers.getContractFactory('PreSale');
		presale = await PreSale.deploy(ethers.utils.parseEther('0.1'));
		presale.deployed();
	});

	it('should initialize presale contract', async () => {
		expect(await presale.getPrice()).to.equal(ethers.utils.parseEther('0.1'));

		expect(await presale.getBaseURI()).to.equal('https://www.nftxt.xyz/api/accesspass?id=');

		const balance = await presale.balanceOf(owner, 1);
		expect(Number(balance)).to.equal(337);

		const blockChain = await presale.getAccessPass(1);
		expect(Number(blockChain['maxSupply'])).to.equal(337);
	});

	it('should generate batch presale (1, 2)', async () => {
		const blockChain = await presale.batchTransferPreSale(owner, [receiver1, receiver2], 2);
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['id']);
		expect(newTokenId).to.equal(1);

		const balance = await presale.balanceOf(owner, 1);
		expect(Number(balance)).to.equal(333);
	});

	it('should generate presale (1)', async () => {
		const blockChain = await presale.transferPreSale(owner, receiver1, 5, {
			value: ethers.utils.parseEther('0.5'),
		});
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['id']);
		expect(newTokenId).to.equal(1);

		const balance = await presale.balanceOf(owner, 1);
		expect(Number(balance)).to.equal(328);
	});

	it('should reject the presale (not enough coins)', async () => {
		await expect(
			presale.transferPreSale(owner, receiver1, 1, {
				value: ethers.utils.parseEther('0.01'),
			})
		).to.be.revertedWith('NEC');
	});

	it('should generate presale (2)', async () => {
		const blockChain = await presale.transferPreSale(owner, receiver2, 5, {
			value: ethers.utils.parseEther('0.5'),
		});
		const blockChainWait = await blockChain.wait();
		const blockChainEvent = blockChainWait.events[0];
		const newTokenId: number = Number(blockChainEvent.args['id']);
		expect(newTokenId).to.equal(1);

		const balance = await presale.balanceOf(owner, 1);
		expect(Number(balance)).to.equal(323);
	});

	it('should reject the activate presale (dont have access pass)', async () => {
		await expect(presale.activatePreSale(receiver3)).to.be.revertedWith('DHA');
	});

	it('should reject get activate presale random number (access pass not yet active)', async () => {
		await expect(presale.getActiveAccessPassRandomNumber(receiver1)).to.be.revertedWith('ADE');
	});

	it('should activate presale (1)', async () => {
		const blockChain = await presale.activatePreSale(receiver1);
		await blockChain.wait();

		const count = await presale.getActiveAccessPassCount();
		expect(Number(count)).to.equal(1);
	});

	it('should activate presale (2)', async () => {
		const blockChain = await presale.activatePreSale(receiver2);
		await blockChain.wait();

		const count = await presale.getActiveAccessPassCount();
		expect(Number(count)).to.equal(2);
	});

	it('should get activate presale random number (1, 2)', async () => {
		const randomNumber1 = await presale.getActiveAccessPassRandomNumber(receiver1);
		expect(Number(Number(randomNumber1) % 10)).to.be.an('number');

		const randomNumber2 = await presale.getActiveAccessPassRandomNumber(receiver2);
		expect(Number(Number(randomNumber2) % 10)).to.be.an('number');
	});

	it('should get receiver balance', async () => {
		const balance1 = await presale.balanceOf(receiver1, 1);
		expect(Number(balance1)).to.equal(7);

		const balance2 = await presale.balanceOf(receiver2, 1);
		expect(Number(balance2)).to.equal(7);
	});

	it('should withdraw contract balance', async () => {
		const ethBalance = await presale.getEthBalance();
		expect(Number(ethBalance)).to.equal(1000000000000000000);

		const withdraw = await presale.withdrawEthBalance();
		const blockChainWait = await withdraw.wait();
		expect(blockChainWait.status).to.equal(1);
	});
});
