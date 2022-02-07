// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Randomness is VRFConsumerBase, Ownable {
	using Counters for Counters.Counter;

	struct NftStruct {
		uint8 status; // 1 win, 2 lose
		uint8 tickets; // 5, 3, 1 tickets
		uint256 randomNumber;
		uint256 timestamp;
	}

	uint256 private EPOCH_END_TIME = 268560; // 4476 min

	uint256 private totalKeys = 0; // total number of minted key
	uint8 private mintPhase = 0; // minting phase 0 stop, 1 start
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

		nftCount.increment(); // should start with 1
	}

	// function getRandomNumberTest(bytes32 _identifier) internal {
	// 	bytes32 requestIdTest = _identifier;
	// 	uint256 randomnessTest = 67868570531905125450905257968959569476979017743827885017162909765141947220640; // should mock chain.link data

	// 	nftKeys[requestIdTest] = _identifier;

	// 	uint8 randomStatus;
	// 	uint256 chanceOfWinning = totalKeys / uint256(nftCount.current());

	// 	if (chanceOfWinning >= 100) {
	// 		randomStatus = 1; // sure win
	// 	} else {
	// 		if (chanceOfWinning < 10) {
	// 			chanceOfWinning = 10; // mantain 10% chance of winning
	// 		}

	// 		uint256 chance = (randomnessTest % (100 - 1 + 1)) + 1;

	// 		if (chanceOfWinning >= chance) {
	// 			randomStatus = 1;
	// 		} else {
	// 			randomStatus = 2;
	// 		}
	// 	}

	// 	uniqKeys[nftKeys[requestIdTest]] = true;
	// 	NftStruct storage nft = nfts[nftKeys[requestIdTest]];
	// 	nft.status = randomStatus;
	// 	nft.tickets = 5;
	// 	nft.randomNumber = randomnessTest;
	// 	nft.timestamp = block.timestamp;

	// 	nftCount.increment();
	// }

	function getRandomNumber(bytes32 _identifier) internal {
		uint256 chanceOfWinning = totalKeys / nftCount.current();

		if (chanceOfWinning >= 100) {
			// sure win
			uniqKeys[_identifier] = true;
			NftStruct storage nft = nfts[_identifier];
			nft.status = 1;
			nft.tickets = 5;
			nft.randomNumber = 0;
			nft.timestamp = block.timestamp;

			nftCount.increment();
		} else {
			bytes32 requestId = requestRandomness(keyHash, fee);
			nftKeys[requestId] = _identifier;
		}
	}

	function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
		uint8 randomStatus;
		uint256 chanceOfWinning = totalKeys / nftCount.current();
		if (chanceOfWinning < 10) {
			chanceOfWinning = 10; // mantain 10% chance of winning
		}

		uint256 chance = (_randomness % (100 - 1 + 1)) + 1;

		if (chanceOfWinning >= chance) {
			randomStatus = 1;
		} else {
			randomStatus = 2;
		}

		uniqKeys[nftKeys[_requestId]] = true;
		NftStruct storage nft = nfts[nftKeys[_requestId]];
		nft.status = randomStatus;
		nft.tickets = 5;
		nft.randomNumber = _randomness;
		nft.timestamp = block.timestamp;

		nftCount.increment();
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
	 * @functionName updateTotalKeys
	 * @functionDescription update total keys minted
	 */
	function updateTotalKeys(uint256 _totalKey) public onlyOwner {
		totalKeys = _totalKey;
	}

	/*
	 * @functionName getTotalKeys
	 * @functionDescription get total keys minted
	 */
	function getTotalKeys() public view returns (uint256) {
		return totalKeys;
	}

	/*
	 * @functionName startMintPhase
	 * @functionDescription start minting phase
	 */
	function startMintPhase() public onlyOwner {
		mintPhase = 1;
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

		if (mintStartTime > block.timestamp) {
			require(LINK.balanceOf(address(this)) >= fee, 'NEC');
			getRandomNumber(_identifier);

			// for test
			// getRandomNumberTest(_identifier);
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
