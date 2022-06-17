// SPDX-License-Identifier: GPL-3.0

/// @title Interface for AccessPassDescriptor

pragma solidity ^0.8.11;

interface IAccessPassDescriptor {
	function genericDataURI(string memory tokenId_, uint8 type_) external view returns (string memory);
}
