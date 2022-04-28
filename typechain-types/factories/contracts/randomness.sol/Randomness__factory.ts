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
        internalType: "uint256",
        name: "_randomNumber",
        type: "uint256",
      },
    ],
    name: "GenerateRndomNumber",
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
    name: "startMinting",
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
    name: "stopMinting",
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
    name: "unlockTestNft",
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
  {
    inputs: [],
    name: "withdrawLinkBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60c060405260016004556007805460ff60a01b19169055600060088190556203ac1460095562056ec8600a55600b805460ff19169055610fab600c55600d553480156200004b57600080fd5b5060405162001a8638038062001a868339810160408190526200006e9162000143565b6001600160a01b0384811660a05283166080526200008c33620000d4565b600380546001600160a01b0319166001600160a01b038616179055600280546001600160a01b0319166001600160a01b038516179055601291909155601355506200018b9050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b80516001600160a01b03811681146200013e57600080fd5b919050565b600080600080608085870312156200015a57600080fd5b620001658562000126565b9350620001756020860162000126565b6040860151606090960151949790965092505050565b60805160a0516118c0620001c660003960008181610b65015261125d0152600081816107ca015281816109d7015261122e01526118c06000f3fe608060405234801561001057600080fd5b50600436106101a95760003560e01c80635ff0c75b116100f957806394985ddd11610097578063ced72f8711610071578063ced72f871461037a578063e76d516814610382578063f2fde38b1461038a578063fbff1b8a1461039d57600080fd5b806394985ddd1461034c5780639a65ea261461035f578063ca0f9b311461036757600080fd5b806370cc89ad116100d357806370cc89ad146102c6578063715018a6146102ce578063832747fd146102d65780638da5cb5b1461032757600080fd5b80635ff0c75b1461028b5780636445dc0d146102ab578063692f1d12146102be57600080fd5b80632b634555116101665780633e3e0b12116101405780633e3e0b121461026b5780634ee8270c1461027357806350c5f9751461027b5780635c3e0da21461028357600080fd5b80632b6345551461024757806330b5abdc1461025a578063331bf1251461026357600080fd5b80630211bd0e146101ae578063037bee48146101c957806306e8337f146101fc5780630c7e3b281461020457806317881cbf146102195780632294bf4d1461023f575b600080fd5b6101b66103bd565b6040519081526020015b60405180910390f35b6101dc6101d73660046114ea565b6103cd565b6040805160ff9485168152939092166020840152908201526060016101c0565b600c546101b6565b610217610212366004611535565b61044b565b005b60075461022d90600160a01b900460ff1681565b60405160ff90911681526020016101c0565b6008546101b6565b610217610255366004611561565b6104ca565b6101b660085481565b6012546101b6565b610217610622565b61021761065b565b6101b66107b2565b61021761083d565b600754600160a01b900460ff1660011460405190151581526020016101c0565b6102176102b9366004611561565b610871565b6101b6610a88565b6101b6610a93565b610217610aab565b6102e96102e43660046114ea565b610adf565b6040516101c09190600060808201905060ff835116825260ff6020840151166020830152604083015160408301526060830151606083015292915050565b6007546001600160a01b03165b6040516001600160a01b0390911681526020016101c0565b61021761035a3660046115a6565b610b5a565b610217610bdc565b6102176103753660046115c8565b610c20565b6013546101b6565b610334610c37565b6102176103983660046115e3565b610c4b565b6103a5610ce3565b6040516001600160801b0390911681526020016101c0565b60006103c860085490565b905090565b60008060006010846040516103e2919061163c565b9081526040519081900360200181205460ff169060109061040490879061163c565b9081526040519081900360200181205460ff610100909104169060109061042c90889061163c565b9081526020016040518091039020600101549250925092509193909250565b6007546001600160a01b0316331461047e5760405162461bcd60e51b815260040161047590611658565b60405180910390fd5b610486610bdc565b600b805460ff191660ff8316908117909155600c839055600714156104b957600a546104b290426116a3565b600d555050565b6009546104b290426116a3565b5050565b600754600160a01b900460ff1660011461050c5760405162461bcd60e51b81526020600482015260036024820152624d505360e81b6044820152606401610475565b600f8260405161051c919061163c565b9081526040519081900360200190205460ff61010090910416156105685760405162461bcd60e51b81526020600482015260036024820152624b414560e81b6044820152606401610475565b42600d5410156105a05760405162461bcd60e51b81526020600482015260036024820152624d504560e81b6044820152606401610475565b600854600c5410156105da5760405162461bcd60e51b81526020600482015260036024820152624d545560e81b6044820152606401610475565b600b5460ff808316911610156106185760405162461bcd60e51b815260206004820152600360248201526249414560e81b6044820152606401610475565b6104c68282610d43565b6007546001600160a01b0316331461064c5760405162461bcd60e51b815260040161047590611658565b6007805460ff60a01b19169055565b6007546001600160a01b031633146106855760405162461bcd60e51b815260040161047590611658565b60006106996002546001600160a01b031690565b6040516370a0823160e01b81523060048201529091506001600160a01b0382169063a9059cbb90339083906370a0823190602401602060405180830381865afa1580156106ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070e91906116bb565b6040516001600160e01b031960e085901b1681526001600160a01b03909216600483015260248201526044016020604051808303816000875af1158015610759573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061077d91906116d4565b6107af5760405162461bcd60e51b81526020600482015260036024820152622ba62360e91b6044820152606401610475565b50565b6040516370a0823160e01b81523060048201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610819573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c891906116bb565b6007546001600160a01b031633146108675760405162461bcd60e51b815260040161047590611658565b61086f610622565b565b600754600160a01b900460ff166001146108b35760405162461bcd60e51b81526020600482015260036024820152624d505360e81b6044820152606401610475565b600f826040516108c3919061163c565b9081526040519081900360200190205460ff610100909104161561090f5760405162461bcd60e51b81526020600482015260036024820152624b414560e81b6044820152606401610475565b42600d5410156109475760405162461bcd60e51b81526020600482015260036024820152624d504560e81b6044820152606401610475565b600854600c5410156109815760405162461bcd60e51b81526020600482015260036024820152624d545560e81b6044820152606401610475565b600b5460ff808316911610156109bf5760405162461bcd60e51b815260206004820152600360248201526249414560e81b6044820152606401610475565b6013546040516370a0823160e01b81523060048201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316906370a0823190602401602060405180830381865afa158015610a26573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a4a91906116bb565b1015610a7e5760405162461bcd60e51b81526020600482015260036024820152624e454360e81b6044820152606401610475565b6104c68282610f57565b60006103c860115490565b6000610a9e60085490565b600c546103c891906116f6565b6007546001600160a01b03163314610ad55760405162461bcd60e51b815260040161047590611658565b61086f6000610fc9565b6040805160808101825260008082526020820181905281830181905260608201529051601090610b1090849061163c565b908152604080519182900360209081018320608084018352805460ff8082168652610100909104169184019190915260018101549183019190915260020154606082015292915050565b336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610bd25760405162461bcd60e51b815260206004820152601f60248201527f4f6e6c7920565246436f6f7264696e61746f722063616e2066756c66696c6c006044820152606401610475565b6104c6828261101b565b6007546001600160a01b03163314610c065760405162461bcd60e51b815260040161047590611658565b6007805460ff60a01b1916600160a01b1790556000600855565b8060ff16600854610c3191906116a3565b60085550565b60006103c86002546001600160a01b031690565b6007546001600160a01b03163314610c755760405162461bcd60e51b815260040161047590611658565b6001600160a01b038116610cda5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610475565b6107af81610fc9565b60008042600d54610cf491906116f6565b90506000610d03603c83611723565b600854600c54610d1391906116f6565b610d1e906064611737565b610d289190611723565b600b5490915060ff1660071415610d3d575060655b92915050565b6b30783535353334353532333160a01b6000819052600e602090815283517f960c3fe88d950ed417a398d6746908458aa42f3d073723fd9675d36015b402ab91610db1917fbc95efa3e2a2d15bb6a7a6a0e065e930ba9f174eaa31675a860870c2ea992d04918701906113ae565b506000600f85604051610dc4919061163c565b908152604051908190036020019020805461ffff191660ff86161761010017815590506000610df4606484611756565b610dff9060016116a3565b9050600042600d54610e1191906116f6565b90506000610e20603c83611723565b600854600c54610e3091906116f6565b610e3b906064611737565b610e459190611723565b90508660ff1660071415610e57575060655b6000610e6382856111ee565b90508760ff166007148015610e79575060ff8116155b15610e82575060015b610e8b81610c20565b6000878152600e60205260408082209051601091610ea8916117a5565b90815260200160405180910390209050600f600e60008a8152602001908152602001600020604051610eda91906117a5565b90815260405190819003602001902054815460ff8481166101000261ffff1990921692169190911717815560018101879055426002820155610f20601180546001019055565b60405187907f1e7484035a22d9f9da409c2f7b03ff649cbf3cb7f4bc017fb3be75bce4140a0b90600090a250505050505050505050565b6000610f6760125460135461122a565b6000818152600e602090815260409091208551929350610f8b9290918601906113ae565b506000600f84604051610f9e919061163c565b908152604051908190036020019020805461ffff191660ff9094169390931761010017909255505050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000611028606483611756565b6110339060016116a3565b9050600042600d5461104591906116f6565b90506000611054603c83611723565b600854600c5461106491906116f6565b61106f906064611737565b6110799190611723565b9050600f600e600087815260200190815260200160002060405161109d91906117a5565b90815260405190819003602001902054600760ff90911614156110be575060655b60006110ca82856111ee565b9050600f600e60008881526020019081526020016000206040516110ee91906117a5565b90815260405190819003602001902054600760ff909116148015611113575060ff8116155b1561111c575060015b61112581610c20565b6000868152600e60205260408082209051601091611142916117a5565b90815260200160405180910390209050600f600e600089815260200190815260200160002060405161117491906117a5565b90815260405190819003602001902054815460ff8481166101000261ffff19909216921691909117178155600181018690554260028201556111ba601180546001019055565b60405186907f1e7484035a22d9f9da409c2f7b03ff649cbf3cb7f4bc017fb3be75bce4140a0b90600090a250505050505050565b6000806103e8611207846001600160801b038716611737565b6112119190611723565b9050600a8160ff1611156112235750600a5b9392505050565b60007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316634000aea07f00000000000000000000000000000000000000000000000000000000000000008486600060405160200161129a929190918252602082015260400190565b6040516020818303038152906040526040518463ffffffff1660e01b81526004016112c793929190611841565b6020604051808303816000875af11580156112e6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061130a91906116d4565b50600083815260066020818152604080842054815180840189905280830186905230606082015260808082018390528351808303909101815260a0909101909252815191830191909120938790529190526113669060016116a3565b6000858152600660205260409020556113a68482604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b949350505050565b8280546113ba9061176a565b90600052602060002090601f0160209004810192826113dc5760008555611422565b82601f106113f557805160ff1916838001178555611422565b82800160010185558215611422579182015b82811115611422578251825591602001919060010190611407565b5061142e929150611432565b5090565b5b8082111561142e5760008155600101611433565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261146e57600080fd5b813567ffffffffffffffff8082111561148957611489611447565b604051601f8301601f19908116603f011681019082821181831017156114b1576114b1611447565b816040528381528660208588010111156114ca57600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000602082840312156114fc57600080fd5b813567ffffffffffffffff81111561151357600080fd5b6113a68482850161145d565b803560ff8116811461153057600080fd5b919050565b6000806040838503121561154857600080fd5b823591506115586020840161151f565b90509250929050565b6000806040838503121561157457600080fd5b823567ffffffffffffffff81111561158b57600080fd5b6115978582860161145d565b9250506115586020840161151f565b600080604083850312156115b957600080fd5b50508035926020909101359150565b6000602082840312156115da57600080fd5b6112238261151f565b6000602082840312156115f557600080fd5b81356001600160a01b038116811461122357600080fd5b60005b8381101561162757818101518382015260200161160f565b83811115611636576000848401525b50505050565b6000825161164e81846020870161160c565b9190910192915050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600082198211156116b6576116b661168d565b500190565b6000602082840312156116cd57600080fd5b5051919050565b6000602082840312156116e657600080fd5b8151801515811461122357600080fd5b6000828210156117085761170861168d565b500390565b634e487b7160e01b600052601260045260246000fd5b6000826117325761173261170d565b500490565b60008160001904831182151516156117515761175161168d565b500290565b6000826117655761176561170d565b500690565b600181811c9082168061177e57607f821691505b6020821081141561179f57634e487b7160e01b600052602260045260246000fd5b50919050565b600080835481600182811c9150808316806117c157607f831692505b60208084108214156117e157634e487b7160e01b86526022600452602486fd5b8180156117f5576001811461180657611833565b60ff19861689528489019650611833565b60008a81526020902060005b8681101561182b5781548b820152908501908301611812565b505084890196505b509498975050505050505050565b60018060a01b0384168152826020820152606060408201526000825180606084015261187481608085016020870161160c565b601f01601f19169190910160800194935050505056fea2646970667358221220443e0a2f6f5410cf1112edde5ee56c88aebff82dcd0822b66ca032baf2726fc364736f6c634300080b0033";

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
