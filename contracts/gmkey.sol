// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract GMKey is ERC721, ERC721URIStorage, Ownable {
	using Counters for Counters.Counter;

	string private baseTokenURI;

	constructor(address _ownerAddress, string memory _baseTokenURI) ERC721('GMKey by NFTxT', 'GMKEY') {
		addAddress(99999, _ownerAddress); // owner address can mint 99999 number of nft
		baseTokenURI = _baseTokenURI;
	}

	// OVERIDE FUNCTION ===========================================================================================
	// @overrideName _burn
	// @overrideDescription overide burn function
	function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
		super._burn(_tokenId);
	}

	// @overrideName tokenURI
	// @overrideDescription overide tokenURI function
	function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}

	// @overrideName _baseURI
	// @overrideDescription overide base token URI format (https://www.google.com/nft/)
	function _baseURI() internal view override returns (string memory) {
		return baseTokenURI;
	}

	// @functionName getBaseURI
	// @functionDescription get base uri
	function getBaseURI() public view returns (string memory) {
		return baseTokenURI;
	}

	// PROJECT FUNCTION =============================================================================================
	// add validation that project can only mint 500 nft (based on maxUnit)
	struct ProjectStruct {
		uint256 maxUnit;
		uint256 currentUnit;
		uint256 amount;
		string name;
		bool exists;
	}
	uint256 public projectCount;
	mapping(address => ProjectStruct) public projects;

	// @functionName addProject
	// @functionDescription add available project to mint
	function addProject(
		uint256 _maxUnit, // max unit
		uint256 _amount, // project nft price
		string memory _name, // project name
		address _code // project token address sample: "0x06012c8cf97bead5deae237070f9587f8e7a266d" -> CryptoKitties
	) public onlyOwner returns (bool) {
		// check if address already exists
		require(projects[_code].exists, 'project already exixts');

		ProjectStruct storage project1 = projects[_code];
		project1.maxUnit = _maxUnit;
		project1.currentUnit = 0;
		project1.amount = _amount;
		project1.name = _name;
		project1.exists = true;

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
	function getOneProject(address _code) public view returns (ProjectStruct memory) {
		return projects[_code];
	}

	// ADDRESS FUNCTION =============================================================================================
	// add validation that user/wallet address can only mint 3 nft (based on maxUnit)
	struct AddressStruct {
		uint256 maxUnit;
		uint256 currentUnit;
		bool exists;
	}
	uint256 public addressCount;
	mapping(address => AddressStruct) public addresses;

	// @functionName addAddress
	// @functionDescription add address of nft owner
	function addAddress(
		uint256 _maxUnit, // max unit
		address _address // user/wallet address name sample: "0x924634D6964E171498f2a292185b1554893D95E5" -> JNPL rinkeby testnet
	) internal returns (bool) {
		// check if address already exists
		require(addresses[_address].exists, 'address already exixts');

		AddressStruct storage address1 = addresses[_address];
		address1.maxUnit = _maxUnit;
		address1.currentUnit = 1;
		address1.exists = true;

		addressCount += 1;

		console.log('adress created address:', _address);
		return true;
	}

	// @functionName getAddressCount
	// @functionDescription get address count
	function getAddressCount() public view returns (uint256) {
		return addressCount;
	}

	// @functionName getOneAddress
	// @functionDescription get address information
	function getOneAddress(address _address) public view returns (AddressStruct memory) {
		return addresses[_address];
	}

	// BLOCKCHAIN FUNCTION ==========================================================================================
	struct NftStruct {
		address sender;
		address receiver;
		uint256 amount;
		address code;
		string name;
		string text;
		string image;
		uint256 timestamp;
	}
	Counters.Counter private nftCount;
	NftStruct[] public nfts;

	// @functionName addToBlockChain
	// @functionDescription mint gmkey and add it to the blockchain
	function addToBlockChain(
		address _receiver, // user/wallet to recieve NFT
		address _code, // project token address sample: "0x06012c8cf97bead5deae237070f9587f8e7a266d" -> CryptoKitties
		string memory _name, // nft name
		string memory _text, // ipfs text path
		string memory _image // ipfs image path
	) public payable returns (bool) {
		// check if project code dosent exits
		require(projects[_code].exists, 'project code dosent exixts');

		ProjectStruct storage project1 = projects[_code];
		require(msg.value >= project1.amount, 'not enough coins');
		require(project1.currentUnit >= project1.maxUnit, 'max project has been mint');

		AddressStruct storage address1 = addresses[_receiver];
		if (address1.exists) {
			require(address1.currentUnit >= address1.maxUnit, 'max user/address been mint');
			address1.currentUnit += 1;
		} else {
			addAddress(3, _receiver);
		}

		uint256 tokenId = nftCount.current();
		nfts.push(
			NftStruct(payable(msg.sender), payable(_receiver), project1.amount, _code, _name, _text, _image, block.timestamp)
		);
		_safeMint(payable(_receiver), tokenId);

		project1.currentUnit += 1;
		nftCount.increment();

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
		// TODO: add pagination and filtering
		// ???

		return nfts;
	}

	// @functionName getOneNft
	// @functionDescription get gmkey information
	function getOneNft(uint256 _tokenId) public view returns (NftStruct memory) {
		return nfts[_tokenId];
	}
}
