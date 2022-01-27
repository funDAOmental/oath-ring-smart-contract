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
		address receiver;
		STATUS status;
		uint256 randomNumber;
		uint256 timestamp;
	}

	uint256 public totalKeys = 0; // total number of minted key
	uint8 public mintPhase = 0; // minting phase 0 stop, 1 start

	mapping(bytes32 => string) public nftKeys;
	mapping(string => bool) public uniqKeys;
	mapping(string => NftStruct) public nfts;
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

	function getRandomNumber(string memory _identifier) internal {
		bytes32 requestId = requestRandomness(keyHash, fee);
		nftKeys[requestId] = _identifier;
	}

	function fulfillRandomness(bytes32 _requestId, uint256 _randomness) internal override {
		STATUS randomStatus = STATUS(_randomness % 2);

		uniqKeys[nftKeys[_requestId]] = true;
		NftStruct storage nft = nfts[nftKeys[_requestId]];
		nft.receiver = msg.sender;
		nft.status = randomStatus;
		nft.randomNumber = _randomness;
		nft.timestamp = block.timestamp;

		nftCount.increment();
	}

	// CORE FUNCTION ===========================================================================================
	// core owner functionality

	/*
	 * @functionName addWhitelistedUser
	 * @functionDescription add whitelisted user
	 */
	function updateTotalKeys(uint256 _totalKey) public onlyOwner {
		totalKeys = _totalKey;
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
	function unlockNft(string memory _identifier) public {
		require(!uniqKeys[_identifier], 'KAE');
		require(mintPhase == 1, 'MPS');

		require(LINK.balanceOf(address(this)) >= fee, 'NEC');

		getRandomNumber(_identifier);
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
	function getOneNft(string memory _identifier) public view returns (NftStruct memory) {
		return nfts[_identifier];
	}
}
