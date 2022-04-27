// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

interface IRandomness {
	// [epoch, tickets, randomNumber]
	function getOneTicket(string memory _identifier)
		external
		view
		returns (
			uint8,
			uint8,
			uint256
		);
}
