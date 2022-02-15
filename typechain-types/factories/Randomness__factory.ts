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
    name: "getLinkBalance",
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
    name: "getWinningPercentage",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
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
      {
        internalType: "uint256",
        name: "_totalKey",
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
    name: "unlocTestkNft",
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
];

const _bytecode =
  "0x60c060405262041910600255600060038190556004805461ffff191661640017905560055534801561003057600080fd5b50604051610f9a380380610f9a83398101604081905261004f916100ea565b6001600160a01b0384811660a052831660805261006b3361007c565b600a91909155600b555061012d9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146100e557600080fd5b919050565b6000806000806080858703121561010057600080fd5b610109856100ce565b9350610117602086016100ce565b6040860151606090960151949790965092505050565b60805160a051610e33610167600039600081816104a20152610a7201526000818161023c015281816105a80152610a430152610e336000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80637ca31ade11610097578063c4e4798f11610066578063c4e4798f146101d9578063ced72f87146101ec578063f2fde38b146101f4578063fbff1b8a1461020757600080fd5b80637ca31ade146101905780638da5cb5b146101a357806394985ddd146101be578063b8046b1c146101d157600080fd5b8063651d7aa5116100d3578063651d7aa51461014d578063692f1d121461016d578063715018a614610175578063721fd7841461017d57600080fd5b8063331bf1251461010557806350c5f9751461011c5780635c3e0da2146101245780635ff0c75b1461012e575b600080fd5b600a545b6040519081526020015b60405180910390f35b610109610224565b61012c6102b4565b005b61013d60045460ff1660011490565b6040519015158152602001610113565b61016061015b366004610bb9565b6102f3565b6040516101139190610be8565b610109610386565b61012c610391565b61012c61018b366004610c38565b6103c7565b61012c61019e366004610bb9565b610421565b6001546040516001600160a01b039091168152602001610113565b61012c6101cc366004610c6a565b610497565b600354610109565b61012c6101e7366004610bb9565b61051d565b600b54610109565b61012c610202366004610c8c565b610678565b600454610100900460ff1660405160ff9091168152602001610113565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa15801561028b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102af9190610cbc565b905090565b6001546001600160a01b031633146102e75760405162461bcd60e51b81526004016102de90610cd5565b60405180910390fd5b6004805460ff19169055565b604080516080810182526000808252602082018190529181018290526060810191909152600082815260086020526040908190208151608081019092528054829060ff16600181111561034857610348610bd2565b600181111561035957610359610bd2565b81528154610100900460ff1660208201526001820154604082015260029091015460609091015292915050565b60006102af60095490565b6001546001600160a01b031633146103bb5760405162461bcd60e51b81526004016102de90610cd5565b6103c5600061070c565b565b6001546001600160a01b031633146103f15760405162461bcd60e51b81526004016102de90610cd5565b60048054600383905561ffff191661010060ff85160217600117905560025461041a9042610d0a565b6005555050565b60008181526006602052604090205460ff16156104665760405162461bcd60e51b81526020600482015260036024820152624b414560e81b60448201526064016102de565b60045460ff1660011461048b5760405162461bcd60e51b81526004016102de90610d30565b6104948161075e565b50565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461050f5760405162461bcd60e51b815260206004820152601f60248201527f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c0060448201526064016102de565b6105198282610883565b5050565b60008181526006602052604090205460ff16156105625760405162461bcd60e51b81526020600482015260036024820152624b414560e81b60448201526064016102de565b60045460ff166001146105875760405162461bcd60e51b81526004016102de90610d30565b426005541061065857600b546040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156105f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061061b9190610cbc565b101561064f5760405162461bcd60e51b81526020600482015260036024820152624e454360e81b60448201526064016102de565b6104948161096f565b6106606102b4565b60405162461bcd60e51b81526004016102de90610d30565b6001546001600160a01b031633146106a25760405162461bcd60e51b81526004016102de90610cd5565b6001600160a01b0381166107075760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016102de565b610494815b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600081815260076020526040812082905581907f960c3fe88d950ed417a398d6746908458aa42f3d073723fd9675d36015b402a09061079e606483610d4d565b6107a9906001610d0a565b905060006107b8600384610d4d565b6004549091506000906107d590610100900460ff16841115610994565b600086815260076020908152604080832080548452600683528184208054600160ff199182168117909255915485526008909352922080549394509284928492911690838181111561082957610829610bd2565b02179055506108498284600281111561084457610844610bd2565b6109ac565b815460ff919091166101000261ff00199091161781556001810185905542600282015561087a600980546001019055565b50505050505050565b6000610890606483610d4d565b61089b906001610d0a565b905060006108aa600384610d4d565b6004549091506000906108c790610100900460ff16841115610994565b600086815260076020908152604080832080548452600683528184208054600160ff199182168117909255915485526008909352922080549394509284928492911690838181111561091b5761091b610bd2565b02179055506109368284600281111561084457610844610bd2565b815460ff919091166101000261ff001990911617815560018101859055426002820155610967600980546001019055565b505050505050565b600061097f600a54600b54610a3f565b60009081526007602052604090209190915550565b600081156109a457506001919050565b506000919050565b6000808360018111156109c1576109c1610bd2565b14156109cf57506000610a39565b60008260028111156109e3576109e3610bd2565b14156109f157506001610a39565b6001826002811115610a0557610a05610bd2565b1415610a1357506003610a39565b6002826002811115610a2757610a27610bd2565b1415610a3557506005610a39565b5060005b92915050565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316634000aea07f000000000000000000000000000000000000000000000000000000000000000084866000604051602001610aaf929190918252602082015260400190565b6040516020818303038152906040526040518463ffffffff1660e01b8152600401610adc93929190610d6f565b6020604051808303816000875af1158015610afb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b1f9190610ddb565b5060008381526020818152604080832054815180840188905280830185905230606082015260808082018390528351808303909101815260a090910190925281519183019190912086845292909152610b79906001610d0a565b6000858152602081815260409182902092909255805180830187905280820184905281518082038301815260609091019091528051910120949350505050565b600060208284031215610bcb57600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b8151608082019060028110610c0d57634e487b7160e01b600052602160045260246000fd5b8083525060ff6020840151166020830152604083015160408301526060830151606083015292915050565b60008060408385031215610c4b57600080fd5b823560ff81168114610c5c57600080fd5b946020939093013593505050565b60008060408385031215610c7d57600080fd5b50508035926020909101359150565b600060208284031215610c9e57600080fd5b81356001600160a01b0381168114610cb557600080fd5b9392505050565b600060208284031215610cce57600080fd5b5051919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610d2b57634e487b7160e01b600052601160045260246000fd5b500190565b6020808252600390820152624d505360e81b604082015260600190565b600082610d6a57634e487b7160e01b600052601260045260246000fd5b500690565b60018060a01b038416815260006020848184015260606040840152835180606085015260005b81811015610db157858101830151858201608001528201610d95565b81811115610dc3576000608083870101525b50601f01601f19169290920160800195945050505050565b600060208284031215610ded57600080fd5b81518015158114610cb557600080fdfea264697066735822122017fa8c7d30af77ba7b017b417c098c504215de186ee2211b61f48ea271a60b3a64736f6c634300080b0033";

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
