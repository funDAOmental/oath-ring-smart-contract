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

	Counters.Counter private accessPassCount;

	address private royaltyPayout;
	bool private isOpenSeaProxyActive = true;

	// seller fee basis points 100 == 10%
	uint16 public sellerFeeBasisPoints = 100;
	uint256 public totalAccessPasses;
	uint256 private maxQuantity;

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
	constructor(address openSeaProxyRegistry_ , address accessPassDescriptor_, uint256 totalAccessPasses_, uint256 maxQuantity_) ERC721('Access Pass', 'ACCESS-PASS') {
		proxyRegistry = IProxyRegistry(openSeaProxyRegistry_);
		accessPassDescriptor = IAccessPassDescriptor(accessPassDescriptor_);
		totalAccessPasses = totalAccessPasses_;
		maxQuantity = maxQuantity_;
		royaltyPayout = address(this);
	}

	// ============ PUBLIC FUNCTIONS FOR MINTING ============

	/**
	 * @dev mint accesspass
	 * @param quantity_ quantity per mint
	 */
	function mint(uint8 quantity_) public onlyOwner {
		require(maxQuantity > quantity_, 'quantity exceeds');
		require(totalAccessPasses > accessPassCount.current() + quantity_, 'quantity exceeds max supply');

		uint8 i = 0;
		for (i; i < quantity_; i++) {
			_safeMint(msg.sender, accessPassCount.current());
			accessPassCount.increment();
		}
	}

	/**
	 * @dev mint accesspass
	 * @param to_ address to mint
	 * @param quantity_ quantity per mint
	 */
	function mintTo(address to_, uint8 quantity_) public onlyOwner {
		require(maxQuantity > quantity_, 'quantity exceeds');
		require(totalAccessPasses > accessPassCount.current() + quantity_, 'quantity exceeds max supply');

		uint8 i = 0;
		for (i; i < quantity_; i++) {
			_safeMint(to_, accessPassCount.current());
			accessPassCount.increment();
		}
	}

	// ============ PUBLIC READ-ONLY FUNCTIONS ==============

	/**
	 * @notice The IPFS URI of contract-level metadata.
	 */
	function contractURI() public view returns (string memory) {
		return string(abi.encodePacked('ipfs://', contractURIHash));
	}

	/**
	 * @dev getAccesspassCount
	 * @notice get accesspass count
	 */
	function getAccessPassCount() public view returns (uint256) {
		return accessPassCount.current();
	}

	/**
	 * @dev See {IERC721Metadata-tokenURI}.
	 */
	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		require(_exists(tokenId), 'Nonexistent token');
		return accessPassDescriptor.genericDataURI(tokenId.toString());
	}

	// ============ OWNER-ONLY ADMIN FUNCTIONS ============

	/**
	 * @notice Set the accessPassDescriptor.
	 * @dev Only callable by the owner.
	 */
	function setAccessPassDescriptor(address accessPassDescriptor_) external onlyOwner {
		require(accessPassDescriptor_ != address(0), 'INVALID_ADDRESS');
		accessPassDescriptor = IAccessPassDescriptor(accessPassDescriptor_);
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

	/**
	 * @notice
	 * set default selling fees will be interpreted if nothing 
	 * is specified
	 * @dev Only callable by the owner.
	 */
	function setSellerFeeBasisPoints(uint16 _sellerFeeBasisPoints) external onlyOwner {
		require(_sellerFeeBasisPoints <= 200, 'Max Roalty check failed! > 20%');
		sellerFeeBasisPoints = _sellerFeeBasisPoints;
	}

	/**
	 * @notice
	 * set default royalty payout address if nothing 
	 * is specified
	 * @dev Only callable by the owner.
	 */
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
	 * @dev See {IERC165-royaltyInfo}.
	 */
	function royaltyInfo(uint256 tokenId, uint256 salePrice)
		external
		view
		override
		returns (address receiver, uint256 royaltyAmount)
	{
		require(_exists(tokenId), 'Nonexistent token');
		return (royaltyPayout, SafeMath.div(SafeMath.mul(salePrice, sellerFeeBasisPoints), 1000));
	}
}
