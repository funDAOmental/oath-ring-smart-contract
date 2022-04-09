// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Randomness is VRFConsumerBase, Ownable {
	using Counters for Counters.Counter;

	struct KeyStruct {
		uint8 epoch;
		bool exists;
	}

	struct NftStruct {
		uint8 epoch;
		uint8 tickets;
		uint8 ticketType; // last digit of random number
		uint256 randomNumber;
		uint256 timestamp;
	}

	uint256 private vEPOCHENDTIME = 240660; // 4011 min
	uint256 private vLASTEPOCHENDTIME = 356040; // 5934 min
	// uint256 private vEPOCHTICKET = 4011; // max 24066
	// uint256 private vLASTEPOCHTICKET = 5934; // max 30000

	uint8 private activeEpoch = 0; // active epoch
	uint256 private totalTickets = 4011; // updated tickets on epoch
	uint256 private mintedTickets = 0; // total number of minted tickets

	uint8 private mintPhase = 0; // minting phase 0 stop, 1 start
	uint256 private mintStartTime = 0; // minting start time based on block.timestamp

	mapping(bytes32 => string) private nftKeys;
	mapping(string => KeyStruct) private uniqKeys; // user can mint 1x per epoch
	mapping(string => NftStruct) private nfts;
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

	// function getTestRandomNumber(string memory _identifier, uint8 _epoch) internal {
	// 	bytes32 requestIdTest = '0x5553455231';
	// 	uint256 randomnessTest = 67868570531905125450905257968959569476979017743827885017162909765141947220651; // should mock chain.link data

	// 	nftKeys[requestIdTest] = _identifier;
	// 	KeyStruct storage uniqkey = uniqKeys[_identifier];
	// 	uniqkey.epoch = _epoch;
	// 	uniqkey.exists = true;

	// 	uint256 chance = (randomnessTest % 100) + 1;

	// 	uint256 timeRemaining = uint256(mintStartTime - block.timestamp);
	// 	uint128 probability = uint128(((totalTickets - mintedTickets) * 100) / (timeRemaining / 60));
	// 	if (_epoch == 7) {
	// 		probability = 101;
	// 	}

	// 	uint8 tickets = getTickets(probability, chance);
	// 	if (_epoch == 7 && tickets == 0) {
	// 		tickets = 1;
	// 	}

	// 	mintedTickets = mintedTickets + tickets;

	// 	NftStruct storage nft = nfts[nftKeys[requestIdTest]];
	// 	nft.epoch = uniqKeys[nftKeys[requestIdTest]].epoch;
	// 	nft.tickets = tickets;
	// 	nft.ticketType = uint8(randomnessTest % 10);
	// 	nft.randomNumber = randomnessTest;
	// 	nft.timestamp = block.timestamp;

	// 	nftCount.increment();
	// }

	function getRandomNumber(string memory _identifier, uint8 _epoch) internal {
		bytes32 requestId = requestRandomness(keyHash, fee);

		nftKeys[requestId] = _identifier;
		KeyStruct storage uniqkey = uniqKeys[_identifier];
		uniqkey.epoch = _epoch;
		uniqkey.exists = true;
	}

	function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
		uint256 chance = (_randomness % 100) + 1;

		uint256 timeRemaining = uint256(mintStartTime - block.timestamp);
		uint128 probability = uint128(((totalTickets - mintedTickets) * 100) / (timeRemaining / 60));
		if (uniqKeys[nftKeys[_requestId]].epoch == 7) {
			probability = 101;
		}

		uint8 tickets = getTickets(probability, chance);
		if (uniqKeys[nftKeys[_requestId]].epoch == 7 && tickets == 0) {
			tickets = 1;
		}

		mintedTickets = mintedTickets + tickets;

		NftStruct storage nft = nfts[nftKeys[_requestId]];
		nft.epoch = uniqKeys[nftKeys[_requestId]].epoch;
		nft.tickets = tickets;
		nft.ticketType = uint8(_randomness % 10);
		nft.randomNumber = _randomness;
		nft.timestamp = block.timestamp;

		nftCount.increment();
	}

	/*
	 * @functionName getTickets
	 * @functionDescription get status value
	 */
	function getTickets(uint128 _probability, uint256 _chance) internal pure returns (uint8) {
		uint8 ticketValue = uint8((_probability * _chance) / 1000);

		if (ticketValue > 10) {
			ticketValue = 10;
		}

		return ticketValue;
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
	function startMintPhase(uint256 _totalTickets, uint8 _epoch) public onlyOwner {
		mintPhase = 1;

		activeEpoch = _epoch;
		totalTickets = _totalTickets;
		mintedTickets = 0;
		if (_epoch == 7) {
			mintStartTime = block.timestamp + vLASTEPOCHENDTIME;
		} else {
			mintStartTime = block.timestamp + vEPOCHENDTIME;
		}
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
	 * @functionName getMintedTickets
	 * @functionDescription get total tickets minted
	 */
	function getMintedTickets() public view returns (uint256) {
		return mintedTickets;
	}

	/*
	 * @functionName getTotalTickets
	 * @functionDescription get total tickets available
	 */
	function getTotalTickets() public view returns (uint256) {
		return totalTickets;
	}

	/*
	 * @functionName getRemainingTickets
	 * @functionDescription get remaining tickets available
	 */
	function getRemainingTickets() public view returns (uint256) {
		return uint256(totalTickets - mintedTickets);
	}

	/*
	 * @functionName getWinningPercentage
	 * @functionDescription get winning percentage
	 */
	function getWinningPercentage() public view returns (uint128) {
		uint256 timeRemaining = uint256(mintStartTime - block.timestamp);
		uint128 probability = uint128(((totalTickets - mintedTickets) * 100) / (timeRemaining / 60));
		if (activeEpoch == 7) {
			probability = 101;
		}

		return probability;
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
	// MTU: max ticket unlock
	// IAE: invalid active epoch

	/*
	 * @functionName unlockNft
	 * @functionDescription run the random number generator
	 */
	function unlockNft(string memory _identifier, uint8 _epoch) public {
		require(mintPhase == 1, 'MPS');
		require(!uniqKeys[_identifier].exists, 'KAE');
		require(mintStartTime >= block.timestamp, 'MPE');
		require(totalTickets >= mintedTickets, 'MTU');
		require(activeEpoch >= _epoch, 'IAE');

		require(LINK.balanceOf(address(this)) >= fee, 'NEC');
		getRandomNumber(_identifier, _epoch);
	}

	/*
	 * @functionName unlockTestNft
	 * @functionDescription run the test random number generator
	 */
	// function unlockTestNft(string memory _identifier, uint8 _epoch) public {
	// 	require(mintPhase == 1, 'MPS');
	// 	require(!uniqKeys[_identifier].exists, 'KAE');
	// 	require(mintStartTime >= block.timestamp, 'MPE');
	// 	require(totalTickets >= mintedTickets, 'MTU');
	// 	require(activeEpoch >= _epoch, 'IAE');

	// 	getTestRandomNumber(_identifier, _epoch);
	// }

	/*
	 * @functionName getNftCount
	 * @functionDescription get nft count
	 */
	function getNftCount() public view returns (uint256) {
		return nftCount.current();
	}

	/*
	 * @functionName getOneNft
	 * @functionDescription get nft data
	 */
	function getOneNft(string memory _identifier) public view returns (NftStruct memory) {
		return nfts[_identifier];
	}

	/*
	 * @functionName getOneTicket
	 * @functionDescription get nft ticket data
	 */
	function getOneTicket(string memory _identifier)
		public
		view
		returns (
			uint8,
			uint8,
			uint256
		)
	{
		return (nfts[_identifier].epoch, nfts[_identifier].tickets, nfts[_identifier].randomNumber);
	}
}
