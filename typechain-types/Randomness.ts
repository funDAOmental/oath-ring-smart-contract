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
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace Randomness {
  export type NftStructStruct = {
    status: BigNumberish;
    tickets: BigNumberish;
    randomNumber: BigNumberish;
    timestamp: BigNumberish;
  };

  export type NftStructStructOutput = [number, number, BigNumber, BigNumber] & {
    status: number;
    tickets: number;
    randomNumber: BigNumber;
    timestamp: BigNumber;
  };
}

export interface RandomnessInterface extends utils.Interface {
  contractName: "Randomness";
  functions: {
    "getFee()": FunctionFragment;
    "getKeyHash()": FunctionFragment;
    "getLinkBalance()": FunctionFragment;
    "getNftCount()": FunctionFragment;
    "getOneNft(bytes32)": FunctionFragment;
    "getTotalKeys()": FunctionFragment;
    "getWinningPercentage()": FunctionFragment;
    "isMintingStart()": FunctionFragment;
    "owner()": FunctionFragment;
    "rawFulfillRandomness(bytes32,uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "startMintPhase(uint8,uint256)": FunctionFragment;
    "stopMintPhase()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unlocTestkNft(bytes32)": FunctionFragment;
    "unlockNft(bytes32)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "getFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getKeyHash",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLinkBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNftCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getOneNft",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalKeys",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getWinningPercentage",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isMintingStart",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "rawFulfillRandomness",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "startMintPhase",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stopMintPhase",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unlocTestkNft",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "unlockNft",
    values: [BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getKeyHash", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getLinkBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOneNft", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getTotalKeys",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getWinningPercentage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isMintingStart",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "rawFulfillRandomness",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startMintPhase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stopMintPhase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlocTestkNft",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unlockNft", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface Randomness extends BaseContract {
  contractName: "Randomness";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RandomnessInterface;

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
    getFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getKeyHash(overrides?: CallOverrides): Promise<[string]>;

    getLinkBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

    getNftCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOneNft(
      _identifier: BytesLike,
      overrides?: CallOverrides
    ): Promise<[Randomness.NftStructStructOutput]>;

    getTotalKeys(overrides?: CallOverrides): Promise<[BigNumber]>;

    getWinningPercentage(overrides?: CallOverrides): Promise<[number]>;

    isMintingStart(overrides?: CallOverrides): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    startMintPhase(
      _chanceOfWinningPercentage: BigNumberish,
      _totalKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    stopMintPhase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unlocTestkNft(
      _identifier: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    unlockNft(
      _identifier: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  getFee(overrides?: CallOverrides): Promise<BigNumber>;

  getKeyHash(overrides?: CallOverrides): Promise<string>;

  getLinkBalance(overrides?: CallOverrides): Promise<BigNumber>;

  getNftCount(overrides?: CallOverrides): Promise<BigNumber>;

  getOneNft(
    _identifier: BytesLike,
    overrides?: CallOverrides
  ): Promise<Randomness.NftStructStructOutput>;

  getTotalKeys(overrides?: CallOverrides): Promise<BigNumber>;

  getWinningPercentage(overrides?: CallOverrides): Promise<number>;

  isMintingStart(overrides?: CallOverrides): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  rawFulfillRandomness(
    requestId: BytesLike,
    randomness: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  startMintPhase(
    _chanceOfWinningPercentage: BigNumberish,
    _totalKey: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  stopMintPhase(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unlocTestkNft(
    _identifier: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  unlockNft(
    _identifier: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getFee(overrides?: CallOverrides): Promise<BigNumber>;

    getKeyHash(overrides?: CallOverrides): Promise<string>;

    getLinkBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getNftCount(overrides?: CallOverrides): Promise<BigNumber>;

    getOneNft(
      _identifier: BytesLike,
      overrides?: CallOverrides
    ): Promise<Randomness.NftStructStructOutput>;

    getTotalKeys(overrides?: CallOverrides): Promise<BigNumber>;

    getWinningPercentage(overrides?: CallOverrides): Promise<number>;

    isMintingStart(overrides?: CallOverrides): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    startMintPhase(
      _chanceOfWinningPercentage: BigNumberish,
      _totalKey: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stopMintPhase(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unlocTestkNft(
      _identifier: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    unlockNft(_identifier: BytesLike, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    getFee(overrides?: CallOverrides): Promise<BigNumber>;

    getKeyHash(overrides?: CallOverrides): Promise<BigNumber>;

    getLinkBalance(overrides?: CallOverrides): Promise<BigNumber>;

    getNftCount(overrides?: CallOverrides): Promise<BigNumber>;

    getOneNft(
      _identifier: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalKeys(overrides?: CallOverrides): Promise<BigNumber>;

    getWinningPercentage(overrides?: CallOverrides): Promise<BigNumber>;

    isMintingStart(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    startMintPhase(
      _chanceOfWinningPercentage: BigNumberish,
      _totalKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    stopMintPhase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unlocTestkNft(
      _identifier: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    unlockNft(
      _identifier: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getKeyHash(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLinkBalance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNftCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getOneNft(
      _identifier: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalKeys(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getWinningPercentage(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMintingStart(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rawFulfillRandomness(
      requestId: BytesLike,
      randomness: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    startMintPhase(
      _chanceOfWinningPercentage: BigNumberish,
      _totalKey: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    stopMintPhase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unlocTestkNft(
      _identifier: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    unlockNft(
      _identifier: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
