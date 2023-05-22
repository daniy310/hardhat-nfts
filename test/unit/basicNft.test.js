const { assert } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config.js");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("NFT Contract", function () {
      let deployer, uri;
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["basicnft"]);
        basicNft = await ethers.getContract("BasicNFT");
      });

      describe("constructor", function () {
        it("initializes the contract correctly", async function () {
          const counter = await basicNft.getTokenCounter();
          const name = await basicNft.name();
          const symbol = await basicNft.symbol();

          assert.equal(counter, 0);
          assert.equal(name, "Brunutsu");
          assert.equal(symbol, "BRN");
        });
      });

      describe("Mint", function () {
        beforeEach(async () => {
          const tx = await basicNft.mint();
          await tx.wait(1);
        });

        it("should increment the tokenCounter", async function () {
          const tokenCounter = await basicNft.getTokenCounter();
          assert.equal(tokenCounter.toString(), "1");
        });

        it("should return the appropiate URI", async function () {
          const constantURI = await basicNft.TOKEN_URI();
          const returedURI = await basicNft.tokenURI(0);
          assert.equal(constantURI, returedURI);
        });

        it("Shows the correct balance and owner of an nft", async function () {
          const deployerBal = await basicNft.balanceOf(deployer);
          assert.equal(deployerBal, 1);

          const owner = await basicNft.ownerOf("0");
          assert.equal(owner, deployer);
        });
      });
    });
