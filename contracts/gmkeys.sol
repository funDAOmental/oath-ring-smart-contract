// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

interface IRandomness {
	// [epoch, tickets, randomNumber]
	function getOneTicket(string memory _identifier)
		external
		view
		returns (
			string memory,
			uint8,
			uint256
		);
}

contract GMKeys is ERC721, ERC721Burnable, Ownable {
	using Counters for Counters.Counter;

	string private baseTokenURI;
	uint256 private price;

	struct NftStruct {
		address receiver;
		uint256 number;
		string epoch;
		uint256 randomNumber;
		uint256 timestamp;
	}

	struct AddressStruct {
		address currentAddress;
		uint128 currentUnit;
		bool exists;
	}

	uint256 private totalKeys = 0; // total number of keys available
	uint256 private mintedKeys = 0; // total number of minted keys

	uint8 private mintPhase = 0; // minting phase 0 stop, 1 start

	mapping(string => AddressStruct) public addresses;

	Counters.Counter private nftCount;
	NftStruct[] public nfts;

	constructor(string memory _baseTokenURI, uint256 _price) ERC721('GMKeys by NFTxT', 'GMKEYS') {
		baseTokenURI = _baseTokenURI;
		price = _price;
	}

	// OVERIDE FUNCTION ===========================================================================================
	/*
	 * @overrideName _baseURI
	 * @overrideDescription overide base token URI format (https://www.nftxt.xyz/metadata?id=)
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
	 * @functionName getOneTicket
	 * @functionDescription get randomness ticket count
	 */
	function getOneTicket(address _randomnessAddress, string memory _identifier)
		public
		view
		returns (
			string memory,
			uint8,
			uint256
		)
	{
		return IRandomness(_randomnessAddress).getOneTicket(_identifier);
	}

	// CORE FUNCTION ===========================================================================================
	// core owner functionality

	/*
	 * @functionName startMintPhase
	 * @functionDescription start minting phase
	 */
	function startMintPhase(uint256 _totalKeys) public onlyOwner {
		mintPhase = 1;

		totalKeys = _totalKeys;
		mintedKeys = 0;
	}

	/*
	 * @functionName stopMintPhase
	 * @functionDescription stop minting phase
	 */
	function stopMintPhase() public onlyOwner {
		mintPhase = 0;
	}

	/*
	 * @functionName isMintingStart
	 * @functionDescription check if minting started
	 */
	function isMintingStart() public view returns (bool) {
		return mintPhase == 1;
	}

	/*
	 * @functionName getTotalKeys
	 * @functionDescription get total keys available
	 */
	function getTotalKeys() public view returns (uint256) {
		return totalKeys;
	}

	/*
	 * @functionName getMintedKeys
	 * @functionDescription get total tickets minted
	 */
	function getMintedKeys() public view returns (uint256) {
		return mintedKeys;
	}

	// ADDRESS FUNCTION ===========================================================================================
	// add validation that user/wallet address can only mint max 20 gmkeys (based on maxUnit)
	// ERROR MSG:
	// PAE: address already exists

	/*
	 * @functionName addAddress
	 * @functionDescription add address of nft owner
	 */
	function addAddress(
		address _receiver, // user/wallet address
		string memory _identifier, // user identifier
		uint8 _count // number of keys to mint
	) internal {
		require(!addresses[_identifier].exists, 'AAE');

		AddressStruct storage address1 = addresses[_identifier];
		address1.currentAddress = _receiver;
		address1.currentUnit = _count;
		address1.exists = true;
	}

	/*
	 * @functionName getOneAddress
	 * @functionDescription get address information
	 */
	function getOneAddress(string memory _identifier) public view returns (AddressStruct memory) {
		return addresses[_identifier];
	}

	// BLOCKCHAIN FUNCTION ==========================================================================================
	// blockchain mint and burn
	// 	// ERROR MSG:
	//  // MPS: minting phase stop
	// 	// NEC: not enough coins
	// 	// ADE: address dosent exists
	// 	// TID: token id dosent exists
	// 	// AMM: max user/address max gmkeys has been mint
	//  // NYR: user/address not yet registered

	// function mintTestKeys(
	// 	address _receiver, // user/wallet address to recieve NFT
	// 	string memory _identifier, // user identifier
	// 	address _randomnessAddress, // randomness contract address
	// 	uint8 _count // number of keys to mint
	// ) public payable {
	// 	require(mintPhase == 1, 'MPS');
	// 	require(msg.value >= price, 'NEC');

	// 	console.log(_randomnessAddress, '<RANDOM ADDRESS');
	// 	string memory epochTest = 'EPN001';
	// 	uint8 ticketTest = 5;
	// 	uint256 randomNumberTest = 67868570531905125450905257968959569476979017743827885017162909765141947220651; // should mock chain.link data

	// 	AddressStruct storage address1 = addresses[_identifier];
	// 	if (address1.exists) {
	// 		require(ticketTest >= (address1.currentUnit + _count), 'AMM');
	// 		address1.currentUnit += _count;
	// 	} else {
	// 		require(ticketTest >= _count, 'AMM');
	// 		addAddress(_receiver, _identifier, _count);
	// 	}

	// 	mintedKeys = mintedKeys + _count;

	// 	uint8 j = 1;
	// 	for (j; j <= _count; j++) {
	// 		nfts.push(NftStruct(payable(_receiver), nftCount.current(), epochTest, randomNumberTest, block.timestamp));
	// 		_safeMint(payable(_receiver), nftCount.current());

	// 		nftCount.increment();
	// 	}
	// }

	/*
	 * @functionName mintKeys
	 * @functionDescription mint gmkeys and add it to the blockchain
	 */
	function mintKeys(
		address _receiver, // user/wallet address to recieve NFT
		string memory _identifier, // user identifier
		address _randomnessAddress, // randomness contract address
		uint8 _count // number of keys to mint
	) public payable {
		require(mintPhase == 1, 'MPS');
		require(msg.value >= price, 'NEC');

		string memory epoch;
		uint8 ticket;
		uint256 randomNumber;
		(epoch, ticket, randomNumber) = getOneTicket(_randomnessAddress, _identifier);

		require(ticket >= 1, 'NYR');

		AddressStruct storage address1 = addresses[_identifier];
		if (address1.exists) {
			require(ticket >= (address1.currentUnit + _count), 'AMM');
			address1.currentUnit += _count;
		} else {
			require(ticket >= _count, 'AMM');
			addAddress(_receiver, _identifier, _count);
		}

		mintedKeys = mintedKeys + _count;

		uint8 j = 1;
		for (j; j <= _count; j++) {
			nfts.push(NftStruct(payable(_receiver), nftCount.current(), epoch, randomNumber, block.timestamp));
			_safeMint(payable(_receiver), nftCount.current());

			nftCount.increment();
		}
	}

	/*
	 * @functionName burnKeys
	 * @functionDescription burn gmkeys and remove it to the blockchain
	 */
	function burnKeys(uint256 _tokenId) public {
		require(nfts.length > _tokenId, 'TID');

		delete nfts[_tokenId];
		_burn(_tokenId);
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
		require(nfts.length > _tokenId, 'TID');

		return nfts[_tokenId];
	}
}
