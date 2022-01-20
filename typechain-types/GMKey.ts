/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace GMKey {
  export type NftStructStruct = {
    sender: string;
    receiver: string;
    amount: BigNumberish;
    code: string;
    name: string;
    text: string;
    image: string;
    timestamp: BigNumberish;
  };

  export type NftStructStructOutput = [
    string,
    string,
    BigNumber,
    string,
    string,
    string,
    string,
    BigNumber
  ] & {
    sender: string;
    receiver: string;
    amount: BigNumber;
    code: string;
    name: string;
    text: string;
    image: string;
    timestamp: BigNumber;
  };

  export type AddressStructStruct = {
    maxUnit: BigNumberish;
    currentUnit: BigNumberish;
    exists: boolean;
  };

  export type AddressStructStructOutput = [BigNumber, BigNumber, boolean] & {
    maxUnit: BigNumber;
    currentUnit: BigNumber;
    exists: boolean;
  };

  export type ProjectStructStruct = {
    maxUnit: BigNumberish;
    currentUnit: BigNumberish;
    amount: BigNumberish;
    name: string;
    exists: boolean;
  };

  export type ProjectStructStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    boolean
  ] & {
    maxUnit: BigNumber;
    currentUnit: BigNumber;
    amount: BigNumber;
    name: string;
    exists: boolean;
  };
}

