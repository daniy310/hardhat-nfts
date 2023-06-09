const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config.js");

const BASE_FEE = ethers.utils.parseEther("0.25"); //0.25 LINK per request
const GAS_PRICE_LINK = 1e9; //calculated valuea based on gas price on the chain

module.exports = async function({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const{ deployer } = await getNamedAccounts();
    const args = [BASE_FEE, GAS_PRICE_LINK];

    if(developmentChains.includes(network.name)){
        log("Local network detected! Deploying mocks...");
        //deploy a mock vrfcoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks deployed !");
        log("-------------------------------------");
    }
}

module.exports.tags = ["all", "mocks"];