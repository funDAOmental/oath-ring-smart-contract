/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  PreSale,
  PreSaleInterface,
} from "../../../contracts/presale.sol/PreSale";

const _abi = [
  {
    inputs: [
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
        name: "_address",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_randomNumber",
        type: "uint256",
      },
    ],
    name: "ActivateKeys",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
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
        name: "operator",
        type: "address",
      },
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
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
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
    ],
    name: "TransferKeys",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "accessPass",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "maxSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "image",
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
        name: "_address",
        type: "address",
      },
    ],
    name: "activatePreSale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_receivers",
        type: "address[]",
      },
      {
        internalType: "uint8",
        name: "_count",
        type: "uint8",
      },
    ],
    name: "batchTransferPreSale",
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
    name: "getAccessPass",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "maxSupply",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
        ],
        internalType: "struct PreSale.AccessPassStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveAccessPassCount",
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
        name: "_address",
        type: "address",
      },
    ],
    name: "getActiveAccessPassRandomNumber",
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
    name: "getBaseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getEthBalance",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
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
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_count",
        type: "uint8",
      },
    ],
    name: "transferPreSale",
    outputs: [],
    stateMutability: "payable",
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
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawEthBalance",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002b5038038062002b50833981016040819052620000349162000723565b6040518060600160405280602c815260200162002b00602c913962000059816200019a565b506200006533620001b3565b8060048190555062000092336001610151604051806020016040528060008152506200020560201b60201c565b60016000819052600560209081527f1471eb6eb2c5e789fc3de43f8ce62938c7d1836ec861730447e2ada8fd81017b91825560408051808201909152600a808252694163636573735061737360b01b9190920190815262000116917f1471eb6eb2c5e789fc3de43f8ce62938c7d1836ec861730447e2ada8fd81017c91906200067d565b506101516002820155600381018290556040805160608101909152602480825262002b2c60208301396200015660016200032560201b62000e681760201c565b6040516020016200016992919062000770565b604051602081830303815290604052816004019080519060200190620001919291906200067d565b50505062000a5d565b8051620001af9060029060208401906200067d565b5050565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6001600160a01b0384166200026b5760405162461bcd60e51b815260206004820152602160248201527f455243313135353a206d696e7420746f20746865207a65726f206164647265736044820152607360f81b60648201526084015b60405180910390fd5b3362000291816000876200027f8862000442565b6200028a8862000442565b5050505050565b6000848152602081815260408083206001600160a01b038916845290915281208054859290620002c3908490620007b9565b909155505060408051858152602081018590526001600160a01b0380881692600092918516917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46200028a8160008787878762000498565b6060816200034a5750506040805180820190915260018152600360fc1b602082015290565b8160005b81156200037a57806200036181620007d4565b9150620003729050600a8362000808565b91506200034e565b6000816001600160401b038111156200039757620003976200081f565b6040519080825280601f01601f191660200182016040528015620003c2576020820181803683370190505b5090505b84156200043a57620003da60018362000835565b9150620003e9600a866200084f565b620003f6906030620007b9565b60f81b8183815181106200040e576200040e62000866565b60200101906001600160f81b031916908160001a90535062000432600a8662000808565b9450620003c6565b949350505050565b604080516001808252818301909252606091600091906020808301908036833701905050905082816000815181106200047f576200047f62000866565b602090810291909101015292915050565b505050505050565b620004b7846001600160a01b03166200066e60201b62000f6e1760201c565b15620004905760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e6190620004f39089908990889088908890600401620008aa565b6020604051808303816000875af192505050801562000531575060408051601f3d908101601f191682019092526200052e91810190620008f1565b60015b620005f2576200054062000924565b806308c379a01415620005815750620005586200097c565b8062000565575062000583565b8060405162461bcd60e51b815260040162000262919062000a0b565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e204552433131353560448201527f526563656976657220696d706c656d656e746572000000000000000000000000606482015260840162000262565b6001600160e01b0319811663f23a6e6160e01b14620006655760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a656374656044820152676420746f6b656e7360c01b606482015260840162000262565b50505050505050565b6001600160a01b03163b151590565b8280546200068b9062000a20565b90600052602060002090601f016020900481019282620006af5760008555620006fa565b82601f10620006ca57805160ff1916838001178555620006fa565b82800160010185558215620006fa579182015b82811115620006fa578251825591602001919060010190620006dd565b50620007089291506200070c565b5090565b5b808211156200070857600081556001016200070d565b6000602082840312156200073657600080fd5b5051919050565b60005b838110156200075a57818101518382015260200162000740565b838111156200076a576000848401525b50505050565b60008351620007848184602088016200073d565b8351908301906200079a8183602088016200073d565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b60008219821115620007cf57620007cf620007a3565b500190565b6000600019821415620007eb57620007eb620007a3565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826200081a576200081a620007f2565b500490565b634e487b7160e01b600052604160045260246000fd5b6000828210156200084a576200084a620007a3565b500390565b600082620008615762000861620007f2565b500690565b634e487b7160e01b600052603260045260246000fd5b60008151808452620008968160208601602086016200073d565b601f01601f19169290920160200192915050565b6001600160a01b03868116825285166020820152604081018490526060810183905260a060808201819052600090620008e6908301846200087c565b979650505050505050565b6000602082840312156200090457600080fd5b81516001600160e01b0319811681146200091d57600080fd5b9392505050565b600060033d11156200093e5760046000803e5060005160e01c5b90565b601f8201601f191681016001600160401b03811182821017156200097557634e487b7160e01b600052604160045260246000fd5b6040525050565b600060443d10156200098b5790565b6040516003193d81016004833e81513d6001600160401b038083116024840183101715620009bb57505050505090565b8285019150815181811115620009d45750505050505090565b843d8701016020828501011115620009ef5750505050505090565b62000a006020828601018762000941565b509095945050505050565b6020815260006200091d60208301846200087c565b600181811c9082168062000a3557607f821691505b6020821081141562000a5757634e487b7160e01b600052602260045260246000fd5b50919050565b6120938062000a6d6000396000f3fe6080604052600436106101345760003560e01c80638b8bda3b116100ab578063d42082361161006f578063d420823614610370578063e8ddf15a14610383578063e985e9c51461038b578063f242432a146103d4578063f2fde38b146103f4578063f51aaa151461041457600080fd5b80638b8bda3b146102d35780638da5cb5b146102f357806398d5fdca1461031b578063a22cb46514610330578063b3b4b1451461035057600080fd5b80632eb2c2d6116100fd5780632eb2c2d6146102275780634e1273f4146102495780635e8c38f31461027657806370ed0ada14610296578063714c5398146102a9578063715018a6146102be57600080fd5b8062fdd58e1461013957806301ffc9a71461016c5780630e89341c1461019c5780630e8d9629146101c95780632ad81f4a146101fa575b600080fd5b34801561014557600080fd5b50610159610154366004611631565b610429565b6040519081526020015b60405180910390f35b34801561017857600080fd5b5061018c610187366004611671565b6104c0565b6040519015158152602001610163565b3480156101a857600080fd5b506101bc6101b7366004611695565b610512565b604051610163919061170a565b3480156101d557600080fd5b506101e96101e4366004611695565b61055d565b60405161016395949392919061171d565b34801561020657600080fd5b5061021a610215366004611695565b61069c565b6040516101639190611760565b34801561023357600080fd5b5061024761024236600461190c565b610835565b005b34801561025557600080fd5b50610269610264366004611a23565b6108cc565b6040516101639190611ac2565b34801561028257600080fd5b50610247610291366004611ae6565b6109f6565b3480156102a257600080fd5b5047610159565b3480156102b557600080fd5b506101bc610a78565b3480156102ca57600080fd5b50610247610a98565b3480156102df57600080fd5b506101596102ee366004611b44565b610ace565b3480156102ff57600080fd5b506003546040516001600160a01b039091168152602001610163565b34801561032757600080fd5b50600454610159565b34801561033c57600080fd5b5061024761034b366004611b5f565b610b3b565b34801561035c57600080fd5b5061024761036b366004611b44565b610b4a565b61024761037e366004611b9b565b610c39565b610247610cdd565b34801561039757600080fd5b5061018c6103a6366004611bd5565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b3480156103e057600080fd5b506102476103ef366004611c08565b610d36565b34801561040057600080fd5b5061024761040f366004611b44565b610dbd565b34801561042057600080fd5b50610159610e58565b60006001600160a01b03831661049a5760405162461bcd60e51b815260206004820152602b60248201527f455243313135353a2062616c616e636520717565727920666f7220746865207a60448201526a65726f206164647265737360a81b60648201526084015b60405180910390fd5b506000908152602081815260408083206001600160a01b03949094168352929052205490565b60006001600160e01b03198216636cdb3d1360e11b14806104f157506001600160e01b031982166303a24d0760e21b145b8061050c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606040518060600160405280602881526020016120366028913961053683610e68565b604051602001610547929190611c6d565b6040516020818303038152906040529050919050565b6005602052600090815260409020805460018201805491929161057f90611c9c565b80601f01602080910402602001604051908101604052809291908181526020018280546105ab90611c9c565b80156105f85780601f106105cd576101008083540402835291602001916105f8565b820191906000526020600020905b8154815290600101906020018083116105db57829003601f168201915b50505050509080600201549080600301549080600401805461061990611c9c565b80601f016020809104026020016040519081016040528092919081815260200182805461064590611c9c565b80156106925780601f1061066757610100808354040283529160200191610692565b820191906000526020600020905b81548152906001019060200180831161067557829003601f168201915b5050505050905085565b6106ce6040518060a0016040528060008152602001606081526020016000815260200160008152602001606081525090565b600560008381526020019081526020016000206040518060a00160405290816000820154815260200160018201805461070690611c9c565b80601f016020809104026020016040519081016040528092919081815260200182805461073290611c9c565b801561077f5780601f106107545761010080835404028352916020019161077f565b820191906000526020600020905b81548152906001019060200180831161076257829003601f168201915b5050505050815260200160028201548152602001600382015481526020016004820180546107ac90611c9c565b80601f01602080910402602001604051908101604052809291908181526020018280546107d890611c9c565b80156108255780601f106107fa57610100808354040283529160200191610825565b820191906000526020600020905b81548152906001019060200180831161080857829003601f168201915b5050505050815250509050919050565b6001600160a01b038516331480610851575061085185336103a6565b6108b85760405162461bcd60e51b815260206004820152603260248201527f455243313135353a207472616e736665722063616c6c6572206973206e6f74206044820152711bdddb995c881b9bdc88185c1c1c9bdd995960721b6064820152608401610491565b6108c58585858585610f7d565b5050505050565b606081518351146109315760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e677468604482015268040dad2e6dac2e8c6d60bb1b6064820152608401610491565b6000835167ffffffffffffffff81111561094d5761094d6117c0565b604051908082528060200260200182016040528015610976578160200160208202803683370190505b50905060005b84518110156109ee576109c185828151811061099a5761099a611cd7565b60200260200101518583815181106109b4576109b4611cd7565b6020026020010151610429565b8282815181106109d3576109d3611cd7565b60209081029190910101526109e781611d03565b905061097c565b509392505050565b6003546001600160a01b03163314610a205760405162461bcd60e51b815260040161049190611d1e565b815160005b818110156108c557610a6685858381518110610a4357610a43611cd7565b602002602001015160018660ff1660405180602001604052806000815250610d36565b80610a7081611d03565b915050610a25565b606060405180606001604052806028815260200161203660289139905090565b6003546001600160a01b03163314610ac25760405162461bcd60e51b815260040161049190611d1e565b610acc600061115a565b565b6001600160a01b03811660009081526007602052604081206001015460ff16610b1f5760405162461bcd60e51b815260206004820152600360248201526241444560e81b6044820152606401610491565b506001600160a01b031660009081526007602052604090205490565b610b463383836111ac565b5050565b6001610b57826001610429565b1015610b8b5760405162461bcd60e51b815260206004820152600360248201526244484160e81b6044820152606401610491565b6000610bb56040805142602080830191909152825180830382018152918301909252805191012090565b6001600160a01b03831660009081526007602052604090208181556001808201805460ff19169091179055909150610bf1600680546001019055565b826001600160a01b03167fb689541725e56f2444902aa7db6be66ab4fcd653d617faa83a3e4b3376594cb983604051610c2c91815260200190565b60405180910390a2505050565b8060ff16600454610c4a9190611d53565b341015610c7f5760405162461bcd60e51b81526020600482015260036024820152624e454360e81b6044820152606401610491565b610c9f838360018460ff1660405180602001604052806000815250610d36565b60405160ff821681526001600160a01b038316907f10c0903ec2066f2d17b6259882243b084e1ad4aaccd0be7f57df8b1b8b91eb0590602001610c2c565b6003546001600160a01b03163314610d075760405162461bcd60e51b815260040161049190611d1e565b6040514790339082156108fc029083906000818181858888f19350505050158015610b46573d6000803e3d6000fd5b6001600160a01b038516331480610d525750610d5285336103a6565b610db05760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260448201526808185c1c1c9bdd995960ba1b6064820152608401610491565b6108c5858585858561128d565b6003546001600160a01b03163314610de75760405162461bcd60e51b815260040161049190611d1e565b6001600160a01b038116610e4c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610491565b610e558161115a565b50565b6000610e6360065490565b905090565b606081610e8c5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610eb65780610ea081611d03565b9150610eaf9050600a83611d88565b9150610e90565b60008167ffffffffffffffff811115610ed157610ed16117c0565b6040519080825280601f01601f191660200182016040528015610efb576020820181803683370190505b5090505b8415610f6657610f10600183611d9c565b9150610f1d600a86611db3565b610f28906030611dc7565b60f81b818381518110610f3d57610f3d611cd7565b60200101906001600160f81b031916908160001a905350610f5f600a86611d88565b9450610eff565b949350505050565b6001600160a01b03163b151590565b8151835114610fdf5760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e677468206044820152670dad2e6dac2e8c6d60c31b6064820152608401610491565b6001600160a01b0384166110055760405162461bcd60e51b815260040161049190611ddf565b3360005b84518110156110ec57600085828151811061102657611026611cd7565b60200260200101519050600085838151811061104457611044611cd7565b602090810291909101810151600084815280835260408082206001600160a01b038e1683529093529190912054909150818110156110945760405162461bcd60e51b815260040161049190611e24565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b168252812080548492906110d1908490611dc7565b92505081905550505050806110e590611d03565b9050611009565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb878760405161113c929190611e6e565b60405180910390a46111528187878787876113b3565b505050505050565b600380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b816001600160a01b0316836001600160a01b031614156112205760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c20737461747573604482015268103337b91039b2b63360b91b6064820152608401610491565b6001600160a01b03838116600081815260016020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b0384166112b35760405162461bcd60e51b815260040161049190611ddf565b336112cc8187876112c38861150f565b6108c58861150f565b6000848152602081815260408083206001600160a01b038a1684529091529020548381101561130d5760405162461bcd60e51b815260040161049190611e24565b6000858152602081815260408083206001600160a01b038b811685529252808320878503905590881682528120805486929061134a908490611dc7565b909155505060408051868152602081018690526001600160a01b03808916928a821692918616917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a46113aa82888888888861155a565b50505050505050565b6001600160a01b0384163b156111525760405163bc197c8160e01b81526001600160a01b0385169063bc197c81906113f79089908990889088908890600401611e93565b6020604051808303816000875af1925050508015611432575060408051601f3d908101601f1916820190925261142f91810190611ee5565b60015b6114df5761143e611f02565b806308c379a014156114785750611453611f1e565b8061145e575061147a565b8060405162461bcd60e51b8152600401610491919061170a565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e20455243313135356044820152732932b1b2b4bb32b91034b6b83632b6b2b73a32b960611b6064820152608401610491565b6001600160e01b0319811663bc197c8160e01b146113aa5760405162461bcd60e51b815260040161049190611fa8565b6040805160018082528183019092526060916000919060208083019080368337019050509050828160008151811061154957611549611cd7565b602090810291909101015292915050565b6001600160a01b0384163b156111525760405163f23a6e6160e01b81526001600160a01b0385169063f23a6e619061159e9089908990889088908890600401611ff0565b6020604051808303816000875af19250505080156115d9575060408051601f3d908101601f191682019092526115d691810190611ee5565b60015b6115e55761143e611f02565b6001600160e01b0319811663f23a6e6160e01b146113aa5760405162461bcd60e51b815260040161049190611fa8565b80356001600160a01b038116811461162c57600080fd5b919050565b6000806040838503121561164457600080fd5b61164d83611615565b946020939093013593505050565b6001600160e01b031981168114610e5557600080fd5b60006020828403121561168357600080fd5b813561168e8161165b565b9392505050565b6000602082840312156116a757600080fd5b5035919050565b60005b838110156116c95781810151838201526020016116b1565b838111156116d8576000848401525b50505050565b600081518084526116f68160208601602086016116ae565b601f01601f19169290920160200192915050565b60208152600061168e60208301846116de565b85815260a06020820152600061173660a08301876116de565b856040840152846060840152828103608084015261175481856116de565b98975050505050505050565b60208152815160208201526000602083015160a0604084015261178660c08401826116de565b905060408401516060840152606084015160808401526080840151601f198483030160a08501526117b782826116de565b95945050505050565b634e487b7160e01b600052604160045260246000fd5b601f8201601f1916810167ffffffffffffffff811182821017156117fc576117fc6117c0565b6040525050565b600067ffffffffffffffff82111561181d5761181d6117c0565b5060051b60200190565b600082601f83011261183857600080fd5b8135602061184582611803565b60405161185282826117d6565b83815260059390931b850182019282810191508684111561187257600080fd5b8286015b8481101561188d5780358352918301918301611876565b509695505050505050565b600082601f8301126118a957600080fd5b813567ffffffffffffffff8111156118c3576118c36117c0565b6040516118da601f8301601f1916602001826117d6565b8181528460208386010111156118ef57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a0868803121561192457600080fd5b61192d86611615565b945061193b60208701611615565b9350604086013567ffffffffffffffff8082111561195857600080fd5b61196489838a01611827565b9450606088013591508082111561197a57600080fd5b61198689838a01611827565b9350608088013591508082111561199c57600080fd5b506119a988828901611898565b9150509295509295909350565b600082601f8301126119c757600080fd5b813560206119d482611803565b6040516119e182826117d6565b83815260059390931b8501820192828101915086841115611a0157600080fd5b8286015b8481101561188d57611a1681611615565b8352918301918301611a05565b60008060408385031215611a3657600080fd5b823567ffffffffffffffff80821115611a4e57600080fd5b611a5a868387016119b6565b93506020850135915080821115611a7057600080fd5b50611a7d85828601611827565b9150509250929050565b600081518084526020808501945080840160005b83811015611ab757815187529582019590820190600101611a9b565b509495945050505050565b60208152600061168e6020830184611a87565b803560ff8116811461162c57600080fd5b600080600060608486031215611afb57600080fd5b611b0484611615565b9250602084013567ffffffffffffffff811115611b2057600080fd5b611b2c868287016119b6565b925050611b3b60408501611ad5565b90509250925092565b600060208284031215611b5657600080fd5b61168e82611615565b60008060408385031215611b7257600080fd5b611b7b83611615565b915060208301358015158114611b9057600080fd5b809150509250929050565b600080600060608486031215611bb057600080fd5b611bb984611615565b9250611bc760208501611615565b9150611b3b60408501611ad5565b60008060408385031215611be857600080fd5b611bf183611615565b9150611bff60208401611615565b90509250929050565b600080600080600060a08688031215611c2057600080fd5b611c2986611615565b9450611c3760208701611615565b93506040860135925060608601359150608086013567ffffffffffffffff811115611c6157600080fd5b6119a988828901611898565b60008351611c7f8184602088016116ae565b835190830190611c938183602088016116ae565b01949350505050565b600181811c90821680611cb057607f821691505b60208210811415611cd157634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415611d1757611d17611ced565b5060010190565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b6000816000190483118215151615611d6d57611d6d611ced565b500290565b634e487b7160e01b600052601260045260246000fd5b600082611d9757611d97611d72565b500490565b600082821015611dae57611dae611ced565b500390565b600082611dc257611dc2611d72565b500690565b60008219821115611dda57611dda611ced565b500190565b60208082526025908201527f455243313135353a207472616e7366657220746f20746865207a65726f206164604082015264647265737360d81b606082015260800190565b6020808252602a908201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60408201526939103a3930b739b332b960b11b606082015260800190565b604081526000611e816040830185611a87565b82810360208401526117b78185611a87565b6001600160a01b0386811682528516602082015260a060408201819052600090611ebf90830186611a87565b8281036060840152611ed18186611a87565b9050828103608084015261175481856116de565b600060208284031215611ef757600080fd5b815161168e8161165b565b600060033d1115611f1b5760046000803e5060005160e01c5b90565b600060443d1015611f2c5790565b6040516003193d81016004833e81513d67ffffffffffffffff8160248401118184111715611f5c57505050505090565b8285019150815181811115611f745750505050505090565b843d8701016020828501011115611f8e5750505050505090565b611f9d602082860101876117d6565b509095945050505050565b60208082526028908201527f455243313135353a204552433131353552656365697665722072656a656374656040820152676420746f6b656e7360c01b606082015260800190565b6001600160a01b03868116825285166020820152604081018490526060810183905260a06080820181905260009061202a908301846116de565b97965050505050505056fe68747470733a2f2f7777772e6e667478742e78797a2f6170692f616363657373706173733f69643da2646970667358221220c68c94d341795ce7724f1dce335be5d2b200d1521549b9ba3579ee9e100c4d2f64736f6c634300080b003368747470733a2f2f7777772e6e667478742e78797a2f6170692f616363657373706173733f69643d7b69647d68747470733a2f2f7777772e6e667478742e78797a2f616363657373706173733f69643d";

type PreSaleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PreSaleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PreSale__factory extends ContractFactory {
  constructor(...args: PreSaleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<PreSale> {
    return super.deploy(_price, overrides || {}) as Promise<PreSale>;
  }
  override getDeployTransaction(
    _price: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_price, overrides || {});
  }
  override attach(address: string): PreSale {
    return super.attach(address) as PreSale;
  }
  override connect(signer: Signer): PreSale__factory {
    return super.connect(signer) as PreSale__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PreSaleInterface {
    return new utils.Interface(_abi) as PreSaleInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PreSale {
    return new Contract(address, _abi, signerOrProvider) as PreSale;
  }
}
