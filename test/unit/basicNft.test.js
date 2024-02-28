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

      // mint
      describe("mint NFT", async () => {
        beforeEach(async () => {
          const txResponse = await BasicNft.mintNft();
          await txResponse.wait(1);
        });

        it("Allow users to mint an NFT, and updates appropriately", async () => {
          const tokenURI = await BasicNft.tokenURI(0);
          const tokenCounter = await BasicNft.getTokenCounter();

          assert.equal(tokenCounter.toString(), "1");
          assert.equal(tokenURI, await BasicNft.TOKEN_URI());
        });

        it("Show the correct balance and owner of the NFT", async () => {
          const deployerBalance = await BasicNft.balanceOf(deployer);
          const owner = await BasicNft.ownerOf(0);

          assert.equal(deployerBalance.toString(), "1");
          assert.equal(owner, deployer);
        });
      });
    });
