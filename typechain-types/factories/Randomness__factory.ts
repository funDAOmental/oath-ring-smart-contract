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
    name: "unlockNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405262041910600255600060038190556004805461ffff191661640017905560055534801561003057600080fd5b50604051610d53380380610d5383398101604081905261004f916100ea565b6001600160a01b0384811660a052831660805261006b3361007c565b600a91909155600b555061012d9050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146100e557600080fd5b919050565b6000806000806080858703121561010057600080fd5b610109856100ce565b9350610117602086016100ce565b6040860151606090960151949790965092505050565b60805160a051610bf361016060003960008181610370015261084f01526000818161048c01526108200152610bf36000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063c4e4798f11610066578063c4e4798f146101a8578063ced72f87146101bb578063f2fde38b146101c3578063fbff1b8a146101d657600080fd5b80638da5cb5b1461017257806394985ddd1461018d578063b8046b1c146101a057600080fd5b8063651d7aa5116100c8578063651d7aa51461012f578063692f1d121461014f578063715018a614610157578063721fd7841461015f57600080fd5b8063331bf125146100ef5780635c3e0da2146101065780635ff0c75b14610110575b600080fd5b600a545b6040519081526020015b60405180910390f35b61010e6101f3565b005b61011f60045460ff1660011490565b60405190151581526020016100fd565b61014261013d366004610996565b610232565b6040516100fd91906109c5565b6100f36102c5565b61010e6102d5565b61010e61016d366004610a15565b61030b565b6001546040516001600160a01b0390911681526020016100fd565b61010e61019b366004610a47565b610365565b6003546100f3565b61010e6101b6366004610996565b6103eb565b600b546100f3565b61010e6101d1366004610a69565b610575565b600454610100900460ff1660405160ff90911681526020016100fd565b6001546001600160a01b031633146102265760405162461bcd60e51b815260040161021d90610a99565b60405180910390fd5b6004805460ff19169055565b604080516080810182526000808252602082018190529181018290526060810191909152600082815260086020526040908190208151608081019092528054829060ff166001811115610287576102876109af565b6001811115610298576102986109af565b81528154610100900460ff1660208201526001820154604082015260029091015460609091015292915050565b60006102d060095490565b905090565b6001546001600160a01b031633146102ff5760405162461bcd60e51b815260040161021d90610a99565b6103096000610609565b565b6001546001600160a01b031633146103355760405162461bcd60e51b815260040161021d90610a99565b60048054600383905561ffff191661010060ff85160217600117905560025461035e9042610ace565b6005555050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146103dd5760405162461bcd60e51b815260206004820152601f60248201527f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00604482015260640161021d565b6103e7828261065b565b5050565b60008181526006602052604090205460ff16156104305760405162461bcd60e51b81526020600482015260036024820152624b414560e81b604482015260640161021d565b60045460ff1660011461046b5760405162461bcd60e51b81526020600482015260036024820152624d505360e81b604482015260640161021d565b426005541061053f57600b546040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156104db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ff9190610af4565b10156105335760405162461bcd60e51b81526020600482015260036024820152624e454360e81b604482015260640161021d565b61053c8161074c565b50565b6105476101f3565b60405162461bcd60e51b81526020600482015260036024820152624d505360e81b604482015260640161021d565b6001546001600160a01b0316331461059f5760405162461bcd60e51b815260040161021d90610a99565b6001600160a01b0381166106045760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161021d565b61053c815b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000610668606483610b0d565b610673906001610ace565b90506000610682600384610b0d565b60045490915060009061069f90610100900460ff16841115610771565b600086815260076020908152604080832080548452600683528184208054600160ff19918216811790925591548552600890935292208054939450928492849291169083818111156106f3576106f36109af565b02179055506107138284600281111561070e5761070e6109af565b610789565b815460ff919091166101000261ff001990911617815560018101859055426002820155610744600980546001019055565b505050505050565b600061075c600a54600b5461081c565b60009081526007602052604090209190915550565b6000811561078157506001919050565b506000919050565b60008083600181111561079e5761079e6109af565b14156107ac57506000610816565b60008260028111156107c0576107c06109af565b14156107ce57506001610816565b60018260028111156107e2576107e26109af565b14156107f057506003610816565b6002826002811115610804576108046109af565b141561081257506005610816565b5060005b92915050565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316634000aea07f00000000000000000000000000000000000000000000000000000000000000008486600060405160200161088c929190918252602082015260400190565b6040516020818303038152906040526040518463ffffffff1660e01b81526004016108b993929190610b2f565b6020604051808303816000875af11580156108d8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108fc9190610b9b565b5060008381526020818152604080832054815180840188905280830185905230606082015260808082018390528351808303909101815260a090910190925281519183019190912086845292909152610956906001610ace565b6000858152602081815260409182902092909255805180830187905280820184905281518082038301815260609091019091528051910120949350505050565b6000602082840312156109a857600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b81516080820190600281106109ea57634e487b7160e01b600052602160045260246000fd5b8083525060ff6020840151166020830152604083015160408301526060830151606083015292915050565b60008060408385031215610a2857600080fd5b823560ff81168114610a3957600080fd5b946020939093013593505050565b60008060408385031215610a5a57600080fd5b50508035926020909101359150565b600060208284031215610a7b57600080fd5b81356001600160a01b0381168114610a9257600080fd5b9392505050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60008219821115610aef57634e487b7160e01b600052601160045260246000fd5b500190565b600060208284031215610b0657600080fd5b5051919050565b600082610b2a57634e487b7160e01b600052601260045260246000fd5b500690565b60018060a01b038416815260006020848184015260606040840152835180606085015260005b81811015610b7157858101830151858201608001528201610b55565b81811115610b83576000608083870101525b50601f01601f19169290920160800195945050505050565b600060208284031215610bad57600080fd5b81518015158114610a9257600080fdfea26469706673582212207531039078f85c8c2bb2167fa5d9ba1b5ca99e0504b86215aa818e9d1fefa3ad64736f6c634300080b0033";

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
