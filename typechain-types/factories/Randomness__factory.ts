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
            internalType: "enum Randomness.STATUS",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "string",
            name: "epoch",
            type: "string",
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
    name: "getRegisteredUser",
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
        name: "_totalTickets",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_totalRegisteredUser",
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
        internalType: "string",
        name: "_identifier",
        type: "string",
      },
      {
        internalType: "string",
        name: "_epoch",
        type: "string",
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
        internalType: "string",
        name: "_identifier",
        type: "string",
      },
      {
        internalType: "string",
        name: "_epoch",
        type: "string",
      },
    ],
    name: "unlockTestNft",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c0604052620419106002556003805460ff199081166064179091556000600481905560058190556006819055600780549092169091556008553480156200004657600080fd5b50604051620016d1380380620016d1833981016040819052620000699162000108565b6001600160a01b0384811660a0528316608052620000873362000099565b600d91909155600e5550620001509050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146200010357600080fd5b919050565b600080600080608085870312156200011f57600080fd5b6200012a85620000eb565b93506200013a60208601620000eb565b6040860151606090960151949790965092505050565b60805160a0516115466200018b600039600081816108720152610e0301526000818161038d015281816107880152610dd401526115466000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063692f1d12116100ad5780638dcb3731116100715780638dcb37311461021957806394985ddd1461022c578063ced72f871461023f578063f2fde38b14610247578063fbff1b8a1461025a57600080fd5b8063692f1d12146101bb578063715018a6146101c3578063832747fd146101cb578063858afa93146101eb5780638da5cb5b146101fe57600080fd5b8063331bf125116100f4578063331bf1251461016f57806350c5f975146101775780635699d8b31461017f5780635c3e0da2146101945780635ff0c75b1461019c57600080fd5b80630211bd0e14610126578063037bee481461013d57806306e8337f1461015f5780631796fd9114610167575b600080fd5b6006545b6040519081526020015b60405180910390f35b61015061014b366004611102565b61026f565b60405161013493929190611193565b60045461012a565b60055461012a565b600d5461012a565b61012a610375565b61019261018d3660046111bb565b610405565b005b6101926104ac565b6101ab60075460ff1660011490565b6040519015158152602001610134565b61012a6104e2565b6101926104ed565b6101de6101d9366004611102565b610523565b6040516101349190611235565b6101926101f93660046112a8565b610667565b6001546040516001600160a01b039091168152602001610134565b6101926102273660046111bb565b6106d3565b61019261023a3660046112e3565b610867565b600e5461012a565b610192610255366004611305565b6108e9565b60035460405160ff9091168152602001610134565b6060600080600b846040516102849190611335565b9081526020016040518091039020600101600b856040516102a59190611335565b9081526040519081900360200181206002015460ff1690600b906102ca908890611335565b9081526020016040518091039020600301548280546102e890611351565b80601f016020809104026020016040519081016040528092919081815260200182805461031490611351565b80156103615780601f1061033657610100808354040283529160200191610361565b820191906000526020600020905b81548152906001019060200180831161034457829003601f168201915b505050505092509250925092509193909250565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156103dc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610400919061138c565b905090565b60075460ff166001146104455760405162461bcd60e51b81526020600482015260036024820152624d505360e81b60448201526064015b60405180910390fd5b600a826040516104559190611335565b9081526040519081900360200190206001015460ff161561049e5760405162461bcd60e51b81526020600482015260036024820152624b414560e81b604482015260640161043c565b6104a88282610984565b5050565b6001546001600160a01b031633146104d65760405162461bcd60e51b815260040161043c906113a5565b6007805460ff19169055565b6000610400600c5490565b6001546001600160a01b031633146105175760405162461bcd60e51b815260040161043c906113a5565b6105216000610b7b565b565b6105596040805160a08101909152806000815260200160608152602001600060ff16815260200160008152602001600081525090565b600b826040516105699190611335565b9081526040805191829003602001822060a083019091528054829060ff1660018111156105985761059861121f565b60018111156105a9576105a961121f565b81526020016001820180546105bd90611351565b80601f01602080910402602001604051908101604052809291908181526020018280546105e990611351565b80156106365780601f1061060b57610100808354040283529160200191610636565b820191906000526020600020905b81548152906001019060200180831161061957829003601f168201915b5050509183525050600282015460ff1660208201526003820154604082015260049091015460609091015292915050565b6001546001600160a01b031633146106915760405162461bcd60e51b815260040161043c906113a5565b60078054600160ff19918216179091556003805490911660ff85161790556004829055600581905560006006556002546106cb90426113da565b600855505050565b60075460ff1660011461070e5760405162461bcd60e51b81526020600482015260036024820152624d505360e81b604482015260640161043c565b600a8260405161071e9190611335565b9081526040519081900360200190206001015460ff16156107675760405162461bcd60e51b81526020600482015260036024820152624b414560e81b604482015260640161043c565b426008541061083957600e546040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa1580156107d7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107fb919061138c565b101561082f5760405162461bcd60e51b81526020600482015260036024820152624e454360e81b604482015260640161043c565b6104a88282610bcd565b60405162461bcd60e51b81526020600482015260036024820152624d504560e81b604482015260640161043c565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146108df5760405162461bcd60e51b815260206004820152601f60248201527f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c00604482015260640161043c565b6104a88282610c52565b6001546001600160a01b031633146109135760405162461bcd60e51b815260040161043c906113a5565b6001600160a01b0381166109785760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161043c565b61098181610b7b565b50565b6b30783535353334353532333160a01b60008190526009602090815283517f960c3fe88d950ed417a398d6746908458aa42f3d073723fd9675d36015b402ab916109f2917fd0d4d65beb710436deb771ca11a726c89654064677a955be0536984009aab76491870190610f4b565b506000600a85604051610a059190611335565b9081526020016040518091039020905083816000019080519060200190610a2d929190610f4b565b506001818101805460ff191690911790556000610a4b606484611400565b610a569060016113da565b90506000610a65600a85611400565b610a709060016113da565b600354909150600090610a889060ff16841115610d8c565b90506000610a968284610da4565b90508060ff16600654610aa991906113da565b6006556000878152600960205260408082209051600b91610ac991611422565b90815260405190819003602001902080549091508390829060ff191660018381811115610af857610af861121f565b0217905550600088815260096020526040908190209051600a91610b1b91611422565b908152602001604051809103902060000181600101908054610b3c90611351565b610b47929190610fcf565b5060028101805460ff191660ff841617905560038101879055426004820155600c8054600101905550505050505050505050565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000610bdd600d54600e54610dd0565b60008181526009602090815260409091208551929350610c01929091860190610f4b565b506000600a84604051610c149190611335565b9081526020016040518091039020905082816000019080519060200190610c3c929190610f4b565b506001908101805460ff19169091179055505050565b6000610c5f606483611400565b610c6a9060016113da565b90506000610c79600a84611400565b610c849060016113da565b600354909150600090610c9c9060ff16841115610d8c565b90506000610caa8284610da4565b90508060ff16600654610cbd91906113da565b6006556000868152600960205260408082209051600b91610cdd91611422565b90815260405190819003602001902080549091508390829060ff191660018381811115610d0c57610d0c61121f565b0217905550600087815260096020526040908190209051600a91610d2f91611422565b908152602001604051809103902060000181600101908054610d5090611351565b610d5b929190610fcf565b5060028101805460ff191660ff841617905560038101869055426004820155600c8054600101905550505050505050565b60008115610d9c57506001919050565b506000919050565b600080836001811115610db957610db961121f565b1415610dc757506000610dca565b50805b92915050565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316634000aea07f000000000000000000000000000000000000000000000000000000000000000084866000604051602001610e40929190918252602082015260400190565b6040516020818303038152906040526040518463ffffffff1660e01b8152600401610e6d939291906114be565b6020604051808303816000875af1158015610e8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eb091906114ee565b5060008381526020818152604080832054815180840188905280830185905230606082015260808082018390528351808303909101815260a090910190925281519183019190912086845292909152610f0a9060016113da565b60008581526020818152604091829020929092558051808301879052808201849052815180820383018152606090910190915280519101205b949350505050565b828054610f5790611351565b90600052602060002090601f016020900481019282610f795760008555610fbf565b82601f10610f9257805160ff1916838001178555610fbf565b82800160010185558215610fbf579182015b82811115610fbf578251825591602001919060010190610fa4565b50610fcb92915061104a565b5090565b828054610fdb90611351565b90600052602060002090601f016020900481019282610ffd5760008555610fbf565b82601f1061100e5780548555610fbf565b82800160010185558215610fbf57600052602060002091601f016020900482015b82811115610fbf57825482559160010191906001019061102f565b5b80821115610fcb576000815560010161104b565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261108657600080fd5b813567ffffffffffffffff808211156110a1576110a161105f565b604051601f8301601f19908116603f011681019082821181831017156110c9576110c961105f565b816040528381528660208588010111156110e257600080fd5b836020870160208301376000602085830101528094505050505092915050565b60006020828403121561111457600080fd5b813567ffffffffffffffff81111561112b57600080fd5b610f4384828501611075565b60005b8381101561115257818101518382015260200161113a565b83811115611161576000848401525b50505050565b6000815180845261117f816020860160208601611137565b601f01601f19169290920160200192915050565b6060815260006111a66060830186611167565b60ff9490941660208301525060400152919050565b600080604083850312156111ce57600080fd5b823567ffffffffffffffff808211156111e657600080fd5b6111f286838701611075565b9350602085013591508082111561120857600080fd5b5061121585828601611075565b9150509250929050565b634e487b7160e01b600052602160045260246000fd5b60208152600082516002811061125b57634e487b7160e01b600052602160045260246000fd5b80602084015250602083015160a0604084015261127b60c0840182611167565b905060ff604085015116606084015260608401516080840152608084015160a08401528091505092915050565b6000806000606084860312156112bd57600080fd5b833560ff811681146112ce57600080fd5b95602085013595506040909401359392505050565b600080604083850312156112f657600080fd5b50508035926020909101359150565b60006020828403121561131757600080fd5b81356001600160a01b038116811461132e57600080fd5b9392505050565b60008251611347818460208701611137565b9190910192915050565b600181811c9082168061136557607f821691505b6020821081141561138657634e487b7160e01b600052602260045260246000fd5b50919050565b60006020828403121561139e57600080fd5b5051919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b600082198211156113fb57634e487b7160e01b600052601160045260246000fd5b500190565b60008261141d57634e487b7160e01b600052601260045260246000fd5b500690565b600080835481600182811c91508083168061143e57607f831692505b602080841082141561145e57634e487b7160e01b86526022600452602486fd5b8180156114725760018114611483576114b0565b60ff198616895284890196506114b0565b60008a81526020902060005b868110156114a85781548b82015290850190830161148f565b505084890196505b509498975050505050505050565b60018060a01b03841681528260208201526060604082015260006114e56060830184611167565b95945050505050565b60006020828403121561150057600080fd5b8151801515811461132e57600080fdfea26469706673582212201eaf87dcad5aca215a01ef88dae245637f027616afd44e49ef7c54537c15aac064736f6c634300080b0033";

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
