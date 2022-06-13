// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import '@openzeppelin/contracts/interfaces/IERC2981.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import { IAccessPassDescriptor} from './interfaces/IAccessPassDescriptor.sol';
import { IProxyRegistry } from './external/opensea/IProxyRegistry.sol';

contract AccessPass is IERC2981, Ownable, ERC721Enumerable {
	using Strings for uint256;
	using Counters for Counters.Counter;

	string private baseURI;
	uint256 public totalAccessPasses;
	uint256 public maxQuantity;

	Counters.Counter private accesspassCount;

	string public collectionImage = 'IPFS://QmTLdSeV4tozsJgW8EZus73GYYTgK48JgGMP45Txeyx4QJ';
	address private royaltyPayout;
	bool private isOpenSeaProxyActive = true;

	// seller fee basis points 100 == 10%
	uint16 public sellerFeeBasisPoints = 100;

	// OpenSea's Proxy Registry
	IProxyRegistry public immutable proxyRegistry;
	IAccessPassDescriptor public accessPassDescriptor;

	// IPFS content hash of contract-level metadata
	string private contractURIHash = 'TODO';

	// ============ ACCESS CONTROL/SANITY MODIFIERS ============

	/**
	 * @dev
	 * @param openSeaProxyRegistry_ address for OpenSea proxy.
	 * @param accessPassDescriptor_ address for OpenSea proxy.
	 * @param totalAccessPasses_ total number of tokens
	 */
	constructor(address openSeaProxyRegistry_ , address accessPassDescriptor_, uint256 totalAccessPasses_) ERC721('Access Pass', 'ACCESS-PASS') {
		proxyRegistry = IProxyRegistry(openSeaProxyRegistry_);
		accessPassDescriptor = IAccessPassDescriptor(accessPassDescriptor_);
		totalAccessPasses = totalAccessPasses_;
		royaltyPayout = address(this);
	}

	// ============ PUBLIC FUNCTIONS FOR MINTING ============

	// ============ PUBLIC READ-ONLY FUNCTIONS ============

	function getBaseURI() external view returns (string memory) {
		return baseURI;
	}

	/**
	 * @notice The IPFS URI of contract-level metadata.
	 */
	function contractURI() public view returns (string memory) {
		return string(abi.encodePacked('ipfs://', contractURIHash));
	}

	// ============ OWNER-ONLY ADMIN FUNCTIONS ============

	function setBaseURI(string memory baseURI_) external onlyOwner {
		baseURI = baseURI_;
	}

	/**
	 * @notice Set the collectionImage IPFS image.
	 * @dev Only callable by the owner.
	 */
	function setCollectionImage(string memory collectionImage_) external onlyOwner {
		collectionImage = collectionImage_;
	}


	/**
	 * @notice Set the _contractURIHash.
	 * @dev Only callable by the owner.
	 */
	function setContractURIHash(string memory _contractURIHash) external onlyOwner {
		contractURIHash = _contractURIHash;
	}

	/**
	 * @notice
	 *  function to disable gasless listings for security in case
	 *  opensea ever shuts down or is compromised
	 * @dev Only callable by the owner.
	 */
	function setIsOpenSeaProxyActive(bool _isOpenSeaProxyActive) external onlyOwner {
		isOpenSeaProxyActive = _isOpenSeaProxyActive;
	}

	function setSellerFeeBasisPoints(uint16 _sellerFeeBasisPoints) external onlyOwner {
		require(_sellerFeeBasisPoints <= 200, 'Max Roalty check failed! > 20%');
		sellerFeeBasisPoints = _sellerFeeBasisPoints;
	}

	function setRoyaltyPayout(address _royaltyPayout) external onlyOwner {
		require(_royaltyPayout != address(0), 'Zero Address not allowed');
		royaltyPayout = _royaltyPayout;
	}

	// ============ FUNCTION OVERRIDES ============

	function supportsInterface(bytes4 interfaceId)
		public
		view
		virtual
		override(ERC721Enumerable, IERC165)
		returns (bool)
	{
		return interfaceId == type(IERC2981).interfaceId || super.supportsInterface(interfaceId);
	}

	/**
	 * @dev Override isApprovedForAll to allowlist user's OpenSea proxy accounts to enable gas-less listings.
	 */
	function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
		// Get a reference to OpenSea's proxy registry contract by instantiating
		// the contract using the already existing address.
		if (isOpenSeaProxyActive && proxyRegistry.proxies(owner) == operator) {
			return true;
		}

		return super.isApprovedForAll(owner, operator);
	}

	/**
	 * @dev See {IERC721Metadata-tokenURI}.
	 */
	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		require(_exists(tokenId), 'nonexistent token');
		return string(abi.encodePacked(baseURI, '/', tokenId.toString(), '.json'));
	}

	/**
	 * @dev See {IERC165-royaltyInfo}.
	 */
	function royaltyInfo(uint256 tokenId, uint256 salePrice)
		external
		view
		override
		returns (address receiver, uint256 royaltyAmount)
	{
		require(_exists(tokenId), 'nonexistent token');
		return (royaltyPayout, SafeMath.div(SafeMath.mul(salePrice, sellerFeeBasisPoints), 1000));
	}

	/*
	 * @functionName getAccesspassCount
	 * @functionDescription get accesspass count
	 */
	function getAccesspassCount() public view returns (uint256) {
		return accesspassCount.current();
	}

	/*
	 * @functionName mint
	 * @functionDescription mint accesspass
	 * @param _quantity quantity per mint
	 */
	function mint(uint8 _quantity) public onlyOwner {
		require(maxQuantity > _quantity, 'quantity exceeds');
		require(totalAccessPasses > accesspassCount.current() + _quantity, 'quantity exceeds max supply');

		uint8 i = 0;
		for (i; i < _quantity; i++) {
			_safeMint(msg.sender, accesspassCount.current());
			accesspassCount.increment();
		}
	}

	/*
	 * @functionName mintTo
	 * @functionDescription mint accesspass with given address
	 * @param _to address to mint
	 * @param _quantity quantity per mint
	 */
	function mintTo(address _to, uint8 _quantity) public onlyOwner {
		require(maxQuantity > _quantity, 'quantity exceeds');
		require(totalAccessPasses > accesspassCount.current() + _quantity, 'quantity exceeds max supply');

		uint8 i = 0;
		for (i; i < _quantity; i++) {
			_safeMint(_to, accesspassCount.current());
			accesspassCount.increment();
		}
	}
}
