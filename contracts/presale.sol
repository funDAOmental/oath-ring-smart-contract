// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import 'hardhat/console.sol';

import './services/eth.service.sol';

import './libraries/helper.library.sol';

contract PreSale is ERC1155, Ownable, EthService {
	event TransferKeys(address indexed _receiver, uint256 _count);
	event ActivateKeys(address indexed _address, uint256 _randomNumber);

	using Counters for Counters.Counter;

	uint256 private price;

	struct AccessPassStruct {
		uint256 id;
		string name;
		uint256 maxSupply;
		uint256 price;
		string image;
	}

	struct AccessPassRandomNumberStruct {
		uint256 randomNumber;
		bool exists;
	}

	uint256 private constant MAXSUPPLY = 337; // presale max supply
	uint256 private constant ACCESSPASS = 1;
	string private constant ACCESSPASSURL = 'https://www.nftxt.xyz/api/accesspass?id=';
	string private constant ACCESSPASSIMGURL = 'https://www.nftxt.xyz/accesspass?id=';

	mapping(uint256 => AccessPassStruct) public accessPass;

	Counters.Counter private accessPassRandomNumberCount;
	mapping(address => AccessPassRandomNumberStruct) private accessPassRandomNumber;

	constructor(uint256 _price) ERC1155('https://www.nftxt.xyz/api/accesspass?id={id}') {
		price = _price;

		_mint(msg.sender, ACCESSPASS, MAXSUPPLY, '');

		AccessPassStruct storage accessPass1 = accessPass[ACCESSPASS];
		accessPass1.id = ACCESSPASS;
		accessPass1.name = 'AccessPass';
		accessPass1.maxSupply = MAXSUPPLY;
		accessPass1.price = _price;
		accessPass1.image = string(abi.encodePacked(ACCESSPASSIMGURL, Strings.toString(ACCESSPASS)));
	}

	function uri(uint256 _tokenId) public pure override returns (string memory) {
		return string(abi.encodePacked(ACCESSPASSURL, Strings.toString(_tokenId)));
	}

	// BLOCKCHAIN FUNCTION ==========================================================================================
	// blockchain mint
	// ERROR MSG:
	// NEC: not enough coins
	// DHA: dont have access pass
	// ADE: access pass not yet active

	/*
	 * @functionName transferPreSale
	 * @functionDescription transfer access pass
	 */
	function transferPreSale(
		address _owner, // user/wallet address of NFT owner
		address _receiver, // user/wallet address to recieve NFT
		uint8 _count // number of keys to mint
	) public payable {
		require(msg.value >= price * _count, 'NEC');

		safeTransferFrom(_owner, _receiver, ACCESSPASS, _count, '');
		emit TransferKeys(_receiver, _count);
	}

	/*
	 * @functionName batchTransferPreSale
	 * @functionDescription batch transfer access pass
	 */
	function batchTransferPreSale(
		address _owner, // user/wallet address of NFT owner
		address[] memory _receivers, // user/wallet address to recieve NFT
		uint8 _count // number of keys to mint
	) public onlyOwner {
		uint256 receiversLen = _receivers.length;

		uint256 i = 0;

		for (i; i < receiversLen; i++) {
			safeTransferFrom(_owner, _receivers[i], ACCESSPASS, _count, '');
		}
	}

	function activatePreSale(address _address) public {
		require(balanceOf(_address, ACCESSPASS) >= 1, 'DHA');

		uint256 randomNumber = HelperLibrary.getRandomNumber();

		AccessPassRandomNumberStruct storage apRandomNumber = accessPassRandomNumber[_address];
		apRandomNumber.randomNumber = randomNumber;
		apRandomNumber.exists = true;

		accessPassRandomNumberCount.increment();
		emit ActivateKeys(_address, randomNumber);
	}

	/*
	 * @functionName getActiveAccessPassCount
	 * @functionDescription get active access pass count
	 */
	function getActiveAccessPassCount() public view returns (uint256) {
		return accessPassRandomNumberCount.current();
	}

	/*
	 * @functionName getActiveAccessPassRandomNumber
	 * @functionDescription get active access pass random number
	 */
	function getActiveAccessPassRandomNumber(address _address) public view returns (uint256) {
		require(accessPassRandomNumber[_address].exists, 'ADE');

		return accessPassRandomNumber[_address].randomNumber;
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
	function getBaseURI() public pure returns (string memory) {
		return ACCESSPASSURL;
	}

	/*
	 * @functionName getAccessPass
	 * @functionDescription get access pass data
	 */
	function getAccessPass(uint256 _tokenId) public view returns (AccessPassStruct memory) {
		return accessPass[_tokenId];
	}
}
