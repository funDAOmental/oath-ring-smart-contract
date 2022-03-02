// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Randomness is VRFConsumerBase, Ownable {
	using Counters for Counters.Counter;

	enum STATUS {
		LOSE,
		WIN
	}

	struct NftStruct {
		STATUS status; // 0 lose, 1 win
		uint8 tickets;
		uint256 randomNumber;
		uint256 timestamp;
	}

	uint256 private EPOCH_END_TIME = 268560; // 4476 min

	uint256 private totalKeys = 0; // total number of minted key
	uint256 private totalTickets = 0; // total number of minted tickets

	uint8 private mintPhase = 0; // minting phase 0 stop, 1 start
	uint8 private chanceOfWinningPercentage = 100; // chance of winning percentage
	uint256 private mintStartTime = 0; // minting start time based on block.timestamp

	mapping(bytes32 => bool) private uniqKeys; // user can mint 1x per epoch
	mapping(bytes32 => bytes32) private nftKeys;
	mapping(bytes32 => NftStruct) private nfts;
	Counters.Counter private nftCount;

	bytes32 internal keyHash;
	uint256 internal fee;

	constructor(
		address _vrfCoordinator,
		address _linkToken,
		bytes32 _keyHash,
		uint256 _fee
	)
		VRFConsumerBase(
			_vrfCoordinator, // VRF Coordinator
			_linkToken // LINK Token
		)
	{
		keyHash = _keyHash;
		fee = _fee;
	}

	// function getTestRandomNumber(bytes32 _identifier) internal {
	// 	bytes32 requestIdTest = _identifier;
	// 	uint256 randomnessTest = 67868570531905125450905257968959569476979017743827885017162909765141947220651; // should mock chain.link data

	// 	uniqKeys[_identifier] = true;
	// 	nftKeys[requestIdTest] = _identifier;

	// 	uint256 chance = (randomnessTest % 100) + 1;
	// 	uint256 ticketChance = (randomnessTest % 10) + 1;

	// 	STATUS status = getStatus(chanceOfWinningPercentage >= chance);
	// 	uint8 tickets = getTickets(status, ticketChance);

	// 	totalTickets = totalTickets + tickets;

	// 	NftStruct storage nft = nfts[nftKeys[requestIdTest]];
	// 	nft.status = status;
	// 	nft.tickets = tickets;
	// 	nft.randomNumber = randomnessTest;
	// 	nft.timestamp = block.timestamp;

	// 	nftCount.increment();
	// }

	function getRandomNumber(bytes32 _identifier) internal {
		bytes32 requestId = requestRandomness(keyHash, fee);

		uniqKeys[_identifier] = true;
		nftKeys[requestId] = _identifier;
	}

	function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
		uint256 chance = (_randomness % 100) + 1;
		uint256 ticketChance = (_randomness % 10) + 1;

		STATUS status = getStatus(chanceOfWinningPercentage >= chance);
		uint8 tickets = getTickets(status, ticketChance);

		totalTickets = totalTickets + tickets;

		NftStruct storage nft = nfts[nftKeys[_requestId]];
		nft.status = status;
		nft.tickets = tickets;
		nft.randomNumber = _randomness;
		nft.timestamp = block.timestamp;

		nftCount.increment();
	}

	/*
	 * @functionName getStatus
	 * @functionDescription get status value
	 */
	function getStatus(bool _status) internal pure returns (STATUS) {
		if (_status) {
			return STATUS.WIN;
		}

		return STATUS.LOSE;
	}

	/*
	 * @functionName getTickets
	 * @functionDescription get status value
	 */
	function getTickets(STATUS _status, uint256 _ticket) internal pure returns (uint8) {
		if (_status == STATUS.LOSE) {
			return 0;
		} else {
			return uint8(_ticket);
		}
	}

	/*
	 * @functionName getKeyHash
	 * @functionDescription get key hash
	 */
	function getKeyHash() public view returns (bytes32) {
		return keyHash;
	}

	/*
	 * @functionName getFee
	 * @functionDescription get contract fee
	 */
	function getFee() public view returns (uint256) {
		return fee;
	}

	// CORE FUNCTION ===========================================================================================
	// core owner functionality

	/*
	 * @functionName startMintPhase
	 * @functionDescription start minting phase
	 */
	function startMintPhase(uint8 _chanceOfWinningPercentage, uint256 _totalKey) public onlyOwner {
		mintPhase = 1;

		totalKeys = _totalKey;
		totalTickets = 0;
		chanceOfWinningPercentage = _chanceOfWinningPercentage;
		mintStartTime = block.timestamp + EPOCH_END_TIME;
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
	 * @functionDescription get total keys minted
	 */
	function getTotalKeys() public view returns (uint256) {
		return totalKeys;
	}

	/*
	 * @functionName getTotalTickets
	 * @functionDescription get total tickets minted
	 */
	function getTotalTickets() public view returns (uint256) {
		return totalTickets;
	}

	/*
	 * @functionName getWinningPercentage
	 * @functionDescription get winning percentage
	 */
	function getWinningPercentage() public view returns (uint8) {
		return chanceOfWinningPercentage;
	}

	/*
	 * @functionName getLinkBalance
	 * @functionDescription get link token balance
	 */
	function getLinkBalance() public view returns (uint256) {
		return LINK.balanceOf(address(this));
	}

	// UNLOCK FUNCTION ===========================================================================================
	// unlock gmkeys to identify if win/lose
	// ERROR MSG:
	// NEC: not enough coins
	// KAE: key identifier already exists
	// MPS: minting phase stop
	// MPE: minting phase expired

	/*
	 * @functionName unlockNft
	 * @functionDescription run the random number generator
	 */
	function unlockNft(bytes32 _identifier) public {
		require(mintPhase == 1, 'MPS');
		require(!uniqKeys[_identifier], 'KAE');

		if (mintStartTime >= block.timestamp) {
			require(LINK.balanceOf(address(this)) >= fee, 'NEC');
			getRandomNumber(_identifier);
		} else {
			require(false, 'MPE');
		}
	}

	/*
	 * @functionName unlockTestNft
	 * @functionDescription run the test random number generator
	 */
	// function unlockTestNft(bytes32 _identifier) public {
	// 	require(mintPhase == 1, 'MPS');
	// 	require(!uniqKeys[_identifier], 'KAE');

	// 	getTestRandomNumber(_identifier);
	// }

	/*
	 * @functionName getNftCount
	 * @functionDescription get nft count
	 */
	function getNftCount() public view returns (uint256) {
		return nftCount.current();
	}

	/*
	 * @functionName getAllNft
	 * @functionDescription get nft data
	 */
	function getOneNft(bytes32 _identifier) public view returns (NftStruct memory) {
		return nfts[_identifier];
	}
}
