/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BytesLike,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Randomness, RandomnessInterface } from "../Randomness";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_vrfCoordinator",
        type: "address",
      },
      {
        internalType: "address",
        name: "_linkToken",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "_keyHash",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "_fee",
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
    inputs: [],
    name: "getFee",
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
    name: "getKeyHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
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
        internalType: "bytes32",
        name: "_identifier",
        type: "bytes32",
      },
    ],
    name: "getOneNft",
    outputs: [
      {
        components: [
          {
            internalType: "enum Randomness.STATUS",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "tickets",
            type: "uint8",
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
        internalType: "struct Randomness.NftStruct",
        name: "",
        type: "tuple",
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
        internalType: "bytes32",
        name: "requestId",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "randomness",
        type: "uint256",
      },
    ],
    name: "rawFulfillRandomness",
    outputs: [],
    stateMutability: "nonpayable",
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
        internalType: "uint8",
        name: "_chanceOfWinningPercentage",
        type: "uint8",
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
    inputs: [
      {
        internalType: "bytes32",
        name: "_identifier",
        type: "bytes32",
      },
    ],
    name: "unlockNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalKey",
        type: "uint256",
      },
    ],
    name: "updateTotalKeys",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405262041910600255600060038190556004805461ffff1916606417905560055534801561002f57600080fd5b50604051610b99380380610b9983398101604081905261004e9161010c565b6001600160a01b0384811660a052831660805261006a33610095565b81600a8190555080600b8190555061008c60096100e760201b6105741760201c565b5050505061014f565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80546001019055565b80516001600160a01b038116811461010757600080fd5b919050565b6000806000806080858703121561012257600080fd5b61012b856100f0565b9350610139602086016100f0565b6040860151606090960151949790965092505050565b60805160a051610a28610171600039600061038f015260005050610a286000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c8063715018a61161008c578063b8046b1c11610066578063b8046b1c146101b3578063c4e4798f146101bb578063ced72f87146101ce578063f2fde38b146101d657600080fd5b8063715018a61461017d5780638da5cb5b1461018557806394985ddd146101a057600080fd5b80635c3e0da2116100c85780635c3e0da21461012e5780635ff0c75b14610136578063651d7aa514610155578063692f1d121461017557600080fd5b80631ca6b9ea146100ef578063243ffb6e14610104578063331bf12514610117575b600080fd5b6101026100fd366004610881565b6101e9565b005b61010261011236600461089a565b610221565b600a545b6040519081526020015b60405180910390f35b610102610274565b600454600161010090910460ff16146040519015158152602001610125565b610168610163366004610881565b6102ab565b60405161012591906108da565b61011b61033e565b61010261034e565b6001546040516001600160a01b039091168152602001610125565b6101026101ae36600461092a565b610384565b60035461011b565b6101026101c9366004610881565b61040a565b600b5461011b565b6101026101e436600461094c565b6104dc565b6001546001600160a01b0316331461021c5760405162461bcd60e51b815260040161021390610975565b60405180910390fd5b600355565b6001546001600160a01b0316331461024b5760405162461bcd60e51b815260040161021390610975565b6004805460ff831661ffff199091161761010017905560025461026e90426109aa565b60055550565b6001546001600160a01b0316331461029e5760405162461bcd60e51b815260040161021390610975565b6004805461ff0019169055565b604080516080810182526000808252602082018190529181018290526060810191909152600082815260086020526040908190208151608081019092528054829060ff166001811115610300576103006108c4565b6001811115610311576103116108c4565b81528154610100900460ff1660208201526001820154604082015260029091015460609091015292915050565b600061034960095490565b905090565b6001546001600160a01b031633146103785760405162461bcd60e51b815260040161021390610975565b610382600061057d565b565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103fc5760405162461bcd60e51b815260206004820152601f60248201527f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c006044820152606401610213565b61040682826105cf565b5050565b60008181526006602052604090205460ff161561044f5760405162461bcd60e51b81526020600482015260036024820152624b414560e81b6044820152606401610213565b60045460ff610100909104166001146104905760405162461bcd60e51b81526020600482015260036024820152624d505360e81b6044820152606401610213565b4260055411156104a6576104a3816106bb565b50565b6104ae610274565b60405162461bcd60e51b81526020600482015260036024820152624d505360e81b6044820152606401610213565b6001546001600160a01b031633146105065760405162461bcd60e51b815260040161021390610975565b6001600160a01b03811661056b5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610213565b6104a38161057d565b80546001019055565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60006105dc6064836109d0565b6105e79060016109aa565b905060006105f66003846109d0565b60045490915060009061060e9060ff168411156107d6565b600086815260076020908152604080832080548452600683528184208054600160ff1991821681179092559154855260089093529220805493945092849284929116908381811115610662576106626108c4565b02179055506106828284600281111561067d5761067d6108c4565b6107ee565b815460ff919091166101000261ff0019909116178155600181018590554260028201556106b3600980546001019055565b505050505050565b600081815260076020526040812082905581907f960c3fe88d950ed417a398d6746908458aa42f3d073723fd9675d36015b402a0906106fb6064836109d0565b6107069060016109aa565b905060006107156003846109d0565b60045490915060009061072d9060ff168411156107d6565b600086815260076020908152604080832080548452600683528184208054600160ff1991821681179092559154855260089093529220805493945092849284929116908381811115610781576107816108c4565b021790555061079c8284600281111561067d5761067d6108c4565b815460ff919091166101000261ff0019909116178155600181018590554260028201556107cd600980546001019055565b50505050505050565b600081156107e657506001919050565b506000919050565b600080836001811115610803576108036108c4565b14156108115750600061087b565b6000826002811115610825576108256108c4565b14156108335750600161087b565b6001826002811115610847576108476108c4565b14156108555750600361087b565b6002826002811115610869576108696108c4565b14156108775750600561087b565b5060005b92915050565b60006020828403121561089357600080fd5b5035919050565b6000602082840312156108ac57600080fd5b813560ff811681146108bd57600080fd5b9392505050565b634e487b7160e01b600052602160045260246000fd5b81516080820190600281106108ff57634e487b7160e01b600052602160045260246000fd5b8083525060ff6020840151166020830152604083015160408301526060830151606083015292915050565b6000806040838503121561093d57600080fd5b50508035926020909101359150565b60006020828403121561095e57600080fd5b81356001600160a01b03811681146108bd57600080fd5b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156109cb57634e487b7160e01b600052601160045260246000fd5b500190565b6000826109ed57634e487b7160e01b600052601260045260246000fd5b50069056fea26469706673582212206c25f92b6914d7f2dd8db5e0ba64dc538cc56facc364d10b973eda61d71e02cf64736f6c634300080b0033";

type RandomnessConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RandomnessConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Randomness__factory extends ContractFactory {
  constructor(...args: RandomnessConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Randomness";
  }

  deploy(
    _vrfCoordinator: string,
    _linkToken: string,
    _keyHash: BytesLike,
    _fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Randomness> {
    return super.deploy(
      _vrfCoordinator,
      _linkToken,
      _keyHash,
      _fee,
      overrides || {}
    ) as Promise<Randomness>;
  }
  getDeployTransaction(
    _vrfCoordinator: string,
    _linkToken: string,
    _keyHash: BytesLike,
    _fee: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _vrfCoordinator,
      _linkToken,
      _keyHash,
      _fee,
      overrides || {}
    );
  }
  attach(address: string): Randomness {
    return super.attach(address) as Randomness;
  }
  connect(signer: Signer): Randomness__factory {
    return super.connect(signer) as Randomness__factory;
  }
  static readonly contractName: "Randomness";
  public readonly contractName: "Randomness";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RandomnessInterface {
    return new utils.Interface(_abi) as RandomnessInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Randomness {
    return new Contract(address, _abi, signerOrProvider) as Randomness;
  }
}
