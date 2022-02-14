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
	enum TICKETS {
		ONE,
		THREE,
		FIVE
	}

	struct NftStruct {
		STATUS status; // 0 lose, 1 win
		uint8 tickets;
		uint256 randomNumber;
		uint256 timestamp;
	}

	uint256 private EPOCH_END_TIME = 268560; // 4476 min

	uint256 private totalKeys = 0; // total number of minted key

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
	// 	uint256 randomnessTest = 67868570531905125450905257968959569476979017743827885017162909765141947220640; // should mock chain.link data

	// 	nftKeys[requestIdTest] = _identifier;

	// 	uint256 chance = (randomnessTest % 100) + 1;
	// 	uint256 ticketChance = randomnessTest % 3;

	// 	STATUS status = getStatus(chanceOfWinningPercentage >= chance);

	// 	uniqKeys[nftKeys[requestIdTest]] = true;
	// 	NftStruct storage nft = nfts[nftKeys[requestIdTest]];
	// 	nft.status = status;
	// 	nft.tickets = getTickets(status, TICKETS(ticketChance));
	// 	nft.randomNumber = randomnessTest;
	// 	nft.timestamp = block.timestamp;

	// 	nftCount.increment();
	// }

	function getRandomNumber(bytes32 _identifier) internal {
		bytes32 requestId = requestRandomness(keyHash, fee);
		nftKeys[requestId] = _identifier;
	}

	function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
		uint256 chance = (_randomness % 100) + 1;
		uint256 ticketChance = _randomness % 3;

		STATUS status = getStatus(chanceOfWinningPercentage >= chance);

		uniqKeys[nftKeys[_requestId]] = true;
		NftStruct storage nft = nfts[nftKeys[_requestId]];
		nft.status = status;
		nft.tickets = getTickets(status, TICKETS(ticketChance));
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
	function getTickets(STATUS _status, TICKETS _ticket) internal pure returns (uint8) {
		if (_status == STATUS.LOSE) {
			return 0;
		} else {
			if (_ticket == TICKETS.ONE) return 1;
			if (_ticket == TICKETS.THREE) return 3;
			if (_ticket == TICKETS.FIVE) return 5;

			return 0;
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
	 * @functionName getWinningPercentage
	 * @functionDescription get winning percentage
	 */
	function getWinningPercentage() public view returns (uint8) {
		return chanceOfWinningPercentage;
	}

	// UNLOCK FUNCTION ===========================================================================================
	// unlock gmkeys to identify if win/lose
	// ERROR MSG:
	// NEC: not enough coins
	// KAE: key identifier already exists
	// MPS: minting phase stop

	/*
	 * @functionName unlockNft
	 * @functionDescription run the random number generator
	 */
	function unlockNft(bytes32 _identifier) public {
		require(!uniqKeys[_identifier], 'KAE');
		require(mintPhase == 1, 'MPS');

		if (mintStartTime >= block.timestamp) {
			require(LINK.balanceOf(address(this)) >= fee, 'NEC');
			getRandomNumber(_identifier);

			// for test
			// getTestRandomNumber(_identifier);
		} else {
			stopMintPhase();
			require(false, 'MPS');
		}
	}

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
