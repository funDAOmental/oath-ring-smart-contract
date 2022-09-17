// SPDX-License-Identifier: GPL-3.0

/// @title Interface for OathRingsDescriptor

pragma solidity ^0.8.16;

interface IOathRingsDescriptor {
    function genericDataURI(string memory tokenId, uint256 tokenType) external view returns (string memory);
}
