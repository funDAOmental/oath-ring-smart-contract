// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract GMKeys is ERC721, ERC721Burnable, Ownable {
	using Counters for Counters.Counter;

	string private baseTokenURI;
	uint256 private price;

	struct NftStruct {
		address receiver;
		uint256 number;
		string epoch;
		uint256 timestamp;
	}

	struct AddressStruct {
		uint128 maxUnit;
		uint128 currentUnit;
		bool exists;
	}

	mapping(address => AddressStruct) public addresses;

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

	// ADDRESS FUNCTION ===========================================================================================
	// add validation that user/wallet address can only mint max 20 gmkeys (based on maxUnit)
	// ERROR MSG:
	// PAE: address already exists

	/*
	 * @functionName addAddress
	 * @functionDescription add address of nft owner
	 */
	function addAddress(
		uint128 _maxUnit, // max unit
		address _address // user/wallet address name
	) internal {
		require(!addresses[_address].exists, 'AAE');

		AddressStruct storage address1 = addresses[_address];
		address1.maxUnit = _maxUnit; // default: 20
		address1.currentUnit = 1;
		address1.exists = true;
	}

	/*
	 * @functionName getOneAddress
	 * @functionDescription get address information
	 */
	function getOneAddress(address _address) public view returns (AddressStruct memory) {
		return addresses[_address];
	}

	// BLOCKCHAIN FUNCTION ==========================================================================================
	// blockchain mint and burn
	// 	// ERROR MSG:
	// 	// NEC: not enough coins
	// 	// ADE: address dosent exists
	// 	// TID: token id dosent exists
	// 	// AMM: max user/address max gmkeys has been mint

	/*
	 * @functionName mintKeys
	 * @functionDescription mint gmkeys and add it to the blockchain
	 */
	function mintKeys(
		address _receiver, // user/wallet to recieve NFT
		string memory _epoch // epoch number
	) public payable {
		require(msg.value >= price, 'NEC');

		AddressStruct storage address1 = addresses[_receiver];
		if (address1.exists) {
			require(address1.maxUnit > address1.currentUnit, 'AMM');
			address1.currentUnit += 1;
		} else {
			addAddress(20, _receiver);
		}

		nfts.push(NftStruct(payable(_receiver), nftCount.current(), _epoch, block.timestamp));
		_safeMint(payable(_receiver), nftCount.current());

		nftCount.increment();
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
	 * @functionName getMyNft
	 * @functionDescription get gmkeys of the user
	 */
	function getMyNft(
		address _address // user/wallet address name
	) public view returns (NftStruct[] memory, uint256) {
		require(addresses[_address].exists, 'ADE');

		uint256 resultsPerPage = 20;
		uint256 nftIndex = 0;

		// create temp nfts data
		NftStruct[] memory tempNfts = new NftStruct[](resultsPerPage);
		uint256 tempNftCount = 0;

		for (nftIndex; nftIndex < nfts.length; nftIndex++) {
			// add array item unless out of bounds
			if (nftIndex < nfts.length && tempNftCount < resultsPerPage && nfts[nftIndex].receiver == _address) {
				tempNfts[tempNftCount] = nfts[nftIndex];
				tempNftCount++;
			}
		}

		return (tempNfts, tempNftCount);
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
