import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { Counter__factory, Counter} from "../typechain";

task("deploy:counter")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    // console.log({signers})
    const counterFactory: Counter__factory = <Counter__factory>await ethers.getContractFactory("Counter");
    const counter: Counter = <Counter>await counterFactory.connect(signers[0]).deploy();
    await counter.deployed();
    console.log("counter deployed to: ", counter.address);
  });