export interface GMKeyInterface extends utils.Interface {
  contractName: "GMKey";
  functions: {
    "addProject(uint256,uint256,string,address)": FunctionFragment;
    "addToBlockChain(address,address,string,string,string)": FunctionFragment;
    "addressCount()": FunctionFragment;
    "addresses(address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "getAddressCount()": FunctionFragment;
    "getAllNft()": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "getBaseURI()": FunctionFragment;
    "getFilteredNft(uint256,uint256)": FunctionFragment;
    "getNftCount()": FunctionFragment;
    "getOneAddress(address)": FunctionFragment;
    "getOneNft(uint256)": FunctionFragment;
    "getOneProject(address)": FunctionFragment;
    "getProjectCount()": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "name()": FunctionFragment;
    "nfts(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "projectCount()": FunctionFragment;
    "projects(address)": FunctionFragment;
    "removeFromBlockChain(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addProject",
    values: [BigNumberish, BigNumberish, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "addToBlockChain",
    values: [string, string, string, string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "addressCount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "addresses", values: [string]): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "getAddressCount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getAllNft", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBaseURI",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFilteredNft",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getNftCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOneAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getOneNft",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getOneProject",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getProjectCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nfts", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "projectCount",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "projects", values: [string]): string;
  encodeFunctionData(
    functionFragment: "removeFromBlockChain",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(functionFragment: "addProject", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addToBlockChain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addressCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addresses", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getAddressCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getAllNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBaseURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getFilteredNft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getOneAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOneNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getOneProject",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProjectCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nfts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "projectCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "projects", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeFromBlockChain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  { owner: string; approved: string; tokenId: BigNumber }
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean],
  { owner: string; operator: string; approved: boolean }
>;

export type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  { from: string; to: string; tokenId: BigNumber }
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface GMKey extends BaseContract {
  contractName: "GMKey";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GMKeyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addProject(
      _maxUnit: BigNumberish,
      _amount: BigNumberish,
      _name: string,
      _code: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addToBlockChain(
      _receiver: string,
      _code: string,
      _name: string,
      _text: string,
      _image: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addressCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    addresses(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, boolean] & {
        maxUnit: BigNumber;
        currentUnit: BigNumber;
        exists: boolean;
      }
    >;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAddressCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getAllNft(
      overrides?: CallOverrides
    ): Promise<[GMKey.NftStructStructOutput[]]>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getBaseURI(overrides?: CallOverrides): Promise<[string]>;

    getFilteredNft(
      _page: BigNumberish,
      _resultsPerPage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[GMKey.NftStructStructOutput[], BigNumber]>;

    getNftCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOneAddress(
      _address: string,
      overrides?: CallOverrides
    ): Promise<[GMKey.AddressStructStructOutput]>;

    getOneNft(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[GMKey.NftStructStructOutput]>;

    getOneProject(
      _code: string,
      overrides?: CallOverrides
    ): Promise<[GMKey.ProjectStructStructOutput]>;

    getProjectCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    name(overrides?: CallOverrides): Promise<[string]>;

    nfts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, string, string, string, string, BigNumber] & {
        sender: string;
        receiver: string;
        amount: BigNumber;
        code: string;
        name: string;
        text: string;
        image: string;
        timestamp: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    projectCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    projects(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string, boolean] & {
        maxUnit: BigNumber;
        currentUnit: BigNumber;
        amount: BigNumber;
        name: string;
        exists: boolean;
      }
    >;

    removeFromBlockChain(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addProject(
    _maxUnit: BigNumberish,
    _amount: BigNumberish,
    _name: string,
    _code: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addToBlockChain(
    _receiver: string,
    _code: string,
    _name: string,
    _text: string,
    _image: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addressCount(overrides?: CallOverrides): Promise<BigNumber>;

  addresses(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, boolean] & {
      maxUnit: BigNumber;
      currentUnit: BigNumber;
      exists: boolean;
    }
  >;

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  burn(
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAddressCount(overrides?: CallOverrides): Promise<BigNumber>;

  getAllNft(overrides?: CallOverrides): Promise<GMKey.NftStructStructOutput[]>;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getBaseURI(overrides?: CallOverrides): Promise<string>;

  getFilteredNft(
    _page: BigNumberish,
    _resultsPerPage: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[GMKey.NftStructStructOutput[], BigNumber]>;

  getNftCount(overrides?: CallOverrides): Promise<BigNumber>;

  getOneAddress(
    _address: string,
    overrides?: CallOverrides
  ): Promise<GMKey.AddressStructStructOutput>;

  getOneNft(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<GMKey.NftStructStructOutput>;

  getOneProject(
    _code: string,
    overrides?: CallOverrides
  ): Promise<GMKey.ProjectStructStructOutput>;

  getProjectCount(overrides?: CallOverrides): Promise<BigNumber>;

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  name(overrides?: CallOverrides): Promise<string>;

  nfts(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, BigNumber, string, string, string, string, BigNumber] & {
      sender: string;
      receiver: string;
      amount: BigNumber;
      code: string;
      name: string;
      text: string;
      image: string;
      timestamp: BigNumber;
    }
  >;

  owner(overrides?: CallOverrides): Promise<string>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  projectCount(overrides?: CallOverrides): Promise<BigNumber>;

  projects(
    arg0: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string, boolean] & {
      maxUnit: BigNumber;
      currentUnit: BigNumber;
      amount: BigNumber;
      name: string;
      exists: boolean;
    }
  >;

  removeFromBlockChain(
    _tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addProject(
      _maxUnit: BigNumberish,
      _amount: BigNumberish,
      _name: string,
      _code: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    addToBlockChain(
      _receiver: string,
      _code: string,
      _name: string,
      _text: string,
      _image: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    addressCount(overrides?: CallOverrides): Promise<BigNumber>;

    addresses(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, boolean] & {
        maxUnit: BigNumber;
        currentUnit: BigNumber;
        exists: boolean;
      }
    >;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    getAddressCount(overrides?: CallOverrides): Promise<BigNumber>;

    getAllNft(
      overrides?: CallOverrides
    ): Promise<GMKey.NftStructStructOutput[]>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getBaseURI(overrides?: CallOverrides): Promise<string>;

    getFilteredNft(
      _page: BigNumberish,
      _resultsPerPage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[GMKey.NftStructStructOutput[], BigNumber]>;

    getNftCount(overrides?: CallOverrides): Promise<BigNumber>;

    getOneAddress(
      _address: string,
      overrides?: CallOverrides
    ): Promise<GMKey.AddressStructStructOutput>;

    getOneNft(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<GMKey.NftStructStructOutput>;

    getOneProject(
      _code: string,
      overrides?: CallOverrides
    ): Promise<GMKey.ProjectStructStructOutput>;

    getProjectCount(overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    name(overrides?: CallOverrides): Promise<string>;

    nfts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, BigNumber, string, string, string, string, BigNumber] & {
        sender: string;
        receiver: string;
        amount: BigNumber;
        code: string;
        name: string;
        text: string;
        image: string;
        timestamp: BigNumber;
      }
    >;

    owner(overrides?: CallOverrides): Promise<string>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    projectCount(overrides?: CallOverrides): Promise<BigNumber>;

    projects(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string, boolean] & {
        maxUnit: BigNumber;
        currentUnit: BigNumber;
        amount: BigNumber;
        name: string;
        exists: boolean;
      }
    >;

    removeFromBlockChain(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;
    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): ApprovalEventFilter;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;
    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): ApprovalForAllEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TransferEventFilter;
  };

  estimateGas: {
    addProject(
      _maxUnit: BigNumberish,
      _amount: BigNumberish,
      _name: string,
      _code: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addToBlockChain(
      _receiver: string,
      _code: string,
      _name: string,
      _text: string,
      _image: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addressCount(overrides?: CallOverrides): Promise<BigNumber>;

    addresses(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAddressCount(overrides?: CallOverrides): Promise<BigNumber>;

    getAllNft(overrides?: CallOverrides): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBaseURI(overrides?: CallOverrides): Promise<BigNumber>;

    getFilteredNft(
      _page: BigNumberish,
      _resultsPerPage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getNftCount(overrides?: CallOverrides): Promise<BigNumber>;

    getOneAddress(
      _address: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOneNft(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getOneProject(_code: string, overrides?: CallOverrides): Promise<BigNumber>;

    getProjectCount(overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    nfts(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    projectCount(overrides?: CallOverrides): Promise<BigNumber>;

    projects(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    removeFromBlockChain(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addProject(
      _maxUnit: BigNumberish,
      _amount: BigNumberish,
      _name: string,
      _code: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addToBlockChain(
      _receiver: string,
      _code: string,
      _name: string,
      _text: string,
      _image: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addressCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addresses(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAddressCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getAllNft(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBaseURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFilteredNft(
      _page: BigNumberish,
      _resultsPerPage: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNftCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOneAddress(
      _address: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOneNft(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOneProject(
      _code: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProjectCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    nfts(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    projectCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    projects(
      arg0: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeFromBlockChain(
      _tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
