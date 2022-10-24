import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction, DeployResult } from 'hardhat-deploy/dist/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const councilQuantity = 337;
  const guildQuantity = 1000;
  const openseaProxy =
    hre.network.name == 'mainnet' ? '' : '0x1E0049783F008A0085193E00003D00cd54003c71';
  const { deployer } = await getNamedAccounts();

  const nftDescriptor: DeployResult = await deploy('OathRingsDescriptor', {
    from: deployer,
    args: [],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });

  const nftContract: DeployResult = await deploy('OathRings', {
    from: deployer,
    args: [openseaProxy, nftDescriptor.address, councilQuantity, guildQuantity],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });

  await hre
    .run('verify:verify', {
      address: nftDescriptor.address,
      constructorArguments: [],
    })
    .catch(e => console.log(e.message));

  await hre
    .run('verify:verify', {
      address: nftContract.address,
      constructorArguments: [openseaProxy, nftDescriptor.address, councilQuantity, guildQuantity],
    })
    .catch(e => console.log(e.message));
};

export default func;
func.tags = ['OathRings'];
