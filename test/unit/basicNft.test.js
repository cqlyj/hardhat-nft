const { ethers, deployments } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");
const { assert } = require("chai");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("BasicNft Unit Tests", async () => {
      let BasicNft, deployer;

      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["BasicNft"]);
        BasicNft = await ethers.getContract("BasicNft", deployer);
      });

      // constructor
      describe("constructor", async () => {
        it("initialize the NFT correctly", async () => {
          const name = await BasicNft.name();
          const symbol = await BasicNft.symbol();
          const tokenCounter = await BasicNft.getTokenCounter();

          assert.equal(name, "Dogie");
          assert.equal(symbol, "DOG");
          assert.equal(tokenCounter.toString(), "0");
        });
      });
    });
