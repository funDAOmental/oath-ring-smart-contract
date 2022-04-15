/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Randomness,
  RandomnessInterface,
} from "../../../contracts/randomness.sol/Randomness";

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
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "ChainlinkRequested",
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
    name: "getLinkToken",
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
    name: "getMintedTickets",
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
    name: "getOneNft",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "epoch",
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
    inputs: [
      {
        internalType: "string",
        name: "_identifier",
        type: "string",
      },
    ],
    name: "getOneTicket",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
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
    name: "getRemainingTickets",
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
    name: "getTotalTickets",
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
        internalType: "uint128",
        name: "",
        type: "uint128",
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
        internalType: "uint256",
        name: "_totalTickets",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_epoch",
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
        internalType: "string",
        name: "_identifier",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_epoch",
        type: "uint8",
      },
    ],
    name: "unlockNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawLinkBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405260016004556203ac1460085562056ec8600955600a805460ff19908116909155610fab600b556000600c819055600d8054909216909155600e5534801561004a57600080fd5b50604051620015453803806200154583398101604081905261006b9161013c565b6001600160a01b0384811660a0528316608052610087336100ce565b600380546001600160a01b0319166001600160a01b038616179055600280546001600160a01b0319166001600160a01b0385161790556013919091556014555061017f9050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b038116811461013757600080fd5b919050565b6000806000806080858703121561015257600080fd5b61015b85610120565b935061016960208601610120565b6040860151606090960151949790965092505050565b60805160a05161138b620001ba600039600081816108da0152610d07015260008181610543015281816107500152610cd8015261138b6000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c8063692f1d12116100ad57806394985ddd1161007157806394985ddd14610278578063ced72f871461028b578063e76d516814610293578063f2fde38b1461029b578063fbff1b8a146102ae57600080fd5b8063692f1d12146101ea57806370cc89ad146101f2578063715018a6146101fa578063832747fd146102025780638da5cb5b1461025357600080fd5b80634ee8270c116100f45780634ee8270c146101a057806350c5f975146101a85780635c3e0da2146101b05780635ff0c75b146101b85780636445dc0d146101d757600080fd5b80630211bd0e14610131578063037bee481461014857806306e8337f1461017b5780630c7e3b2814610183578063331bf12514610198575b600080fd5b600c545b6040519081526020015b60405180910390f35b61015b610156366004610fd0565b6102ce565b6040805160ff94851681529390921660208401529082015260600161013f565b600b54610135565b61019661019136600461101b565b61034c565b005b601354610135565b6101966103d4565b61013561052b565b6101966105bb565b6101c7600d5460ff1660011490565b604051901515815260200161013f565b6101966101e5366004611047565b6105f1565b610135610801565b61013561080c565b61019661081e565b610215610210366004610fd0565b610854565b60405161013f9190600060808201905060ff835116825260ff6020840151166020830152604083015160408301526060830151606083015292915050565b6007546001600160a01b03165b6040516001600160a01b03909116815260200161013f565b61019661028636600461108c565b6108cf565b601454610135565b610260610951565b6101966102a93660046110ae565b610965565b6102b66109fd565b6040516001600160801b03909116815260200161013f565b60008060006011846040516102e39190611107565b9081526040519081900360200181205460ff1690601190610305908790611107565b9081526040519081900360200181205460ff610100909104169060119061032d908890611107565b9081526020016040518091039020600101549250925092509193909250565b6007546001600160a01b0316331461037f5760405162461bcd60e51b815260040161037690611123565b60405180910390fd5b600d805460ff19908116600117909155600a805460ff8416921682179055600b8390556000600c55600714156103c3576009546103bc904261116e565b600e555050565b6008546103bc904261116e565b5050565b6007546001600160a01b031633146103fe5760405162461bcd60e51b815260040161037690611123565b60006104126002546001600160a01b031690565b6040516370a0823160e01b81523060048201529091506001600160a01b0382169063a9059cbb90339083906370a0823190602401602060405180830381865afa158015610463573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104879190611186565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af11580156104d2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104f6919061119f565b6105285760405162461bcd60e51b81526020600482015260036024820152622ba62360e91b6044820152606401610376565b50565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610592573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b69190611186565b905090565b6007546001600160a01b031633146105e55760405162461bcd60e51b815260040161037690611123565b600d805460ff19169055565b600d5460ff1660011461062c5760405162461bcd60e51b81526020600482015260036024820152624d505360e81b6044820152606401610376565b60108260405161063c9190611107565b9081526040519081900360200190205460ff61010090910416156106885760405162461bcd60e51b81526020600482015260036024820152624b414560e81b6044820152606401610376565b42600e5410156106c05760405162461bcd60e51b81526020600482015260036024820152624d504560e81b6044820152606401610376565b600c54600b5410156106fa5760405162461bcd60e51b81526020600482015260036024820152624d545560e81b6044820152606401610376565b600a5460ff808316911610156107385760405162461bcd60e51b815260206004820152600360248201526249414560e81b6044820152606401610376565b6014546040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa15801561079f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107c39190611186565b10156107f75760405162461bcd60e51b81526020600482015260036024820152624e454360e81b6044820152606401610376565b6103d08282610a5d565b60006105b660125490565b6000600c54600b546105b691906111c1565b6007546001600160a01b031633146108485760405162461bcd60e51b815260040161037690611123565b6108526000610acf565b565b6040805160808101825260008082526020820181905281830181905260608201529051601190610885908490611107565b908152604080519182900360209081018320608084018352805460ff8082168652610100909104169184019190915260018101549183019190915260020154606082015292915050565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109475760405162461bcd60e51b815260206004820152601f60248201527f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c006044820152606401610376565b6103d08282610b21565b60006105b66002546001600160a01b031690565b6007546001600160a01b0316331461098f5760405162461bcd60e51b815260040161037690611123565b6001600160a01b0381166109f45760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610376565b61052881610acf565b60008042600e54610a0e91906111c1565b90506000610a1d603c836111ee565b600c54600b54610a2d91906111c1565b610a38906064611202565b610a4291906111ee565b600a5490915060ff1660071415610a57575060655b92915050565b6000610a6d601354601454610cd4565b6000818152600f602090815260409091208551929350610a91929091860190610e94565b506000601084604051610aa49190611107565b908152604051908190036020019020805461ffff191660ff9094169390931761010017909255505050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000610b2e606483611221565b610b3990600161116e565b9050600042600e54610b4b91906111c1565b90506000610b5a603c836111ee565b600c54600b54610b6a91906111c1565b610b75906064611202565b610b7f91906111ee565b90506010600f6000878152602001908152602001600020604051610ba39190611270565b90815260405190819003602001902054600760ff9091161415610bc4575060655b6000610bd08285610e58565b90506010600f6000888152602001908152602001600020604051610bf49190611270565b90815260405190819003602001902054600760ff909116148015610c19575060ff8116155b15610c22575060015b8060ff16600c54610c33919061116e565b600c556000868152600f60205260408082209051601191610c5391611270565b908152602001604051809103902090506010600f6000898152602001908152602001600020604051610c859190611270565b90815260405190819003602001902054815460ff8481166101000261ffff1990921692169190911717815560018101869055426002820155610ccb601280546001019055565b50505050505050565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316634000aea07f000000000000000000000000000000000000000000000000000000000000000084866000604051602001610d44929190918252602082015260400190565b6040516020818303038152906040526040518463ffffffff1660e01b8152600401610d719392919061130c565b6020604051808303816000875af1158015610d90573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db4919061119f565b50600083815260066020818152604080842054815180840189905280830186905230606082015260808082018390528351808303909101815260a090910190925281519183019190912093879052919052610e1090600161116e565b600085815260066020526040902055610e508482604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b949350505050565b6000806103e8610e71846001600160801b038716611202565b610e7b91906111ee565b9050600a8160ff161115610e8d5750600a5b9392505050565b828054610ea090611235565b90600052602060002090601f016020900481019282610ec25760008555610f08565b82601f10610edb57805160ff1916838001178555610f08565b82800160010185558215610f08579182015b82811115610f08578251825591602001919060010190610eed565b50610f14929150610f18565b5090565b5b80821115610f145760008155600101610f19565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610f5457600080fd5b813567ffffffffffffffff80821115610f6f57610f6f610f2d565b604051601f8301601f19908116603f01168101908282118183101715610f9757610f97610f2d565b81604052838152866020858801011115610fb057600080fd5b836020870160208301376000602085830101528094505050505092915050565b600060208284031215610fe257600080fd5b813567ffffffffffffffff811115610ff957600080fd5b610e5084828501610f43565b803560ff8116811461101657600080fd5b919050565b6000806040838503121561102e57600080fd5b8235915061103e60208401611005565b90509250929050565b6000806040838503121561105a57600080fd5b823567ffffffffffffffff81111561107157600080fd5b61107d85828601610f43565b92505061103e60208401611005565b6000806040838503121561109f57600080fd5b50508035926020909101359150565b6000602082840312156110c057600080fd5b81356001600160a01b0381168114610e8d57600080fd5b60005b838110156110f25781810151838201526020016110da565b83811115611101576000848401525b50505050565b600082516111198184602087016110d7565b9190910192915050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601160045260246000fd5b6000821982111561118157611181611158565b500190565b60006020828403121561119857600080fd5b5051919050565b6000602082840312156111b157600080fd5b81518015158114610e8d57600080fd5b6000828210156111d3576111d3611158565b500390565b634e487b7160e01b600052601260045260246000fd5b6000826111fd576111fd6111d8565b500490565b600081600019048311821515161561121c5761121c611158565b500290565b600082611230576112306111d8565b500690565b600181811c9082168061124957607f821691505b6020821081141561126a57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c91508083168061128c57607f831692505b60208084108214156112ac57634e487b7160e01b86526022600452602486fd5b8180156112c057600181146112d1576112fe565b60ff198616895284890196506112fe565b60008a81526020902060005b868110156112f65781548b8201529085019083016112dd565b505084890196505b509498975050505050505050565b60018060a01b0384168152826020820152606060408201526000825180606084015261133f8160808501602087016110d7565b601f01601f19169190910160800194935050505056fea26469706673582212201f51b7ec6f46c2d0e5a6a8eb41332223999820edbd5a23ae4c2bb9614cae3cbf64736f6c634300080b0033";

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
  }

  override deploy(
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
  override getDeployTransaction(
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
  override attach(address: string): Randomness {
    return super.attach(address) as Randomness;
  }
  override connect(signer: Signer): Randomness__factory {
    return super.connect(signer) as Randomness__factory;
  }

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
