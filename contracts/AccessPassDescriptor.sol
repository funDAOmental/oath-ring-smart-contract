// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import { Base64 } from 'base64-sol/base64.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract AccessPassDescriptor is Ownable {
	string public collectionGoldImage = 'IPFS://QmTLdSeV4tozsJgW8EZus73GYYTgK48JgGMP45Txeyx4QJ';
    string public collectionSilverImage = 'IPFS://QmTLdSeV4tozsJgW8EZus73GYYTgK48JgGMP45Txeyx4QJ';
    string public collectionGoldDetails = 'Golden Oath Ring #';
    string public collectionSilverDetails = 'Silver Oath Ring #';
    string public collectionGoldPrefix = 'Golden Oath Ring #';
    string public collectionSilverPrefix = 'Silver Oath Ring #';

    struct TokenURIParams {
        string name;
        string description;
        string[2] attributes;
        string image;
    }

    /**
	 * @notice Set the collectionGoldImage IPFS image.
	 * @dev Only callable by the owner.
	 */
	function setCollectionGoldImage(string memory collectionGoldImage_) external onlyOwner {
		collectionGoldImage = collectionGoldImage_;
	}

    /**
	 * @notice Set the collectionImage IPFS image.
	 * @dev Only callable by the owner.
	 */
	function setCollectionSilverImage(string memory collectionSilverImage_) external onlyOwner {
		collectionSilverImage = collectionSilverImage_;
	}

    /**
	 * @notice Set the collectionGoldDetails text.
	 * @dev Only callable by the owner.
	 */
    function setCollectionGoldDetails(string memory collectionGoldDetails_) external onlyOwner {
		collectionGoldDetails = collectionGoldDetails_;
	}

    /**
	 * @notice Set the collectionGoldDetails text.
	 * @dev Only callable by the owner.
	 */
    function setCollectionSilverDetails(string memory collectionSilverDetails_) external onlyOwner {
		collectionSilverDetails = collectionSilverDetails_;
	}

    /**
	 * @notice Set the collectionGoldPrefix.
	 * @dev Only callable by the owner.
	 */
    function setCollectionGoldPrefix(string memory collectionGoldPrefix_) external onlyOwner {
		collectionGoldPrefix = collectionGoldPrefix_;
	}

    /**
	 * @notice Set the collectionSilverPrefix.
	 * @dev Only callable by the owner.
	 */
    function setCollectionSilverPrefix(string memory collectionSilverPrefix_) external onlyOwner {
		collectionSilverPrefix = collectionSilverPrefix_;
	}

    /**
     * @notice Construct an ERC721 token attributes.
     */
    function _generateAttributes(TokenURIParams memory params) internal pure returns (string memory attributes)
    {
        string memory _attributes = '[';
        if (params.attributes.length >0) {
            string [2] memory att = params.attributes;
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
        string memory tokenId,
        uint256 tokenType
    ) external view returns (string memory) {
        return constructTokenURI(_getTokenURIParams(tokenId, tokenType));
    }

    /**
     * @notice Given a name, description, and seed, construct a base64 encoded data URI.
     */
    function _getTokenURIParams(string memory tokenId, uint256 tokenType) internal view returns (TokenURIParams memory) {
        string memory _prefix = collectionSilverPrefix;
        string memory _details = collectionSilverDetails;
        string memory _image = collectionSilverImage;
        string[2] memory _attributes = ['type', unicode'☽'];

        // overwrite for type 0
        if (tokenType== 0) {
            _prefix = collectionGoldPrefix;
            _details = collectionGoldDetails;
            _image = collectionGoldImage;
            _attributes = ['type', unicode'☉'];
        }
        
        _prefix = string(abi.encodePacked(_prefix, tokenId));
        _details = string(abi.encodePacked(_details, tokenId));
        return TokenURIParams({
            name: _prefix,
            description: _details,
            attributes : _attributes,
            image: _image
        });
    }
}