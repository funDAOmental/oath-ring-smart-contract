// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import { Base64 } from 'base64-sol/base64.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract AccessPassDescriptor is Ownable {
	string public collectionImage = 'IPFS://QmTLdSeV4tozsJgW8EZus73GYYTgK48JgGMP45Txeyx4QJ';
    string public collectionDetails = 'Fundaomental AccessPass #';
    string[] public collectionAttributes;
    string public collectionNamePrefix = 'AccessPass #';

    struct TokenURIParams {
        string name;
        string description;
        string[] attributes;
        string image;
    }

    /**
	 * @notice Set the collectionImage IPFS image.
	 * @dev Only callable by the owner.
	 */
	function setCollectionImage(string memory collectionImage_) external onlyOwner {
		collectionImage = collectionImage_;
	}

    /**
	 * @notice Set the collectionAttributes
	 * @dev Only callable by the owner.
	 */
	function setCollectionAttributes(string[] memory collectionAttributes_) external onlyOwner {
        require(collectionAttributes_.length %2 == 0, 'ATTRIBUTE_SETUP_FAILED');
		collectionAttributes = collectionAttributes_;
	}

    /**
	 * @notice Set the collectionDetails text.
	 * @dev Only callable by the owner.
	 */
    function setCollectionDetails(string memory collectionDetails_) external onlyOwner {
		collectionDetails = collectionDetails_;
	}

    /**
	 * @notice Set the collectionNamePrefix.
	 * @dev Only callable by the owner.
	 */
    function setCollectionNamePrefix(string memory collectionNamePrefix_) external onlyOwner {
		collectionNamePrefix = collectionNamePrefix_;
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
        string memory tokenId
    ) external view returns (string memory) {
        string memory _name = string(abi.encodePacked(collectionNamePrefix, tokenId));
        string memory _description = string(abi.encodePacked(collectionDetails, tokenId));
        TokenURIParams memory params = TokenURIParams({
            name: _name,
            description: _description,
            attributes : collectionAttributes,
            image: collectionImage
        });
        return constructTokenURI(params);
    }
}