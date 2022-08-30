# Simple solidity contract test (Settlers.build)

This repo contains a partially finished contract that just needs a couple more things to be complete

(btw, instructions for deploying the contract locally are below)

There are three parts to this test:

1. finishing the solidity contract by writing a few lines of code & deploy the contract to a localnet & unit test the contract
2. interacting with the contract (on localnet) from a frontend
3. interacting with the contract (on localnet) from a backend

You may choose between 2 and 3 depending on what you would find easier/more aligned with your skillset


1. Solidity (file: `src/Counter/Counter.sol`)

- [ ] add a method that allows you to set the value of the counter between 0 and 100
- [ ] add an event that emits whenever someone resets the counter
- [ ] add a few (simple) tests to `test/Counter.test.ts`

2. Frontend

- [ ] create a folder named `frontend` and initialize it with a react or next.js template project (whatever you prefer)
- [ ] add the ability to connect to the localnet with metamask
- [ ] create one contract read (read the counter by interacting with metamask from frontend code)
- [ ] create one contract write (increment or set the counter from the frontend by interacting with metamask from frontend code)

3. Backend 

- [ ] create a folder named `backend` and initialize it with a node.js express server
- [ ] using a private key, figure out how to create a wallet object on the backend and connect to localnet with it.
- [ ] create one contract read (read the counter by interacting with the contract from backend code)
- [ ] create one contract write (increment or set the counter from the frontend by interacting with the contract from backend code)

I recommend using ethers.js for the backend option

# Boilerplate for ethereum solidity smart contract development

## INSTALL

```bash
yarn
```

## DEPLOY ON LOCALNET

Add a .env with the following content
```
MNEMONIC="hello world" # usually you would set this to your actual wallet mnemonic or you would add a PRIVATE_KEY with your wallets private key. We do not need to do this since we wont be deploying anywhere besides localnet
```

### Run these commands in your terminal
```bash
source .env
```

```bash
yarn compile 

# run this in a separate terminal
npx hardhat node

# run this in the first terminal once localnet is up
yarn deploy
```

## TEST

```
yarn test
```
