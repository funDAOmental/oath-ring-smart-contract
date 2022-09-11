// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { Base64 } from 'base64-sol/base64.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract OathRingsDescriptor is Ownable {
	string[3] public __attributes = ['role', 'access pass', 'weight'];
	string public __collectionPrefix = 'Oath Ring #';

	string public collectionCouncilImage = 'https://ipfs.io/ipfs/QmTLdSeV4tozsJgW8EZus73GYYTgK48JgGMP45Txeyx4QJ';
	string public collectionGuildImage = 'https://ipfs.io/ipfs/QmTLdSeV4tozsJgW8EZus73GYYTgK48JgGMP45Txeyx4QJ';
	string public collectionCouncilPrefix = 'Council ';
	string public collectionCouncilDetails =
		'funDAOmental is improving governance and helping people form reciprocal, cooperative communities. A High Council Oath Ring provides access to funDAOmental High Council governance and its reward pool, and VIP access to the team, community, releases and drops.';
	string public collectionGuildPrefix = 'Guild ';
	string public collectionGuildDetails =
		'funDAOmental is improving governance and helping people form reciprocal, cooperative communities. A Low Council Oath Ring provides access to funDAOmental Low Council governance and its reward pool.';

	struct TokenURIParams {
		string name;
		string description;
		string[3] attributes;
		string[3] attributeValues;
		string image;
	}

	/**
	 * @notice Set the collectionCouncilImage IPFS image.
	 * @dev Only callable by the owner.
	 */
	function setCollectionCouncilImage(string memory collectionCouncilImage_) external onlyOwner {
		collectionCouncilImage = collectionCouncilImage_;
	}

	/**
	 * @notice Set the collectionImage IPFS image.
	 * @dev Only callable by the owner.
	 */
	function setCollectionGuildImage(string memory collectionGuildImage_) external onlyOwner {
		collectionGuildImage = collectionGuildImage_;
	}

	/**
	 * @notice Set the collectionCouncilDetails text.
	 * @dev Only callable by the owner.
	 */
	function setCollectionCouncilDetails(string memory collectionCouncilDetails_) external onlyOwner {
		collectionCouncilDetails = collectionCouncilDetails_;
	}

	/**
	 * @notice Set the collectionCouncilDetails text.
	 * @dev Only callable by the owner.
	 */
	function setCollectionGuildDetails(string memory collectionGuildDetails_) external onlyOwner {
		collectionGuildDetails = collectionGuildDetails_;
	}

	/**
	 * @notice Set the collectionCouncilPrefix.
	 * @dev Only callable by the owner.
	 */
	function setCollectionCouncilPrefix(string memory collectionCouncilPrefix_) external onlyOwner {
		collectionCouncilPrefix = collectionCouncilPrefix_;
	}

	/**
	 * @notice Set the collectionGuildPrefix.
	 * @dev Only callable by the owner.
	 */
	function setCollectionGuildPrefix(string memory collectionGuildPrefix_) external onlyOwner {
		collectionGuildPrefix = collectionGuildPrefix_;
	}

	/**
	 * @notice Construct an ERC721 token attributes.
	 */
	function _generateAttributes(TokenURIParams memory params) internal pure returns (string memory attributes) {
		string memory _attributes = '[';
		if (params.attributes.length > 0) {
			string[3] memory att = params.attributes;
			string[3] memory attVal = params.attributeValues;
			for (uint256 i = 0; i < att.length; i++) {
				if (i == 0) {
					_attributes = string(
						abi.encodePacked(_attributes, '{"trait_type":"', att[i], '","value":"', attVal[i], '"}')
					);
				} else {
					_attributes = string(
						abi.encodePacked(_attributes, ',{"trait_type":"', att[i], '","value":"', attVal[i], '"}')
					);
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
	function constructTokenURI(TokenURIParams memory params) public pure returns (string memory) {
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
	function genericDataURI(string memory tokenId, uint256 tokenType) external view returns (string memory) {
		return constructTokenURI(_getTokenURIParams(tokenId, tokenType));
	}

	/**
	 * @notice Given a name, description, and seed, construct a base64 encoded data URI.
	 */
	function _getTokenURIParams(string memory tokenId, uint256 tokenType) internal view returns (TokenURIParams memory) {
		string memory _prefix = collectionGuildPrefix;
		string memory _details = collectionGuildDetails;
		string memory _image = collectionGuildImage;

		string[3] memory _attributeValues = ['low council', 'false', '1'];

		// overwrite for type 0
		if (tokenType == 0) {
			_prefix = collectionCouncilPrefix;
			_details = collectionCouncilDetails;
			_image = collectionCouncilImage;
			_attributeValues = ['high council', 'true', '1'];
		}

		_prefix = string(abi.encodePacked(_prefix, __collectionPrefix, tokenId));
		return
			TokenURIParams({
				name: _prefix,
				description: _details,
				attributes: __attributes,
				attributeValues: _attributeValues,
				image: _image
			});
	}
}
