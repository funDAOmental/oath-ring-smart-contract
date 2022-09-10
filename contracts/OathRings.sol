// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import '@openzeppelin/contracts/interfaces/IERC2981.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import 'hardhat/console.sol';

import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import { IOathRingsDescriptor } from './interfaces/IOathRingsDescriptor.sol';
import { IProxyRegistry } from './external/opensea/IProxyRegistry.sol';

contract OathRings is IERC2981, Ownable, ERC721Enumerable {
	using Strings for uint256;
	using Counters for Counters.Counter;

	Counters.Counter private accessPassCount;
	Counters.Counter private goldCount;
	Counters.Counter private silverCount;

	address private royaltyPayout;
	bool private isOpenSeaProxyActive = true;

	// seller fee basis points 100 == 10%
	uint16 public sellerFeeBasisPoints = 100;
	uint256 public totalOathRings;
	uint256 public maxQuantity = 5; // 5 default value
	uint256 public goldQuantity = 337; // 337 default value
	uint256 public silverQuantity = 1000; // 1000 default value

	// OpenSea's Proxy Registry
	IProxyRegistry public immutable proxyRegistry;
	IOathRingsDescriptor public oathRingsDescriptor;

	// IPFS content hash of contract-level metadata
	string private contractURIHash = 'TODO';

	mapping(uint256 => bool) public tokenType;

	// ============ ACCESS CONTROL/SANITY MODIFIERS ============

	/**
	 * @dev
	 * @param openSeaProxyRegistry_ address for OpenSea proxy.
	 * @param oathRingsDescriptor_ address for OpenSea proxy.
	 * @param goldQuantity_	total number of goldToken
	 * @param silverQuantity_	total number of goldToken
	 */
	constructor(
		address openSeaProxyRegistry_,
		address oathRingsDescriptor_,
		uint256 goldQuantity_,
		uint256 silverQuantity_
	) ERC721('Access Pass by funDAOmental', 'ACCESSPASS') {
		proxyRegistry = IProxyRegistry(openSeaProxyRegistry_);
		oathRingsDescriptor = IOathRingsDescriptor(oathRingsDescriptor_);
		totalOathRings = goldQuantity_ + silverQuantity_;
		goldQuantity = goldQuantity_;
		silverQuantity = silverQuantity_;
		royaltyPayout = address(this);
	}

	// ============ PUBLIC FUNCTIONS FOR MINTING ============

	/**
	 * @dev mintGold
	 * @notice mint gold token
	 * @param quantity_ quantity per mint
	 */
	function mintGold(uint8 quantity_) public onlyOwner {
		require(quantity_ <= maxQuantity, 'quantity exceeds max per tx');
		require(goldQuantity >= goldCount.current() + quantity_, 'quantity exceeds max supply');

		uint8 i = 0;
		for (i; i < quantity_; i++) {
			tokenType[accessPassCount.current()] = true;
			_safeMint(msg.sender, accessPassCount.current());
			goldCount.increment();
			accessPassCount.increment();
		}
	}

	/**
	 * @dev mintSilver
	 * @notice mint silver token
	 * @param quantity_ quantity per mint
	 */
	function mintSilver(uint8 quantity_) public onlyOwner {
		require(quantity_ <= maxQuantity, 'quantity exceeds max per tx');
		require(goldQuantity <= goldCount.current(), 'gold token is not yet minted');
		require(silverQuantity >= silverCount.current() + quantity_, 'quantity exceeds max supply');

		uint8 i = 0;
		for (i; i < quantity_; i++) {
			tokenType[accessPassCount.current()] = false;
			_safeMint(msg.sender, accessPassCount.current());
			silverCount.increment();
			accessPassCount.increment();
		}
	}

	/**
	 * @dev mintToGold
	 * @notice mint gold to token
	 * @param to_ address to mint
	 * @param quantity_ quantity per mint
	 */
	function mintToGold(address to_, uint8 quantity_) public onlyOwner {
		require(quantity_ <= maxQuantity, 'quantity exceeds max per tx');
		require(goldQuantity >= goldCount.current() + quantity_, 'quantity exceeds max supply');

		uint8 i = 0;
		for (i; i < quantity_; i++) {
			tokenType[accessPassCount.current()] = true;
			_safeMint(to_, accessPassCount.current());
			goldCount.increment();
			accessPassCount.increment();
		}
	}

	/**
	 * @dev mintToSilver
	 * @notice mint silver to token
	 * @param to_ address to mint
	 * @param quantity_ quantity per mint
	 */
	function mintToSilver(address to_, uint8 quantity_) public onlyOwner {
		require(quantity_ <= maxQuantity, 'quantity exceeds max per tx');
		require(goldQuantity <= goldCount.current(), 'gold token is not yet minted');
		require(silverQuantity >= silverCount.current() + quantity_, 'quantity exceeds max supply');

		uint8 i = 0;
		for (i; i < quantity_; i++) {
			tokenType[accessPassCount.current()] = false;
			_safeMint(to_, accessPassCount.current());
			silverCount.increment();
			accessPassCount.increment();
		}
	}

	// ============ PUBLIC READ-ONLY FUNCTIONS ==============

	/**
	 * @dev contractURI
	 * @notice The IPFS URI of contract-level metadata.
	 */
	function contractURI() public view returns (string memory) {
		return string(abi.encodePacked('ipfs://', contractURIHash));
	}

	/**
	 * @dev getTotalOathRings
	 * @notice get total oath rings
	 */
	function getTotalOathRings() public view returns (uint256) {
		return goldCount.current() + silverCount.current();
	}

	/**
	 * @dev getTotalGoldOathRings
	 * @notice get number of gold oath rings
	 */
	function getTotalGoldOathRings() public view returns (uint256) {
		return goldCount.current();
	}

	/**
	 * @dev getTotalSilverOathRings
	 * @notice get number of silver oath rings
	 */
	function getTotalSilverOathRings() public view returns (uint256) {
		return silverCount.current();
	}

	/**
	 * @dev tokenURI.
	 * @notice See {IERC721Metadata-tokenURI}.
	 * @param tokenId token id
	 */
	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		require(_exists(tokenId), 'non-existent tokenId');
		return oathRingsDescriptor.genericDataURI(tokenId.toString(), _getTokenType(tokenId));
	}

	/**
	 * @dev _getTokenType.
	 * @notice get token type.
	 * @param tokenId token id
	 */
	function _getTokenType(uint256 tokenId) internal view returns (uint256) {
		return tokenType[tokenId] ? 0 : 1;
	}

	// ============ OWNER-ONLY ADMIN FUNCTIONS ============

	/**
	 * @notice Set the oathRingsDescriptor.
	 * @dev Only callable by the owner.
	 */
	function setOathRingsDescriptor(address oathRingsDescriptor_) external onlyOwner {
		require(oathRingsDescriptor_ != address(0), 'INVALID_ADDRESS');
		oathRingsDescriptor = IOathRingsDescriptor(oathRingsDescriptor_);
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
		require(_sellerFeeBasisPoints <= 200, 'Max royalty check failed! > 20%');
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
	function isApprovedForAll(address owner, address operator) public view virtual override(IERC721, ERC721) returns (bool) {
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
		require(_exists(tokenId), 'non-existent tokenId');
		return (royaltyPayout, SafeMath.div(SafeMath.mul(salePrice, sellerFeeBasisPoints), 1000));
	}
}
