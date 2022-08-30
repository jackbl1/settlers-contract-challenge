import {expect} from './chai-setup';
import {ethers} from 'hardhat';
import {Contract} from 'ethers';

describe('Counter.sol', function () {
  let hardhatCounter: Contract;

  before(async function () {
    const Counter = await ethers.getContractFactory('Counter');
    hardhatCounter = await Counter.deploy();
    await hardhatCounter.deployed();
  });

  it('should increment counter', async function () {
    await hardhatCounter.incrementCounter();
    const count = await hardhatCounter.getCount();
    expect(count).to.equal(1);
  });

  it('should reset counter and emit reset event', async function () {
    await expect(hardhatCounter.resetCounter()).to.emit(hardhatCounter, 'Reset').withArgs('Count was reset');
  });

  it('should set counter to value between 0-100', async function () {
    await hardhatCounter.setCounter(25);
    const count = await hardhatCounter.getCount();
    expect(count).to.equal(25);
  });

  it('should fail to set counter to value outside of 0-100', async function () {
    await expect(hardhatCounter.setCounter(125)).to.emit(hardhatCounter, 'Failure').withArgs('Count is out of bounds');

    const count = await hardhatCounter.getCount();
    expect(count).to.equal(25);
  });
});
