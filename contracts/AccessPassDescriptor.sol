// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import { Base64 } from 'base64-sol/base64.sol';

contract AccessPassDescriptor {
    struct TokenURIParams {
        string name;
        string description;
        string[] attributes;
        string image;
    }
    /**
     * @notice Construct an ERC721 token attributes.
     */
    function _generateAttributes(TokenURIParams memory params) internal pure returns (string memory attributes)
    {
        string memory _attributes = '[';
        if (params.attributes.length >0) {
            string [] memory att = params.attributes;
            for (uint256 i = 0; i < att.length && i + 1 < att.length; i += 2) {
                if (i == 0) {
                    _attributes = string(abi.encodePacked(_attributes,'{"trait_type":"',att[i],'","value":"',att[i+1],'"}'));
                } else {
                    _attributes = string(abi.encodePacked(_attributes, ',{"trait_type":"',att[i],'","value":"',att[i+1],'"}'));
                }
            }
            _attributes = string(abi.encodePacked(_attributes, ']'));
            return _attributes;
        }
        // empty array

        return string(abi.encodePacked(_attributes, ']'));
    }

    /**
     * @notice Construct an ERC721 token URI.
     */
    function constructTokenURI(TokenURIParams memory params)
        public
        pure
        returns (string memory)
    {
        string memory attributes = _generateAttributes(params);
        // prettier-ignore
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                        '{"name":"', params.name, '","description":"', params.description, '","attributes":', attributes,',"image": "', params.image, '"}')
                    )
                )
            )
        );
    }

    /**
     * @notice Given a name, description, and seed, construct a base64 encoded data URI.
     */
    function genericDataURI(
        string memory name,
        string memory description,
        string[] memory attributes, 
        string memory image
    ) external pure returns (string memory) {
        TokenURIParams memory params = TokenURIParams({
            name: name,
            description: description,
            attributes : attributes,
            image: image
        });
        return constructTokenURI(params);
    }
}