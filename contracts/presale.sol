// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import 'hardhat/console.sol';

import './services/eth.service.sol';

contract PreSale is ERC1155, Ownable, EthService {
	event TransferKeys(address indexed _receiver, uint256 _count);

	string private baseTokenURI;
	uint256 private price;

	struct AccessPassStruct {
		uint256 id;
		string name;
		uint256 maxSupply;
		uint256 price;
		string image;
	}

	uint256 private constant MAXSUPPLY = 30000; // presale max supply
	uint256 private constant ACCESSPASS = 1;

	mapping(uint256 => AccessPassStruct) public accessPass;

	constructor(string memory _baseTokenURI, uint256 _price) ERC1155('https://www.nftxt.xyz/api/accesspass?id={id}') {
		baseTokenURI = _baseTokenURI;
		price = _price;

		_mint(msg.sender, ACCESSPASS, MAXSUPPLY, '');

		AccessPassStruct storage accessPass1 = accessPass[ACCESSPASS];
		accessPass1.id = ACCESSPASS;
		accessPass1.name = 'AccessPass';
		accessPass1.maxSupply = MAXSUPPLY;
		accessPass1.price = _price;
		accessPass1.image = string(
			abi.encodePacked('https://www.nftxt.xyz/api/imagepass?id=', Strings.toString(ACCESSPASS))
		);
	}

	function uri(uint256 _tokenId) public pure override returns (string memory) {
		return string(abi.encodePacked('https://www.nftxt.xyz/api/accesspass?id=', Strings.toString(_tokenId)));
	}

	// BLOCKCHAIN FUNCTION ==========================================================================================
	// blockchain mint
	// ERROR MSG:
	// NEC: not enough coins

	/*
	 * @functionName mintPreSale
	 * @functionDescription mint access pass
	 */
	function mintPreSale(
		address _owner, // user/wallet address of NFT owner
		address _receiver, // user/wallet address to recieve NFT
		uint8 _count // number of keys to mint
	) public payable {
		require(msg.value >= price * _count, 'NEC');

		safeTransferFrom(_owner, _receiver, ACCESSPASS, _count, '');
		emit TransferKeys(_receiver, _count);
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
	 * @functionName getAccessPass
	 * @functionDescription get access pass data
	 */
	function getAccessPass(uint256 _tokenId) public view returns (AccessPassStruct memory) {
		return accessPass[_tokenId];
	}
}
