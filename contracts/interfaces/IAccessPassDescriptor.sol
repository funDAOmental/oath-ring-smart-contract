// SPDX-License-Identifier: GPL-3.0

/// @title Interface for AccessPassDescriptor

pragma solidity ^0.8.11;

interface IAccessPassDescriptor {

    function genericDataURI(
        string memory name,
        string memory description,
        string[] memory attributes, 
        string memory image
    ) external view returns (string memory);

}
