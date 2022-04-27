// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/access/Ownable.sol';

contract MintService is Ownable {
	uint8 public mintPhase = 0; // minting phase 0 stop, 1 start
	uint256 public mintedKeys = 0; // total number of minted keys

	/*
	 * @functionName startMinting
	 * @functionDescription start minting phase
	 */
	function startMinting() public onlyOwner {
		mintPhase = 1;
		mintedKeys = 0;
	}

	/*
	 * @functionName stopMinting
	 * @functionDescription stop minting phase
	 */
	function stopMinting() public onlyOwner {
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
	 * @functionName updateMintedKeys
	 * @functionDescription update total key minted
	 */
	function updateMintedKeys(uint8 _count) public {
		mintedKeys = mintedKeys + _count;
	}

	/*
	 * @functionName getMintedKeys
	 * @functionDescription get total key minted
	 */
	function getMintedKeys() public view returns (uint256) {
		return mintedKeys;
	}
}
