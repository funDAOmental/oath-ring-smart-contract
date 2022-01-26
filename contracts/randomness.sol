// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@chainlink/contracts/src/v0.8/VRFConsumerBase.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

contract Randomness is VRFConsumerBase {
	using Counters for Counters.Counter;

	// check if win or lose
	enum STATUS {
		win,
		lose
	}

	struct NftStruct {
		address receiver;
		STATUS status;
		uint256 timestamp;
	}

	mapping(bytes32 => NftStruct) public nfts;
	Counters.Counter private nftCount;

	bytes32 internal keyHash;
	uint256 internal fee;

	constructor()
		VRFConsumerBase(
			0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF coordinator
			0x01BE23585060835E02B77ef475b0Cc51aA1e0709 // LINT token address
		)
	{
		keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
		fee = 0.1 * 10**18; // 0.1 LINK
	}

	function getRandomNumber() internal returns (bytes32 requestId) {
		return requestRandomness(keyHash, fee);
	}

	function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
		STATUS randomStatus = STATUS(randomness % 2);

		NftStruct storage nft = nfts[requestId];
		nft.receiver = msg.sender;
		nft.status = randomStatus;
		nft.timestamp = block.timestamp;

		nftCount.increment();
	}

	// UNLOCK FUNCTION ===========================================================================================
	// unlock gmkeys to identify if win/lose
	// ERROR MSG:
	// NEC: not enough coins

	/*
	 * @functionName unlockNft
	 * @functionDescription run the random number generator
	 */
	function unlockNft() public {
		require(LINK.balanceOf(address(this)) >= fee, 'NEC');

		getRandomNumber();
	}

	/*
	 * @functionName getBalance
	 * @functionDescription get contract balance
	 */
	function getBalance() public view returns (uint256) {
		return address(this).balance;
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
	function getAllNft(bytes32 requestId) public view returns (NftStruct memory) {
		return nfts[requestId];
	}
}
