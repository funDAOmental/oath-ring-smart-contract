// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Nftxt is ERC721URIStorage {
	using Counters for Counters.Counter;
	Counters.Counter private tokenIdCount;

	address private ownerAddress;
	string private baseTokenURI;
	uint256 private nftPrice;

	struct NftMetaDataStruct {
		string nftLink;
		string nftId;
	}

	struct NftStruct {
		address sender;
		address receiver;
		uint256 tokenId;
		uint256 amount;
		uint256 timestamp;
		uint256 code;
		string name;
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
		uint256 code,
		string name,
		string text,
		string image
	);

	constructor(address _ownerAddress, string memory _baseTokenURI) ERC721('NFTxT', 'NFTxT') {
		ownerAddress = _ownerAddress;
		baseTokenURI = _baseTokenURI;

		// set nft price
		nftPrice = 0.1 * 10**18;
	}

	// @functionName _baseURI
	// @functionDescription overide base token URI format (https://www.google.com/nft/)
	function _baseURI() internal view virtual override returns (string memory) {
		return baseTokenURI;
	}

	// @functionName addToBlockChain
	// @functionDescription mint nftxt and add it to the blockchain
	function addToBlockChain(
		address _receiver, // wallet to recieve NFT
		uint256 _code, // project token address sample: "0x06012c8cf97bead5deae237070f9587f8e7a266d" -> CryptoKitties
		string memory _name, // original NFT name
		string memory _text, // ipfs text path
		string memory _image, // ipfs image path
		string memory _nftLink, // original NFT metadata link
		string memory _nftId //  original NFT id
	) public returns (uint256) {
		string memory uniqId = string(abi.encodePacked(_code, _nftId));

		// check if uniqId already exists
		require(!nftUniqIds[uniqId].exists, 'NFT already Minted');

		// increase token count
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
				_code,
				_name,
				_text,
				_image,
				uniqId,
				NftMetaDataStruct(_nftLink, _nftId)
			)
		);

		// mint token
		_safeMint(payable(_receiver), tokenId);

		emit NewNftEvent(
			payable(msg.sender),
			payable(_receiver),
			tokenId,
			nftPrice,
			block.timestamp,
			_code,
			_name,
			_text,
			_image
		);
		return tokenId;
	}

	// @functionName getNftCount
	// @functionDescription get nftxt count
	function getNftCount() public view returns (uint256) {
		return tokenIdCount.current();
	}

	// @functionName getAllNft
	// @functionDescription get all the list of minted nftxt
	function getAllNft() public view returns (NftStruct[] memory) {
		return nfts;
	}

	// @functionName getOneNft
	// @functionDescription get one nftxt
	function getOneNft(uint256 _tokenId) public view returns (NftStruct memory) {
		return nfts[_tokenId];
	}
}
