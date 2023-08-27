import { ethers } from "hardhat";

async function main() {
  const [Deployer] = await ethers.getSigners();
  console.log("Account Deployer:", Deployer.address);

  const Messages = await ethers.getContractFactory("sendMessage"); //Buscando bytecode e ABI
  const messages = await Messages.deploy(); //Criando a instancia do smart-contract

  console.log("SendMessages Address:", await messages.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
