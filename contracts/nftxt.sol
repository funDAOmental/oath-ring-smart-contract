// SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Nftxt is ERC721, Ownable {
	using Counters for Counters.Counter;
	Counters.Counter private tokenIdCount;

	address payable internal ownerAddress;
	uint256 internal nftPrice;

	struct NftMetaDataStruct {
		string metaData;
		string nftLink;
		string nftId;
	}

	struct NftStruct {
		address sender;
		address receiver;
		uint256 tokenId;
		uint256 amount;
		uint256 timestamp;
		string name;
		string code;
		string text;
		string image;
		string nftUniqId;
		NftMetaDataStruct attributes;
	}

	NftStruct[] public nfts;

	struct UniqIdStruct {
		uint256 tokenId;
		bool exists;
	}
	mapping(string => UniqIdStruct) public nftUniqIds;

	event NewNftEvent(
		address sender,
		address receiver,
		uint256 tokenId,
		uint256 amount,
		uint256 timestamp,
		string name,
		string code,
		string text,
		string image
	);

	constructor(address payable _ownerAddress) ERC721('NFTxT', 'NFTxT') {
		ownerAddress = _ownerAddress;
		nftPrice = 0.1 * 10**18;
	}

	function addToBlockChain(
		address payable _receiver,
		string memory _name,
		string memory _code,
		string memory _text,
		string memory _image,
		string memory _metaData,
		string memory _nftLink,
		string memory _nftId
	) public returns (uint256) {
		string memory uniqId = string(abi.encodePacked(_code, _nftId));

		// check if uniqId already exists
		require(!nftUniqIds[uniqId].exists, 'NFT already Minted');

		tokenIdCount.increment();
		uint256 tokenId = tokenIdCount.current();

		UniqIdStruct storage nftUniqId = nftUniqIds[uniqId];
		nftUniqId.tokenId = tokenId;
		nftUniqId.exists = true;

		nfts.push(
			NftStruct(
				payable(msg.sender),
				payable(_receiver),
				tokenId,
				nftPrice,
				block.timestamp,
				_name,
				_code,
				_text,
				_image,
				uniqId,
				NftMetaDataStruct(_metaData, _nftLink, _nftId)
			)
		);
		_safeMint(payable(_receiver), tokenId);

		emit NewNftEvent(
			payable(msg.sender),
			payable(_receiver),
			tokenId,
			nftPrice,
			block.timestamp,
			_name,
			_code,
			_text,
			_image
		);
		return tokenId;
	}

	function getNftCount() public view returns (uint256) {
		return tokenIdCount.current();
	}

	function getAllNft() public view returns (NftStruct[] memory) {
		return nfts;
	}

	function getOneNft(uint256 _tokenId) public view returns (NftStruct memory) {
		return nfts[_tokenId];
	}
}
