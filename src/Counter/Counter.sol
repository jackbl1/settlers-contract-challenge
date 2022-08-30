// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Counter {
    int256 private count = 0;
    event Reset(string msg);
    event Failure(string);

    function incrementCounter() public {
        count += 1;
    }

    function resetCounter() public {
        count = 0;
        emit Reset("Count was reset");
    }

    function setCounter(int256 newCount) public {
        if (newCount > 100 || newCount < 0) {
            emit Failure("Count is out of bounds");
        } else {
            count = newCount;
        }
    }

    function getCount() public view returns (int256) {
        return count;
    }
}
