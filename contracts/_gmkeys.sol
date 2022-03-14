// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.11;

// import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
// import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
// import '@openzeppelin/contracts/access/Ownable.sol';
// import '@openzeppelin/contracts/utils/Counters.sol';
// import 'hardhat/console.sol';

// contract GMKey is ERC721, ERC721Burnable, Ownable {
// 	using Counters for Counters.Counter;

// 	string private baseTokenURI;

// 	struct ProjectStruct {
// 		uint128 maxUnit;
// 		uint128 currentUnit;
// 		uint256 amount;
// 		bytes32 name;
// 		bool exists;
// 	}

// 	struct AddressStruct {
// 		uint128 maxUnit;
// 		uint128 currentUnit;
// 		bool exists;
// 	}

// 	struct NftStruct {
// 		address receiver;
// 		uint8 status; // 0 initial value, 1 win, 2 lose
// 		address code;
// 		bytes32 text;
// 		bytes32 image;
// 		uint256 timestamp;
// 	}

// 	mapping(address => bool) public whitelistedAddresses;
// 	mapping(address => ProjectStruct) public projects;
// 	mapping(address => AddressStruct) public addresses;

// 	Counters.Counter private nftCount;
// 	NftStruct[] public nfts;

// 	constructor(address _ownerAddress, string memory _baseTokenURI) ERC721('GMKey by NFTxT', 'GMKEY') {
// 		addAddress(20, _ownerAddress); // owner address can mint 20 number of nft
// 		addWhitelistedUser(_ownerAddress); // owner is whitelisted by default
// 		baseTokenURI = _baseTokenURI;
// 	}

// 	// OVERIDE FUNCTION ===========================================================================================
// 	/*
// 	 * @overrideName _baseURI
// 	 * @overrideDescription overide base token URI format (https://www.google.com/nft/)
// 	 */
// 	function _baseURI() internal view override returns (string memory) {
// 		return baseTokenURI;
// 	}

// 	/*
// 	 * @functionName getBaseURI
// 	 * @functionDescription get base uri
// 	 */
// 	function getBaseURI() public view returns (string memory) {
// 		return baseTokenURI;
// 	}

// 	// WHITELIST FUNCTION ===========================================================================================
// 	// add whitelist address list of address that allowed to mint nft
// 	// ERROR MSG:
// 	// AAE: address already exists

// 	/*
// 	 * @functionName addWhitelistedUser
// 	 * @functionDescription add whitelisted user
// 	 */
// 	function addWhitelistedUser(
// 		address _address // user/wallet address name
// 	) public onlyOwner {
// 		require(!whitelistedAddresses[_address], 'AAE');

// 		whitelistedAddresses[_address] = true;
// 	}

// 	/*
// 	 * @functionName addAllWhitelistedUser
// 	 * @functionDescription add all whitelisted user
// 	 */
// 	function addAllWhitelistedUser(
// 		address[] memory _address // user/wallet address name
// 	) public onlyOwner {
// 		for (uint256 i = 0; i < _address.length; i++) {
// 			if (!whitelistedAddresses[_address[i]]) {
// 				whitelistedAddresses[_address[i]] = true;
// 			}
// 		}
// 	}

// 	/*
// 	 * @functionName verifyWhitelistedUser
// 	 * @functionDescription verify whitelisted user
// 	 */
// 	function verifyWhitelistedUser(
// 		address _address // user/wallet address name
// 	) public view returns (bool) {
// 		return whitelistedAddresses[_address];
// 	}

// 	// PROJECT FUNCTION ===========================================================================================
// 	// add validation that project can only mint 500 nft (based on maxUnit)
// 	// ERROR MSG:
// 	// PAE: project already exists

// 	/*
// 	 * @functionName addProject
// 	 * @functionDescription add available project to mint
// 	 */
// 	function addProject(
// 		uint128 _maxUnit, // max unit
// 		uint128 _amount, // project nft price
// 		bytes32 _name, // project name
// 		address _code // project token address
// 	) public onlyOwner {
// 		require(!projects[_code].exists, 'PAE');

// 		ProjectStruct storage project1 = projects[_code];
// 		project1.maxUnit = _maxUnit; // default: 500
// 		project1.currentUnit = 0;
// 		project1.amount = _amount;
// 		project1.name = _name;
// 		project1.exists = true;
// 	}

// 	/*
// 	 * @functionName getOneProject
// 	 * @functionDescription get project information
// 	 */
// 	function getOneProject(address _code) public view returns (ProjectStruct memory) {
// 		return projects[_code];
// 	}

// 	// ADDRESS FUNCTION ===========================================================================================
// 	// add validation that user/wallet address can only mint 3 nft (based on maxUnit)
// 	// ERROR MSG:
// 	// PAE: address already exists

// 	/*
// 	 * @functionName addAddress
// 	 * @functionDescription add address of nft owner
// 	 */
// 	function addAddress(
// 		uint128 _maxUnit, // max unit
// 		address _address // user/wallet address name
// 	) internal {
// 		require(!addresses[_address].exists, 'AAE');

// 		AddressStruct storage address1 = addresses[_address];
// 		address1.maxUnit = _maxUnit; // default: 3
// 		address1.currentUnit = 1;
// 		address1.exists = true;
// 	}

// 	/*
// 	 * @functionName getOneAddress
// 	 * @functionDescription get address information
// 	 */
// 	function getOneAddress(address _address) public view returns (AddressStruct memory) {
// 		return addresses[_address];
// 	}

