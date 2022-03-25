/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { GMKeys, GMKeysInterface } from "../GMKeys";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_baseTokenURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_count",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalCount",
        type: "uint256",
      },
    ],
    name: "MintKeys",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "addresses",
    outputs: [
      {
        internalType: "address",
        name: "currentAddress",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "currentUnit",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "burnKeys",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllNft",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "number",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "epoch",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "randomNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct GMKeys.NftStruct[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBaseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMintedKeys",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNftCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_identifier",
        type: "string",
      },
    ],
    name: "getOneAddress",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "currentAddress",
            type: "address",
          },
          {
            internalType: "uint128",
            name: "currentUnit",
            type: "uint128",
          },
          {
            internalType: "bool",
            name: "exists",
            type: "bool",
          },
        ],
        internalType: "struct GMKeys.AddressStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getOneNft",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "number",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "epoch",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "randomNumber",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct GMKeys.NftStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_randomnessAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_identifier",
        type: "string",
      },
    ],
    name: "getOneTicket",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalKeys",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isMintingStart",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "string",
        name: "_identifier",
        type: "string",
      },
      {
        internalType: "address",
        name: "_randomnessAddress",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_count",
        type: "uint8",
      },
    ],
    name: "mintKeys",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nfts",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "number",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "epoch",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "randomNumber",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalKeys",
        type: "uint256",
      },
    ],
    name: "startMintPhase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stopMintPhase",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526127106009556000600a819055600b55600c805460ff191690553480156200002b57600080fd5b5060405162002d4638038062002d468339810160408190526200004e9162000208565b604080518082018252600f81526e11d352d95e5cc8189e481391951e15608a1b602080830191825283518085019094526006845265474d4b45595360d01b908401528151919291620000a3916000916200014c565b508051620000b99060019060208401906200014c565b505050620000d6620000d0620000f660201b60201c565b620000fa565b8151620000eb9060079060208501906200014c565b50600855506200032a565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b8280546200015a90620002ed565b90600052602060002090601f0160209004810192826200017e5760008555620001c9565b82601f106200019957805160ff1916838001178555620001c9565b82800160010185558215620001c9579182015b82811115620001c9578251825591602001919060010190620001ac565b50620001d7929150620001db565b5090565b5b80821115620001d75760008155600101620001dc565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156200021c57600080fd5b82516001600160401b03808211156200023457600080fd5b818501915085601f8301126200024957600080fd5b8151818111156200025e576200025e620001f2565b604051601f8201601f19908116603f01168101908382118183101715620002895762000289620001f2565b81604052828152602093508884848701011115620002a657600080fd5b600091505b82821015620002ca5784820184015181830185015290830190620002ab565b82821115620002dc5760008484830101525b969092015195979596505050505050565b600181811c908216806200030257607f821691505b602082108114156200032457634e487b7160e01b600052602260045260246000fd5b50919050565b612a0c806200033a6000396000f3fe6080604052600436106101f95760003560e01c8063692f1d121161010d57806398d5fdca116100a0578063bbdaea6b1161006f578063bbdaea6b146105ac578063bdfe7d47146105db578063c87b56dd1461066a578063e985e9c51461068a578063f2fde38b146106d357600080fd5b806398d5fdca14610542578063a22cb46514610557578063b8046b1c14610577578063b88d4fde1461058c57600080fd5b8063715018a6116100dc578063715018a6146104e757806382831721146104fc5780638da5cb5b1461050f57806395d89b411461052d57600080fd5b8063692f1d12146104475780636bd449aa1461045c57806370a08231146104b2578063714c5398146104d257600080fd5b8063265aa621116101905780635c3e0da21161015f5780635c3e0da2146103b45780635ff0c75b146103c95780636352211e146103e557806363ba31cf1461040557806364d689881461042757600080fd5b8063265aa6211461033b5780633ccfd60b1461036c57806342842e0e1461037457806342966c681461039457600080fd5b806308e4c25f116101cc57806308e4c25f146102af578063095ea7b3146102dc5780632294bf4d146102fc57806323b872dd1461031b57600080fd5b806301ffc9a7146101fe57806302a7e3a31461023357806306fdde0314610255578063081812fc14610277575b600080fd5b34801561020a57600080fd5b5061021e610219366004612150565b6106f3565b60405190151581526020015b60405180910390f35b34801561023f57600080fd5b5061025361024e36600461216d565b610745565b005b34801561026157600080fd5b5061026a61078f565b60405161022a91906121de565b34801561028357600080fd5b5061029761029236600461216d565b610821565b6040516001600160a01b03909116815260200161022a565b3480156102bb57600080fd5b506102cf6102ca36600461216d565b6108a9565b60405161022a9190612242565b3480156102e857600080fd5b506102536102f7366004612271565b610a31565b34801561030857600080fd5b50600b545b60405190815260200161022a565b34801561032757600080fd5b5061025361033636600461229b565b610b47565b34801561034757600080fd5b5061035b61035636600461216d565b610b79565b60405161022a9594939291906122d7565b610253610c4e565b34801561038057600080fd5b5061025361038f36600461229b565b610cab565b3480156103a057600080fd5b506102536103af36600461216d565b610cc6565b3480156103c057600080fd5b50610253610d40565b3480156103d557600080fd5b5061021e600c5460ff1660011490565b3480156103f157600080fd5b5061029761040036600461216d565b610d76565b34801561041157600080fd5b5061041a610ded565b60405161022a9190612312565b34801561043357600080fd5b5061025361044236600461216d565b610f12565b34801561045357600080fd5b5061030d610fd5565b34801561046857600080fd5b5061047c610477366004612441565b610fe5565b6040805182516001600160a01b031681526020808401516001600160801b0316908201529181015115159082015260600161022a565b3480156104be57600080fd5b5061030d6104cd366004612476565b61105f565b3480156104de57600080fd5b5061026a6110e6565b3480156104f357600080fd5b506102536110f5565b61025361050a3660046124a0565b61112b565b34801561051b57600080fd5b506006546001600160a01b0316610297565b34801561053957600080fd5b5061026a6114d8565b34801561054e57600080fd5b5060085461030d565b34801561056357600080fd5b50610253610572366004612511565b6114e7565b34801561058357600080fd5b50600a5461030d565b34801561059857600080fd5b506102536105a736600461254d565b6114f2565b3480156105b857600080fd5b506105cc6105c73660046125c9565b61152a565b60405161022a93929190612617565b3480156105e757600080fd5b5061063b6105f6366004612441565b8051602081830181018051600d82529282019190930120915280546001909101546001600160a01b03909116906001600160801b03811690600160801b900460ff1683565b604080516001600160a01b0390941684526001600160801b03909216602084015215159082015260600161022a565b34801561067657600080fd5b5061026a61068536600461216d565b6115b6565b34801561069657600080fd5b5061021e6106a536600461263f565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b3480156106df57600080fd5b506102536106ee366004612476565b611681565b60006001600160e01b031982166380ac58cd60e01b148061072457506001600160e01b03198216635b5e139f60e01b145b8061073f57506301ffc9a760e01b6001600160e01b03198316145b92915050565b6006546001600160a01b031633146107785760405162461bcd60e51b815260040161076f90612672565b60405180910390fd5b600c805460ff19166001179055600a556000600b55565b60606000805461079e906126a7565b80601f01602080910402602001604051908101604052809291908181526020018280546107ca906126a7565b80156108175780601f106107ec57610100808354040283529160200191610817565b820191906000526020600020905b8154815290600101906020018083116107fa57829003601f168201915b5050505050905090565b600061082c82611719565b61088d5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161076f565b506000908152600460205260409020546001600160a01b031690565b6108e46040518060a0016040528060006001600160a01b03168152602001600081526020016060815260200160008152602001600081525090565b6108ed82611719565b61091f5760405162461bcd60e51b815260206004820152600360248201526215125160ea1b604482015260640161076f565b600f8281548110610932576109326126e2565b90600052602060002090600502016040518060a00160405290816000820160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b0316815260200160018201548152602001600282018054610994906126a7565b80601f01602080910402602001604051908101604052809291908181526020018280546109c0906126a7565b8015610a0d5780601f106109e257610100808354040283529160200191610a0d565b820191906000526020600020905b8154815290600101906020018083116109f057829003601f168201915b50505050508152602001600382015481526020016004820154815250509050919050565b6000610a3c82610d76565b9050806001600160a01b0316836001600160a01b03161415610aaa5760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b606482015260840161076f565b336001600160a01b0382161480610ac65750610ac681336106a5565b610b385760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000606482015260840161076f565b610b428383611736565b505050565b610b52335b826117a4565b610b6e5760405162461bcd60e51b815260040161076f906126f8565b610b4283838361188e565b600f8181548110610b8957600080fd5b60009182526020909120600590910201805460018201546002830180546001600160a01b039093169450909291610bbf906126a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610beb906126a7565b8015610c385780601f10610c0d57610100808354040283529160200191610c38565b820191906000526020600020905b815481529060010190602001808311610c1b57829003601f168201915b5050505050908060030154908060040154905085565b6006546001600160a01b03163314610c785760405162461bcd60e51b815260040161076f90612672565b6040514790339082156108fc029083906000818181858888f19350505050158015610ca7573d6000803e3d6000fd5b5050565b610b42838383604051806020016040528060008152506114f2565b610ccf33610b4c565b610d345760405162461bcd60e51b815260206004820152603060248201527f4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f7760448201526f1b995c881b9bdc88185c1c1c9bdd995960821b606482015260840161076f565b610d3d81611a2a565b50565b6006546001600160a01b03163314610d6a5760405162461bcd60e51b815260040161076f90612672565b600c805460ff19169055565b6000818152600260205260408120546001600160a01b03168061073f5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b606482015260840161076f565b6060600f805480602002602001604051908101604052809291908181526020016000905b82821015610f095760008481526020908190206040805160a0810182526005860290920180546001600160a01b0316835260018101549383019390935260028301805492939291840191610e64906126a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610e90906126a7565b8015610edd5780601f10610eb257610100808354040283529160200191610edd565b820191906000526020600020905b815481529060010190602001808311610ec057829003601f168201915b505050505081526020016003820154815260200160048201548152505081526020019060010190610e11565b50505050905090565b6006546001600160a01b03163314610f3c5760405162461bcd60e51b815260040161076f90612672565b610f4581611719565b610f775760405162461bcd60e51b815260206004820152600360248201526215125160ea1b604482015260640161076f565b600f8181548110610f8a57610f8a6126e2565b60009182526020822060059091020180546001600160a01b03191681556001810182905590610fbc6002830182612067565b50600060038201819055600490910155610d3d81611a2a565b6000610fe0600e5490565b905090565b60408051606081018252600080825260208201819052818301529051600d9061100f908490612749565b908152604080516020928190038301812060608201835280546001600160a01b03168252600101546001600160801b03811693820193909352600160801b90920460ff1615159082015292915050565b60006001600160a01b0382166110ca5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b606482015260840161076f565b506001600160a01b031660009081526003602052604090205490565b60606007805461079e906126a7565b6006546001600160a01b0316331461111f5760405162461bcd60e51b815260040161076f90612672565b6111296000611ac5565b565b600c5460ff166001146111665760405162461bcd60e51b81526020600482015260036024820152624d505360e81b604482015260640161076f565b8060ff16600854611177919061277b565b3410156111ac5760405162461bcd60e51b81526020600482015260036024820152624e454360e81b604482015260640161076f565b8060ff166111b9600e5490565b6111c3919061279a565b60095410156111fa5760405162461bcd60e51b815260206004820152600360248201526226a9a960e91b604482015260640161076f565b6060600080611209858761152a565b91945092509050600160ff8316101561124a5760405162461bcd60e51b8152602060048201526003602482015262272ca960e91b604482015260640161076f565b6000600d8760405161125c9190612749565b908152604051908190036020019020600181015490915060ff600160801b909104161561132c57600181015461129f9060ff8716906001600160801b03166127b2565b6001600160801b03168360ff1610156112e05760405162461bcd60e51b8152602060048201526003602482015262414d4d60e81b604482015260640161076f565b60018101805460ff871691906000906113039084906001600160801b03166127b2565b92506101000a8154816001600160801b0302191690836001600160801b03160217905550611373565b8460ff168360ff1610156113685760405162461bcd60e51b8152602060048201526003602482015262414d4d60e81b604482015260640161076f565b611373888887611b17565b60015b8560ff168160ff161161146f57600f6040518060a001604052808b6001600160a01b031681526020016113a8600e5490565b8152602081018890526040016113c160ff85168761279a565b815242602091820152825460018082018555600094855293829020835160059092020180546001600160a01b0319166001600160a01b0390921691909117815582820151938101939093556040820151805192939261142692600285019201906120a1565b506060820151816003015560808201518160040155505061144f8961144a600e5490565b611be9565b61145d600e80546001019055565b80611467816127dd565b915050611376565b8560ff16600b54611480919061279a565b600b8190556040805160ff8916815260208101929092526001600160a01b038b16917f3cd3543ca4496d4ff557ba17c2e827932e1cc93e7069aadc76c1cb14ccf0a94d910160405180910390a2505050505050505050565b60606001805461079e906126a7565b610ca7338383611c03565b6114fc33836117a4565b6115185760405162461bcd60e51b815260040161076f906126f8565b61152484848484611cd2565b50505050565b60606000806060600080876001600160a01b031663037bee48886040518263ffffffff1660e01b815260040161156091906121de565b600060405180830381865afa15801561157d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526115a591908101906127fd565b919750955093505050509250925092565b60606115c182611719565b6116255760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b606482015260840161076f565b600061162f6110e6565b9050600081511161164f576040518060200160405280600081525061167a565b8061165984611d05565b60405160200161166a929190612894565b6040516020818303038152906040525b9392505050565b6006546001600160a01b031633146116ab5760405162461bcd60e51b815260040161076f90612672565b6001600160a01b0381166117105760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161076f565b610d3d81611ac5565b6000908152600260205260409020546001600160a01b0316151590565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061176b82610d76565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b60006117af82611719565b6118105760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b606482015260840161076f565b600061181b83610d76565b9050806001600160a01b0316846001600160a01b031614806118565750836001600160a01b031661184b84610821565b6001600160a01b0316145b8061188657506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166118a182610d76565b6001600160a01b0316146119055760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161076f565b6001600160a01b0382166119675760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161076f565b611972600082611736565b6001600160a01b038316600090815260036020526040812080546001929061199b9084906128ba565b90915550506001600160a01b03821660009081526003602052604081208054600192906119c990849061279a565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6000611a3582610d76565b9050611a42600083611736565b6001600160a01b0381166000908152600360205260408120805460019290611a6b9084906128ba565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600d82604051611b279190612749565b9081526040519081900360200190206001015460ff600160801b9091041615611b785760405162461bcd60e51b815260206004820152600360248201526241414560e81b604482015260640161076f565b6000600d83604051611b8a9190612749565b90815260405190819003602001902080546001600160a01b039095166001600160a01b0319909516949094178455506001909201805470ffffffffffffffffffffffffffffffffff191660ff90931692909217600160801b1790915550565b610ca7828260405180602001604052806000815250611e03565b816001600160a01b0316836001600160a01b03161415611c655760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c657200000000000000604482015260640161076f565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611cdd84848461188e565b611ce984848484611e36565b6115245760405162461bcd60e51b815260040161076f906128d1565b606081611d295750506040805180820190915260018152600360fc1b602082015290565b8160005b8115611d535780611d3d81612923565b9150611d4c9050600a83612954565b9150611d2d565b60008167ffffffffffffffff811115611d6e57611d6e612374565b6040519080825280601f01601f191660200182016040528015611d98576020820181803683370190505b5090505b841561188657611dad6001836128ba565b9150611dba600a86612968565b611dc590603061279a565b60f81b818381518110611dda57611dda6126e2565b60200101906001600160f81b031916908160001a905350611dfc600a86612954565b9450611d9c565b611e0d8383611f34565b611e1a6000848484611e36565b610b425760405162461bcd60e51b815260040161076f906128d1565b60006001600160a01b0384163b15611f2957604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611e7a90339089908890889060040161297c565b6020604051808303816000875af1925050508015611eb5575060408051601f3d908101601f19168201909252611eb2918101906129b9565b60015b611f0f573d808015611ee3576040519150601f19603f3d011682016040523d82523d6000602084013e611ee8565b606091505b508051611f075760405162461bcd60e51b815260040161076f906128d1565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611886565b506001949350505050565b6001600160a01b038216611f8a5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f2061646472657373604482015260640161076f565b611f9381611719565b15611fe05760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000604482015260640161076f565b6001600160a01b038216600090815260036020526040812080546001929061200990849061279a565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b508054612073906126a7565b6000825580601f10612083575050565b601f016020900490600052602060002090810190610d3d9190612125565b8280546120ad906126a7565b90600052602060002090601f0160209004810192826120cf5760008555612115565b82601f106120e857805160ff1916838001178555612115565b82800160010185558215612115579182015b828111156121155782518255916020019190600101906120fa565b50612121929150612125565b5090565b5b808211156121215760008155600101612126565b6001600160e01b031981168114610d3d57600080fd5b60006020828403121561216257600080fd5b813561167a8161213a565b60006020828403121561217f57600080fd5b5035919050565b60005b838110156121a1578181015183820152602001612189565b838111156115245750506000910152565b600081518084526121ca816020860160208601612186565b601f01601f19169290920160200192915050565b60208152600061167a60208301846121b2565b60018060a01b038151168252602081015160208301526000604082015160a0604085015261222260a08501826121b2565b905060608301516060850152608083015160808501528091505092915050565b60208152600061167a60208301846121f1565b80356001600160a01b038116811461226c57600080fd5b919050565b6000806040838503121561228457600080fd5b61228d83612255565b946020939093013593505050565b6000806000606084860312156122b057600080fd5b6122b984612255565b92506122c760208501612255565b9150604084013590509250925092565b60018060a01b038616815284602082015260a0604082015260006122fe60a08301866121b2565b606083019490945250608001529392505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561236757603f198886030184526123558583516121f1565b94509285019290850190600101612339565b5092979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156123b3576123b3612374565b604052919050565b600067ffffffffffffffff8211156123d5576123d5612374565b50601f01601f191660200190565b60006123f66123f1846123bb565b61238a565b905082815283838301111561240a57600080fd5b828260208301376000602084830101529392505050565b600082601f83011261243257600080fd5b61167a838335602085016123e3565b60006020828403121561245357600080fd5b813567ffffffffffffffff81111561246a57600080fd5b61188684828501612421565b60006020828403121561248857600080fd5b61167a82612255565b60ff81168114610d3d57600080fd5b600080600080608085870312156124b657600080fd5b6124bf85612255565b9350602085013567ffffffffffffffff8111156124db57600080fd5b6124e787828801612421565b9350506124f660408601612255565b9150606085013561250681612491565b939692955090935050565b6000806040838503121561252457600080fd5b61252d83612255565b91506020830135801515811461254257600080fd5b809150509250929050565b6000806000806080858703121561256357600080fd5b61256c85612255565b935061257a60208601612255565b925060408501359150606085013567ffffffffffffffff81111561259d57600080fd5b8501601f810187136125ae57600080fd5b6125bd878235602084016123e3565b91505092959194509250565b600080604083850312156125dc57600080fd5b6125e583612255565b9150602083013567ffffffffffffffff81111561260157600080fd5b61260d85828601612421565b9150509250929050565b60608152600061262a60608301866121b2565b60ff9490941660208301525060400152919050565b6000806040838503121561265257600080fd5b61265b83612255565b915061266960208401612255565b90509250929050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600181811c908216806126bb57607f821691505b602082108114156126dc57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b6000825161275b818460208701612186565b9190910192915050565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561279557612795612765565b500290565b600082198211156127ad576127ad612765565b500190565b60006001600160801b038083168185168083038211156127d4576127d4612765565b01949350505050565b600060ff821660ff8114156127f4576127f4612765565b60010192915050565b60008060006060848603121561281257600080fd5b835167ffffffffffffffff81111561282957600080fd5b8401601f8101861361283a57600080fd5b80516128486123f1826123bb565b81815287602083850101111561285d57600080fd5b61286e826020830160208601612186565b809550505050602084015161288281612491565b80925050604084015190509250925092565b600083516128a6818460208801612186565b8351908301906127d4818360208801612186565b6000828210156128cc576128cc612765565b500390565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b600060001982141561293757612937612765565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826129635761296361293e565b500490565b6000826129775761297761293e565b500690565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906129af908301846121b2565b9695505050505050565b6000602082840312156129cb57600080fd5b815161167a8161213a56fea2646970667358221220a60383bba8461420e90f74ba6193286b953db20fe4ca577ac8519df89783895f64736f6c634300080b0033";

type GMKeysConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GMKeysConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GMKeys__factory extends ContractFactory {
  constructor(...args: GMKeysConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "GMKeys";
  }

  deploy(
    _baseTokenURI: string,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<GMKeys> {
    return super.deploy(
      _baseTokenURI,
      _price,
      overrides || {}
    ) as Promise<GMKeys>;
  }
  getDeployTransaction(
    _baseTokenURI: string,
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_baseTokenURI, _price, overrides || {});
  }
  attach(address: string): GMKeys {
    return super.attach(address) as GMKeys;
  }
  connect(signer: Signer): GMKeys__factory {
    return super.connect(signer) as GMKeys__factory;
  }
  static readonly contractName: "GMKeys";
  public readonly contractName: "GMKeys";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GMKeysInterface {
    return new utils.Interface(_abi) as GMKeysInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): GMKeys {
    return new Contract(address, _abi, signerOrProvider) as GMKeys;
  }
}
