// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Counter {
    int256 private count = 0;

    function incrementCounter() public {
        count += 1;
    }

    function resetCounter() public {
        count = 0;

        // todo: emit an event here that tells us the counter has been reset
    }

    // todo: add a method that can change the value of the counter to anything between 0 and 100 (fail the transaction if the value is outside of these bounds)

    function getCount() public view returns (int256) {
        return count;
    }
}
