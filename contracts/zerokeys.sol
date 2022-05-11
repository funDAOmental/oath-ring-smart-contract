// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

import './services/eth.service.sol';
import './services/mint.service.sol';

import './libraries/helper.library.sol';

contract ZEROKeys is ERC721, ERC721Burnable, Ownable, EthService, MintService {
	event MintKeys(address indexed _receiver, uint256 _count);
	event TransferKeys(address indexed _receiver, uint256 _count);

	using Counters for Counters.Counter;

	string private baseTokenURI;
	uint256 private price;

	struct NftStruct {
		address receiver;
		uint256 number;
		uint128 seed;
		uint8 epoch;
		uint8 epochType; // 0
		uint256 randomNumber;
		uint256 timestamp;
	}

	uint256 private vMAXSUPPLY = 30000; // max gmkey supply
	uint256 private totalKeys = 0; // total number of keys available

	Counters.Counter private nftCount;
	NftStruct[] public nfts;

	constructor(string memory _baseTokenURI, uint256 _price) ERC721('ZEROKeys by funDAOmental', 'ZEROKEYS') {
		baseTokenURI = _baseTokenURI;
		price = _price;
	}

	// OVERIDE FUNCTION ===========================================================================================
	/*
	 * @overrideName _baseURI
	 * @overrideDescription overide base token URI format (https://www.nftxt.xyz/api/metadata?id=)
	 */
	function _baseURI() internal view override returns (string memory) {
		return baseTokenURI;
	}

	/*
	 * @functionName getPrice
	 * @functionDescription get price
	 */
	function getPrice() public view returns (uint256) {
		return price;
	}

	/*
	 * @functionName getBaseURI
	 * @functionDescription get base uri
	 */
	function getBaseURI() public view returns (string memory) {
		return baseTokenURI;
	}

	/*
	 * @functionName getTotalKeys
	 * @functionDescription get total keys available
	 */
	function getTotalKeys() public view returns (uint256) {
		return totalKeys;
	}

	/*
	 * @functionName startMintPhase
	 * @functionDescription start minting phase
	 */
	function startMintPhase(uint256 _totalKeys) public onlyOwner {
		super.startMinting();

		totalKeys = _totalKeys;
	}

	/*
	 * @functionName stopMintPhase
	 * @functionDescription stop minting phase
	 */
	function stopMintPhase() public onlyOwner {
		super.stopMinting();
	}

	// BLOCKCHAIN FUNCTION ==========================================================================================
	// blockchain mint and burn
	// ERROR MSG:
	// MPS: minting phase stop
	// NEC: not enough coins
	// TID: token id dosent exists
	// MSR: max supply of gmkeys reach
	// IGO: invalid gmkey owner

	// function mintTestKeys(
	// 	address _receiver, // user/wallet address to recieve NFT
	// 	uint8 _count // number of keys to mint
	// ) public payable {
	// 	require(super.isMintingStart(), 'MPS');
	// 	require(msg.value >= price * _count, 'NEC');
	// 	require(vMAXSUPPLY >= nftCount.current() + _count, 'MSR');

	// 	uint256 randomNumberTest = HelperLibrary.getRandomNumber();

	// 	uint8 j = 1;
	// 	for (j; j <= _count; j++) {
	// 		uint128 runningSeed = HelperLibrary.getSeed(randomNumberTest + nftCount.current());
	// 		nfts.push(
	// 			NftStruct(payable(_receiver), nftCount.current(), runningSeed, 0, 0, randomNumberTest, block.timestamp)
	// 		);
	// 		_safeMint(payable(_receiver), nftCount.current());

	// 		nftCount.increment();
	// 	}

	// 	super.updateMintedKeys(_count);
	// 	emit MintKeys(_receiver, _count);
	// }

	/*
	 * @functionName mintKeys
	 * @functionDescription mint gmkeys and add it to the blockchain
	 */
	function mintKeys(
		address _receiver, // user/wallet address to recieve NFT
		uint8 _count // number of keys to mint
	) public payable {
		require(super.isMintingStart(), 'MPS');
		require(msg.value >= price * _count, 'NEC');
		require(vMAXSUPPLY >= nftCount.current() + _count, 'MSR');

		uint256 randomNumber = HelperLibrary.getRandomNumber();

		uint8 j = 1;
		for (j; j <= _count; j++) {
			uint128 runningSeed = HelperLibrary.getSeed(randomNumber + nftCount.current());
			nfts.push(NftStruct(payable(_receiver), nftCount.current(), runningSeed, 0, 0, randomNumber, block.timestamp));
			_safeMint(payable(_receiver), nftCount.current());

			nftCount.increment();
		}

		super.updateMintedKeys(_count);
		emit MintKeys(_receiver, _count);
	}

	/*
	 * @functionName burnKeys
	 * @functionDescription burn gmkeys and remove it to the blockchain
	 */
	function burnKeys(uint256 _tokenId) public onlyOwner {
		require(_exists(_tokenId), 'TID');

		delete nfts[_tokenId];
		_burn(_tokenId);
	}

	/*
	 * @functionName transferKeys
	 * @functionDescription transfer gmkeys and transfer it to the blockchain
	 */
	function transferKeys(
		address _owner, // user/wallet address of NFT owner
		address _receiver, // user/wallet address to recieve NFT
		uint256 _tokenId
	) public {
		require(_exists(_tokenId), 'TID');
		require(_owner == ownerOf(_tokenId), 'IGO');

		transferFrom(_owner, _receiver, _tokenId);
		emit TransferKeys(_receiver, _tokenId);
	}

	/*
	 * @functionName getNftCount
	 * @functionDescription get gmkeys count
	 */
	function getNftCount() public view returns (uint256) {
		return nftCount.current();
	}

	/*
	 * @functionName getAllNft
	 * @functionDescription get all the list of minted gmkeys
	 */
	function getAllNft() public view returns (NftStruct[] memory) {
		return nfts;
	}

	/*
	 * @functionName getOneNft
	 * @functionDescription get gmkeys information
	 */
	function getOneNft(uint256 _tokenId) public view returns (NftStruct memory) {
		require(_exists(_tokenId), 'TID');

		return nfts[_tokenId];
	}
}
