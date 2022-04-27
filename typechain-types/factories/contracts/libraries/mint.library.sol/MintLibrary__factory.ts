/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MintLibrary,
  MintLibraryInterface,
} from "../../../../contracts/libraries/mint.library.sol/MintLibrary";

const _abi = [
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
    name: "mintPhase",
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
    name: "mintedKeys",
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
    inputs: [],
    name: "renounceOwnership",
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
    inputs: [],
    name: "totalKeys",
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
        internalType: "uint8",
        name: "_count",
        type: "uint8",
      },
    ],
    name: "updateMintedKeys",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000805460ff60a01b19168155600181905560025534801561002557600080fd5b5061002f33610034565b610084565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610452806100936000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80635ff0c75b116100715780635ff0c75b14610125578063715018a6146101455780638da5cb5b1461014d578063b8046b1c14610168578063ca0f9b3114610170578063f2fde38b1461018357600080fd5b806302a7e3a3146100b957806317881cbf146100ce5780632294bf4d146100f957806330b5abdc1461010b578063488bdabc146101145780635c3e0da21461011d575b600080fd5b6100cc6100c7366004610355565b610196565b005b6000546100e290600160a01b900460ff1681565b60405160ff90911681526020015b60405180910390f35b6001545b6040519081526020016100f0565b6100fd60015481565b6100fd60025481565b6100cc6101e4565b600054600160a01b900460ff1660011460405190151581526020016100f0565b6100cc61021d565b6000546040516001600160a01b0390911681526020016100f0565b6002546100fd565b6100cc61017e36600461036e565b610253565b6100cc610191366004610398565b61026a565b6000546001600160a01b031633146101c95760405162461bcd60e51b81526004016101c0906103c1565b60405180910390fd5b6000805460ff60a01b1916600160a01b178155600155600255565b6000546001600160a01b0316331461020e5760405162461bcd60e51b81526004016101c0906103c1565b6000805460ff60a01b19169055565b6000546001600160a01b031633146102475760405162461bcd60e51b81526004016101c0906103c1565b6102516000610305565b565b8060ff1660015461026491906103f6565b60015550565b6000546001600160a01b031633146102945760405162461bcd60e51b81526004016101c0906103c1565b6001600160a01b0381166102f95760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016101c0565b61030281610305565b50565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60006020828403121561036757600080fd5b5035919050565b60006020828403121561038057600080fd5b813560ff8116811461039157600080fd5b9392505050565b6000602082840312156103aa57600080fd5b81356001600160a01b038116811461039157600080fd5b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000821982111561041757634e487b7160e01b600052601160045260246000fd5b50019056fea264697066735822122069fee5051160c6f0c4510ee5bd29d2f9be5729560c2f2b4aa943948f3e24564f64736f6c634300080b0033";

type MintLibraryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MintLibraryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MintLibrary__factory extends ContractFactory {
  constructor(...args: MintLibraryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MintLibrary> {
    return super.deploy(overrides || {}) as Promise<MintLibrary>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): MintLibrary {
    return super.attach(address) as MintLibrary;
  }
  override connect(signer: Signer): MintLibrary__factory {
    return super.connect(signer) as MintLibrary__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MintLibraryInterface {
    return new utils.Interface(_abi) as MintLibraryInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MintLibrary {
    return new Contract(address, _abi, signerOrProvider) as MintLibrary;
  }
}
