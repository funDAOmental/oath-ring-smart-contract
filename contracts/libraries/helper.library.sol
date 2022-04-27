// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

library HelperLibrary {
	function getSeed(uint256 _randomNumber) internal pure returns (uint128) {
		uint256 hashModulus = 10**16;
		uint256 random = uint256(keccak256(abi.encodePacked(_randomNumber)));

		return uint128(random % hashModulus);
	}

	function getEpochType(uint128 _seed, uint8 _epoch) internal pure returns (uint8) {
		uint8 epochType = uint8((_seed % 10) + 1);

		if (epochType <= _epoch) {
			return epochType;
		} else {
			return _epoch;
		}
	}
}
