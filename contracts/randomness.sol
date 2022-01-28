// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Randomness is VRFConsumerBase, Ownable {
	using Counters for Counters.Counter;

	// check if win or lose
	enum STATUS {
		win,
		lose
	}

	struct NftStruct {
		STATUS status;
		uint256 randomNumber;
		uint256 timestamp;
	}

	uint256 public totalKeys = 0; // total number of minted key
	uint8 public mintPhase = 0; // minting phase 0 stop, 1 start

	mapping(bytes32 => bytes32) public nftKeys;
	mapping(bytes32 => bool) public uniqKeys;
	mapping(bytes32 => NftStruct) public nfts;
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

	function getRandomNumber(bytes32 _identifier) internal {
		bytes32 requestId = requestRandomness(keyHash, fee);
		nftKeys[requestId] = _identifier;
	}

	function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
		STATUS randomStatus = STATUS(_randomness % 2);

		uniqKeys[nftKeys[_requestId]] = true;
		NftStruct storage nft = nfts[nftKeys[_requestId]];
		nft.status = randomStatus;
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

		require(LINK.balanceOf(address(this)) >= fee, 'NEC');

		getRandomNumber(_identifier);
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
