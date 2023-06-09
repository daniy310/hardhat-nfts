const { network } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../helper-hardhat-config.js");
const { verify } = require("../utils/verify");
const { storeImages } = require("../utils/uploadToPinata.js");

const imagesLocation = "./images";

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  let tokenUris;

  //get the ipfs hashes of our images
  if(process.env.UPLOAD_TO_PINATA == "true"){
    tokenUris = await handleTokenUris();
  }


  let vrfCoordinatorV2Address, subscriptionId;

  if (developmentChains.includes(network.name)) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );

    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
    const tx = await vrfCoordinatorV2Mock.createSubscription();
    const txReceipt = await tx.wait(1);

    subscriptionId = txReceipt.events[0].args.subId;
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2;
    subscriptionId = networkConfig[chaindId].subscriptionId;
  }

  log("---------------");
  await storeImages(imagesLocation);
  

  // const args = [
  //   vrfCoordinatorV2Address,
  //   subscriptionId,
  //   networkConfig[chainId].gasLane,
  //   networkConfig[chainId].callBackGasLimit,
  //    /*Dog URIS */,
  //   networkConfig[chainId].mintFee,
  // ];
};


async function handleTokenUris(){
  tokenUris = [];
  //store the image in ipfs

  //store the metadata in ipfs

  return tokenUris;
}

module.exports.tags = ["all", "randomipfs", "main"];