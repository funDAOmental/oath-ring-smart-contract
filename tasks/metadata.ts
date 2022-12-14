import { Deployment } from 'hardhat-deploy/dist/types';
import descriptorMetadata from './config/oathRingsDescriptor.json';
import oathRingsMetadata from './config/oathRings.json';
import { task } from 'hardhat/config';
import { Artifact } from 'hardhat/types';

task('metadata', 'Update contract metadata')
  .addOptionalParam('update', 'enable update')
  .setAction(async (taskArgs, hre) => {
    const { deployments, getNamedAccounts, ethers } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const update = taskArgs.update ? (taskArgs.update as boolean) : false;
    console.log(`Metadata update enabled: ${update}`);

    const latestDeployment: Deployment = (await deployments.getOrNull('OathRings')) as Deployment;
    if (!latestDeployment) {
      console.log('Could not find deployment');
    }
    const oathRings = new ethers.Contract(latestDeployment.address, latestDeployment.abi, signer);
    const descriptorAddress = await oathRings.oathRingsDescriptor();
    const descriptorArtifact: Artifact = await deployments.getArtifact('OathRingsDescriptor');
    const descriptor = new ethers.Contract(descriptorAddress, descriptorArtifact.abi, signer);

    const updateOathRings = [];
    for (const property in oathRingsMetadata) {
      let expected: string = oathRingsMetadata[property as keyof typeof oathRingsMetadata];
      let current: string = await oathRings[property]();
      if (current != expected) {
        console.log(
          `Property ${property} has value mismatch expected length: ${expected.length} vs current length ${current.length}`,
        );
        console.log(`Expected: ${expected}`);
        console.log(`Current : ${current}`);
        updateOathRings.push(property);
      }
    }
    if (updateOathRings.length > 0 && update) {
      for (const prop of updateOathRings) {
        const updateCommand = 'set' + prop.charAt(0).toUpperCase() + prop.slice(1) + 'Hash'; //TODO update for mainnet
        const newValue = oathRingsMetadata[prop as keyof typeof oathRingsMetadata];
        console.log(`Update oathRings ${updateCommand}`);
        const tx = await oathRings[updateCommand](newValue);
        console.log(await tx.wait());
      }
    }

    const updateDescriptor = [];
    for (const property in descriptorMetadata) {
      let expected: string = descriptorMetadata[property as keyof typeof descriptorMetadata];
      let current: string = await descriptor[property]();
      if (current != expected) {
        console.log(
          `Property ${property} has value mismatch expected length: ${expected.length} vs current length ${current.length}`,
        );
        console.log(`Expected: ${expected}`);
        console.log(`Current : ${current}`);
        updateDescriptor.push(property);
      }
    }
    if (updateDescriptor.length > 0 && update) {
      for (const prop of updateDescriptor) {
        const updateCommand = 'set' + prop.charAt(0).toUpperCase() + prop.slice(1);
        const newValue = descriptorMetadata[prop as keyof typeof descriptorMetadata];
        console.log(`Update oathRings descriptor ${updateCommand}`);
        const tx = await descriptor[updateCommand](newValue);
        console.log(await tx.wait());
      }
    }
  });
