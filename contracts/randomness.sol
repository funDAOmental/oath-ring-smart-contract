// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Randomness is VRFConsumerBase, Ownable {
	using Counters for Counters.Counter;

	struct KeyStruct {
		string epoch;
		bool exists;
	}

	struct NftStruct {
		string epoch;
		uint8 tickets;
		uint256 randomNumber;
		uint256 timestamp;
	}

	uint256 private vEPOCHENDTIME = 240660; // 4011 min
	uint256 private vLASTEPOCHENDTIME = 356040; // 5934 min
	uint256 private vEPOCHTICKET = 4011;
	uint256 private vLASTEPOCHTICKET = 5934;

	uint8 private chanceOfWinningPercentage = 100; // chance of winning percentage
	uint256 private totalTickets = 0; // total number of tickets available
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

	// function getTestRandomNumber(string memory _identifier, string memory _epoch) internal {
	// 	bytes32 requestIdTest = '0x5553455231';
	// 	uint256 randomnessTest = 67868570531905125450905257968959569476979017743827885017162909765141947220651; // should mock chain.link data

	// 	nftKeys[requestIdTest] = _identifier;
	// 	KeyStruct storage uniqkey = uniqKeys[_identifier];
	// 	uniqkey.epoch = _epoch;
	// 	uniqkey.exists = true;

	// 	uint256 timeRemaining = uint256(mintStartTime - block.timestamp);
	// 	uint256 probability = uint256(((totalTickets - mintedTickets) * 100) / (timeRemaining / 60));

	// 	uint256 chance = (randomnessTest % 100) + 1;

	// 	uint8 tickets = getTickets(probability, chance);
	// 	if (keccak256(abi.encodePacked(_epoch)) == keccak256(abi.encodePacked('EP007')) && tickets == 0) {
	// 		tickets = 1;
	// 	}

	// 	mintedTickets = mintedTickets + tickets;

	// 	NftStruct storage nft = nfts[nftKeys[requestIdTest]];
	// 	nft.epoch = uniqKeys[nftKeys[requestIdTest]].epoch;
	// 	nft.tickets = tickets;
	// 	nft.randomNumber = randomnessTest;
	// 	nft.timestamp = block.timestamp;

	// 	nftCount.increment();
	// }

	function getRandomNumber(string memory _identifier, string memory _epoch) internal {
		bytes32 requestId = requestRandomness(keyHash, fee);

		nftKeys[requestId] = _identifier;
		KeyStruct storage uniqkey = uniqKeys[_identifier];
		uniqkey.epoch = _epoch;
		uniqkey.exists = true;
	}

	function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
		uint256 timeRemaining = uint256(mintStartTime - block.timestamp);
		uint256 probability = uint256(((totalTickets - mintedTickets) * 100) / (timeRemaining / 60));

		uint256 chance = (_randomness % 100) + 1;
		uint8 tickets = getTickets(probability, chance);
		if (
			keccak256(abi.encodePacked(uniqKeys[nftKeys[_requestId]].epoch)) == keccak256(abi.encodePacked('EP007')) &&
			tickets == 0
		) {
			tickets = 1;
		}

		mintedTickets = mintedTickets + tickets;

		NftStruct storage nft = nfts[nftKeys[_requestId]];
		nft.epoch = uniqKeys[nftKeys[_requestId]].epoch;
		nft.tickets = tickets;
		nft.randomNumber = _randomness;
		nft.timestamp = block.timestamp;

		nftCount.increment();
	}

	/*
	 * @functionName getTickets
	 * @functionDescription get status value
	 */
	function getTickets(uint256 _probability, uint256 _chance) internal pure returns (uint8) {
		return uint8((_probability * _chance) / 1000);
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
	function startMintPhase(
		uint8 _chanceOfWinningPercentage,
		uint256 _totalTickets,
		uint8 _epoch
	) public onlyOwner {
		mintPhase = 1;

		chanceOfWinningPercentage = _chanceOfWinningPercentage;
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
	 * @functionName getTotalTickets
	 * @functionDescription get total tickets available
	 */
	function getTotalTickets() public view returns (uint256) {
		return totalTickets;
	}

	/*
	 * @functionName getMintedTickets
	 * @functionDescription get total tickets minted
	 */
	function getMintedTickets() public view returns (uint256) {
		return mintedTickets;
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
	// MTU: max ticket unlock

	/*
	 * @functionName unlockNft
	 * @functionDescription run the random number generator
	 */
	function unlockNft(string memory _identifier, string memory _epoch) public {
		require(mintPhase == 1, 'MPS');
		require(!uniqKeys[_identifier].exists, 'KAE');
		require(mintStartTime >= block.timestamp, 'MPE');
		if (keccak256(abi.encodePacked(_epoch)) == keccak256(abi.encodePacked('EP007'))) {
			require(vLASTEPOCHTICKET >= mintedTickets, 'MTU');
		} else {
			require(vEPOCHTICKET >= mintedTickets, 'MTU');
		}

		require(LINK.balanceOf(address(this)) >= fee, 'NEC');
		getRandomNumber(_identifier, _epoch);
	}

	/*
	 * @functionName unlockTestNft
	 * @functionDescription run the test random number generator
	 */
	// function unlockTestNft(string memory _identifier, string memory _epoch) public {
	// 	require(mintPhase == 1, 'MPS');
	// 	require(!uniqKeys[_identifier].exists, 'KAE');
	// 	require(mintStartTime >= block.timestamp, 'MPE');
	// 	if (keccak256(abi.encodePacked(_epoch)) == keccak256(abi.encodePacked('EP007'))) {
	// 		require(vLASTEPOCHTICKET >= mintedTickets, 'MTU');
	// 	} else {
	// 		require(vEPOCHTICKET >= mintedTickets, 'MTU');
	// 	}

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
			string memory,
			uint8,
			uint256
		)
	{
		return (nfts[_identifier].epoch, nfts[_identifier].tickets, nfts[_identifier].randomNumber);
	}
}
