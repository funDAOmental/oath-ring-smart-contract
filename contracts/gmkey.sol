// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract GMKey is ERC721URIStorage, Ownable {
	event NewNftEvent(
		address sender,
		address receiver,
		uint256 tokenId,
		uint256 amount,
		uint256 timestamp,
		string code,
		string name,
		string text,
		string image
	);

	using Counters for Counters.Counter;

	address private ownerAddress;
	string private baseTokenURI;

	struct NftStruct {
		address sender;
		address receiver;
		uint256 tokenId;
		uint256 amount;
		uint256 timestamp;
		string code;
		string name;
		string text;
		string image;
	}
	Counters.Counter private nftCount;
	NftStruct[] public nfts;

	struct ProjectStruct {
		uint256 maxUnit;
		uint256 currentUnit;
		uint256 amount;
		string name;
		bool exists;
	}
	uint256 projectCount;
	mapping(string => ProjectStruct) public projects;

	constructor(address _ownerAddress, string memory _baseTokenURI) ERC721('GMKey', 'GMKey') {
		ownerAddress = _ownerAddress;
		baseTokenURI = _baseTokenURI;
	}

	// @functionName addProject
	// @functionDescription add available project to mint
	function addProject(
		uint256 _maxUnit, // max unit
		uint256 _amount, // project nft price
		string memory _name, // project name
		string memory _code // project token address sample: "0x06012c8cf97bead5deae237070f9587f8e7a266d" -> CryptoKitties
	) public returns (bool) {
		// TODO: check if owner
		// ???
		// return false;

		ProjectStruct storage project = projects[_code];
		project.maxUnit = _maxUnit;
		project.currentUnit = 0;
		project.amount = _amount;
		project.name = _name;
		project.exists = true;

		projectCount += 1;

		console.log('project created code:', _code);
		return true;
	}

	// @functionName getProjectCount
	// @functionDescription get project count
	function getProjectCount() public view returns (uint256) {
		return projectCount;
	}

	// @functionName getOneProject
	// @functionDescription get project information
	function getOneProject(string memory _code) public view returns (ProjectStruct memory) {
		return projects[_code];
	}

	// ================================================================================================================

	// @overrideName _baseURI
	// @overrideDescription overide base token URI format (https://www.google.com/nft/)
	function _baseURI() internal view virtual override returns (string memory) {
		return baseTokenURI;
	}

	// @functionName getBaseURI
	// @functionDescription get base uri
	function getBaseURI() public view returns (string memory) {
		return baseTokenURI;
	}

	// ================================================================================================================

	// @functionName addToBlockChain
	// @functionDescription mint gmkey and add it to the blockchain
	function addToBlockChain(
		address _receiver, // wallet to recieve NFT
		string memory _code, // project token address sample: "0x06012c8cf97bead5deae237070f9587f8e7a266d" -> CryptoKitties
		string memory _name, // nft name
		string memory _text, // ipfs text path
		string memory _image // ipfs image path
	) public returns (bool) {
		// check if project code dosent exits
		require(projects[_code].exists, 'project code dosent exixts');

		uint256 tokenId = nftCount.current();

		// increase project token
		ProjectStruct storage project = projects[_code];
		project.currentUnit += 1;

		nfts.push(
			NftStruct(
				payable(msg.sender),
				payable(_receiver),
				tokenId,
				project.amount,
				block.timestamp,
				_code,
				_name,
				_text,
				_image
			)
		);
		nftCount.increment();

		// mint token
		_safeMint(payable(_receiver), tokenId);

		// send to event listener
		emit NewNftEvent(
			payable(msg.sender),
			payable(_receiver),
			tokenId,
			project.amount,
			block.timestamp,
			_code,
			_name,
			_text,
			_image
		);

		console.log('nft created token:', tokenId);
		return true;
	}

	// @functionName getNftCount
	// @functionDescription get gmkey count
	function getNftCount() public view returns (uint256) {
		return nftCount.current();
	}

	// @functionName getAllNft
	// @functionDescription get all the list of minted gmkey
	function getAllNft() public view returns (NftStruct[] memory) {
		return nfts;
	}

	// @functionName getOneNft
	// @functionDescription get gmkey information
	function getOneNft(uint256 _tokenId) public view returns (NftStruct memory) {
		return nfts[_tokenId];
	}
}
