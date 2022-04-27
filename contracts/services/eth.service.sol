// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/access/Ownable.sol';

contract EthService is Ownable {
	/*
	 * @functionName getEthBalance
	 * @functionDescription get eth token balance
	 */
	function getEthBalance() public view returns (uint256) {
		return address(this).balance;
	}

	/*
	 * @functionName withdrawEthBalance
	 * @functionDescription withdraw eth token balance
	 */
	function withdrawEthBalance() public payable onlyOwner {
		uint256 amount = address(this).balance;
		payable(msg.sender).transfer(amount);
	}
}