// 	// BLOCKCHAIN FUNCTION ==========================================================================================
// 	// blockchain mint and burn
// 	// ERROR MSG:
// 	// RNW: receiver is not whitelisted
// 	// PDE: project dosent exists
// 	// NEC: not enough coins
// 	// PMM: max project has been mint
// 	// AMM: max user/address been mint
// 	// ADE: address dosent exists
// 	// TID: token id dosent exists

// 	/*
// 	 * @functionName addToBlockChain
// 	 * @functionDescription mint gmkey and add it to the blockchain
// 	 */
// 	function addToBlockChain(
// 		address _receiver, // user/wallet to recieve NFT
// 		address _code, // project token address
// 		bytes32 _text, // ipfs text path
// 		bytes32 _image // ipfs image path
// 	) public payable {
// 		require(whitelistedAddresses[_receiver], 'RNW');
// 		require(projects[_code].exists, 'PDE');

// 		ProjectStruct storage project1 = projects[_code];
// 		require(msg.value >= project1.amount, 'NEC');
// 		require(project1.maxUnit > project1.currentUnit, 'PMM');

// 		AddressStruct storage address1 = addresses[_receiver];
// 		if (address1.exists) {
// 			require(address1.maxUnit > address1.currentUnit, 'AMM');
// 			address1.currentUnit += 1;
// 		} else {
// 			addAddress(3, _receiver);
// 		}

// 		nfts.push(NftStruct(payable(_receiver), 0, _code, _text, _image, block.timestamp));
// 		_safeMint(payable(_receiver), nftCount.current());

// 		project1.currentUnit += 1;
// 		nftCount.increment();
// 	}

// 	/*
// 	 * @functionName removeFromBlockChain
// 	 * @functionDescription burn gmkey and remove it to the blockchain
// 	 */
// 	function removeFromBlockChain(uint256 _tokenId) public {
// 		require(nfts.length > _tokenId, 'TID');

// 		delete nfts[_tokenId];
// 		_burn(_tokenId);
// 	}

// 	/*
// 	 * @functionName getNftCount
// 	 * @functionDescription get gmkey count
// 	 */
// 	function getNftCount() public view returns (uint256) {
// 		return nftCount.current();
// 	}

// 	/*
// 	 * @functionName getAllNft
// 	 * @functionDescription get all the list of minted gmkey
// 	 */
// 	function getAllNft() public view returns (NftStruct[] memory) {
// 		return nfts;
// 	}

// 	/*
// 	 * @functionName getFilteredNft
// 	 * @functionDescription get all the list of minted gmkey
// 	 */
// 	function getFilteredNft(
// 		uint256 _page,
// 		uint256 _resultsPerPage,
// 		address _code
// 	) public view returns (NftStruct[] memory, uint256) {
// 		// limit per page result to 20
// 		if (_resultsPerPage > 20) {
// 			_resultsPerPage = 20;
// 		}

// 		uint256 nftIndex = _resultsPerPage * _page - _resultsPerPage;
// 		// return emptry nfts
// 		if (nfts.length == 0 || nftIndex > nfts.length) {
// 			return (new NftStruct[](_resultsPerPage), 0);
// 		}

// 		// create temp nfts data
// 		NftStruct[] memory tempNfts = new NftStruct[](_resultsPerPage);
// 		uint256 tempNftCount = 0;

// 		for (nftIndex; nftIndex < _resultsPerPage * _page; nftIndex++) {
// 			// add array item unless out of bounds
// 			if (nftIndex < nfts.length) {
// 				if (_code == address(0)) {
// 					tempNfts[tempNftCount] = nfts[nftIndex];
// 					tempNftCount++;
// 				} else {
// 					if (nfts[nftIndex].code == _code) {
// 						tempNfts[tempNftCount] = nfts[nftIndex];
// 						tempNftCount++;
// 					}
// 				}
// 			}
// 		}

// 		return (tempNfts, tempNftCount);
// 	}

// 	/*
// 	 * @functionName getMyNft
// 	 * @functionDescription get nft of the user
// 	 */
// 	function getMyNft(
// 		address _address // user/wallet address name
// 	) public view returns (NftStruct[] memory, uint256) {
// 		require(addresses[_address].exists, 'ADE');

// 		uint256 resultsPerPage = addresses[_address].maxUnit;
// 		uint256 nftIndex = 0;

// 		// only show top 20
// 		if (resultsPerPage > 20) {
// 			resultsPerPage = 20;
// 		}

// 		// create temp nfts data
// 		NftStruct[] memory tempNfts = new NftStruct[](resultsPerPage);
// 		uint256 tempNftCount = 0;

// 		for (nftIndex; nftIndex < nfts.length; nftIndex++) {
// 			// add array item unless out of bounds
// 			if (nftIndex < nfts.length && tempNftCount < resultsPerPage && nfts[nftIndex].receiver == _address) {
// 				tempNfts[tempNftCount] = nfts[nftIndex];
// 				tempNftCount++;
// 			}
// 		}

// 		return (tempNfts, tempNftCount);
// 	}

// 	/*
// 	 * @functionName getOneNft
// 	 * @functionDescription get gmkey information
// 	 */
// 	function getOneNft(uint256 _tokenId) public view returns (NftStruct memory) {
// 		require(nfts.length > _tokenId, 'TID');

// 		return nfts[_tokenId];
// 	}
// }
