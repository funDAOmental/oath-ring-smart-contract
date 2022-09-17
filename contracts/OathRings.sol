// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import '@openzeppelin/contracts/interfaces/IERC2981.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

import 'hardhat/console.sol';
import { IOathRingsDescriptor } from './interfaces/IOathRingsDescriptor.sol';
import { IProxyRegistry } from './external/opensea/IProxyRegistry.sol';

contract OathRings is IERC2981, Ownable, ERC721Enumerable {
    error InvalidAddress();
    using Strings for uint256;
    using Counters for Counters.Counter;
    mapping(address => bool) private isMinter;

    Counters.Counter private totalCount;
    Counters.Counter private councilCount;
    Counters.Counter private guildCount;

    address private royaltyPayout;
    bool private isOpenSeaProxyActive = true;

    // seller fee basis points 100 == 10%
    uint16 public sellerFeeBasisPoints = 100;
    uint256 public totalOathRings;
    uint256 public councilQuantity;
    uint256 public guildQuantity;

    // OpenSea's Proxy Registry
    IProxyRegistry public immutable proxyRegistry;
    IOathRingsDescriptor public oathRingsDescriptor;

    // IPFS content hash of contract-level metadata
    string private contractURIHash = 'TODO';

    // ============ ACCESS CONTROL/SANITY MODIFIERS ============

    /**
     * @dev
     * @param openSeaProxyRegistry_ address for OpenSea proxy.
     * @param oathRingsDescriptor_ address for OpenSea proxy.
     * @param councilQuantity_	total number of councilToken
     * @param guildQuantity_	total number of councilToken
     */
    constructor(
        address openSeaProxyRegistry_,
        address oathRingsDescriptor_,
        uint256 councilQuantity_,
        uint256 guildQuantity_
    ) ERC721('funDAOmental Oath Rings', 'OATHRINGS') {
        proxyRegistry = IProxyRegistry(openSeaProxyRegistry_);
        oathRingsDescriptor = IOathRingsDescriptor(oathRingsDescriptor_);

        // set total max supply
        totalOathRings = councilQuantity_ + guildQuantity_;
        // define quantity
        councilQuantity = councilQuantity_;
        guildQuantity = guildQuantity_;

        // setup counter
        councilCount._value = 1; // start with id 1
        guildCount._value = councilQuantity + 1; // start with councilQuantity offset
        royaltyPayout = address(this);
        isMinter[_msgSender()] = true;
    }

    modifier onlyMinter() {
        require(owner() == _msgSender(), 'Ownable: caller is not the owner');
        _;
    }

    // ============ PUBLIC FUNCTIONS FOR MINTING ============

    /**
     * @dev mintCouncil
     * @notice mint council token
     * @param quantity_ quantity per mint
     */
    function mintCouncil(uint256 quantity_) public onlyOwner {
        require(councilCount.current() + quantity_ - 1 <= councilQuantity, 'quantity exceeds max supply');
        for (uint256 i; i < quantity_; i++) {
            //console.log(councilCount.current());
            _safeMint(msg.sender, councilCount.current());
            councilCount.increment();
            totalCount.increment();
        }
    }

    /**
     * @dev mintGuild
     * @notice mint guild token
     * @param quantity_ quantity per mint
     */
    function mintGuild(uint256 quantity_) public onlyOwner {
        require(guildCount.current() - councilQuantity + quantity_ - 2 <= guildQuantity, 'quantity exceeds max supply');

        for (uint256 i; i < quantity_; i++) {
            _safeMint(msg.sender, guildCount.current());
            guildCount.increment();
            totalCount.increment();
        }
    }

    /**
     * @dev mintToCouncil
     * @notice mint council to token
     * @param to_ address to mint
     * @param quantity_ quantity per mint
     */
    function mintToCouncil(address to_, uint256 quantity_) public onlyOwner {
        require(councilCount.current() + quantity_ - 1 <= councilQuantity, 'quantity exceeds max supply');
        for (uint256 i; i < quantity_; i++) {
            _safeMint(to_, councilCount.current());
            councilCount.increment();
            totalCount.increment();
        }
    }

    /**
     * @dev mintToGuild
     * @notice mint guild to token
     * @param to_ address to mint
     * @param quantity_ quantity per mint
     */
    function mintToGuild(address to_, uint256 quantity_) public onlyOwner {
        require(guildCount.current() - councilQuantity + quantity_ - 2 <= guildQuantity, 'quantity exceeds max supply');
        for (uint256 i; i < quantity_; i++) {
            _safeMint(to_, guildCount.current());
            guildCount.increment();
            totalCount.increment();
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
        return totalCount.current();
    }

    /**
     * @dev getTotalCouncilOathRings
     * @notice get number of council oath rings
     */
    function getTotalCouncilOathRings() public view returns (uint256) {
        return councilCount.current() - 1;
    }

    /**
     * @dev getTotalGuildOathRings
     * @notice get number of guild oath rings
     */
    function getTotalGuildOathRings() public view returns (uint256) {
        return guildCount.current() - councilQuantity;
    }

    /**
     * @dev tokenURI.
     * @notice See {IERC721Metadata-tokenURI}.
     * @param tokenId token id
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), 'non-existent tokenId');
        return oathRingsDescriptor.genericDataURI(tokenId.toString(), getTokenType(tokenId));
    }

    /**
     * @dev getTokenType.
     * @notice get token type.
     * @param tokenId token id
     */
    function getTokenType(uint256 tokenId) public view returns (uint256) {
        return tokenId <= councilQuantity ? 0 : 1;
    }

    // ============ OWNER-ONLY ADMIN FUNCTIONS ============

    /**
     * @notice add minter address.
     * @dev Only callable by the owner.
     */
    function addMinter(address _minter) external onlyOwner {
        if (_minter == address(0)) revert InvalidAddress();
        isMinter[_minter] = true;
    }

    /**
     * @notice remove minter address.
     * @dev Only callable by the owner.
     */
    function removeMinter(address _minter) external onlyOwner {
        if (_minter == address(0)) revert InvalidAddress();
        delete isMinter[_minter];
    }

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
    function isApprovedForAll(address _owner, address operator)
        public
        view
        virtual
        override(IERC721, ERC721)
        returns (bool)
    {
        // Get a reference to OpenSea's proxy registry contract by instantiating
        // the contract using the already existing address.
        if (isOpenSeaProxyActive && proxyRegistry.proxies(_owner) == operator) {
            return true;
        }
        return super.isApprovedForAll(_owner, operator);
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
