# Simple solidity contract test (Settlers.build)

This repo contains a partially finished contract that just needs a couple more things to be complete

(btw, instructions for deploying the contract locally are below)

There are two parts to this test:

1. finishing the solidity contract by writing a few lines of code & test the contract
2. interacting with the contract from a frontend

3. Solidity (file: `src/Counter/Counter.sol`)

- [ ] add a method that allows you to set the value of the counter between 0 and 100
- [ ] add an event that emits whenever someone resets the counter
- [ ] add a few tests to `test/Counter.test.ts`

2. Frontend

- [ ] create a folder named `frontend` and initialize it with a react or next.js template project (whatever you prefer)
- [ ] add the ability to connect to the localnet with metamask
- [ ] create one contract read (read the counter via metamask)
- [ ] create one contract write (increment or set the counter from the frontend via metamask)

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

```bash
# yarn typechain
yarn compile 
yarn deploy
```

## TEST

There are 3 flavors of tests: hardhat, dapptools and forge

### hardhat

- One using hardhat that can leverage hardhat-deploy to reuse deployment procedures and named accounts:

```bash
yarn test
```

### [dapptools](https://dapp.tools)

```bash
dapp test
```

The latter requires additional step to set up your machine:

Install dapptools (Following instruction [here](https://github.com/dapphub/dapptools#installation)):

```bash
# user must be in sudoers
curl -L https://nixos.org/nix/install | sh

# Run this or login again to use Nix
. "$HOME/.nix-profile/etc/profile.d/nix.sh"

curl https://dapp.tools/install | sh
```

Then install solc with the correct version:

```bash
nix-env -f https://github.com/dapphub/dapptools/archive/master.tar.gz -iA solc-static-versions.solc_0_8_9
```

### forge

```bash
forge test
```

This require the installation of forge (see [foundry](https://github.com/gakonst/foundry))

## SCRIPTS

Here is the list of npm scripts you can execute:

Some of them relies on [./\_scripts.js](./_scripts.js) to allow parameterizing it via command line argument (have a look inside if you need modifications)
<br/><br/>

### `yarn prepare`

As a standard lifecycle npm script, it is executed automatically upon install. It generate config file and typechain to get you started with type safe contract interactions
<br/><br/>

### `yarn lint`, `yarn lint:fix`, `yarn format` and `yarn format:fix`

These will lint and format check your code. the `:fix` version will modifiy the files to match the requirement specified in `.eslintrc` and `.prettierrc.`
<br/><br/>

### `yarn compile`

These will compile your contracts
<br/><br/>

### `yarn void:deploy`

This will deploy your contracts on the in-memory hardhat network and exit, leaving no trace. quick way to ensure deployments work as intended without consequences
<br/><br/>

### `yarn test [mocha args...]`

These will execute your tests using mocha. you can pass extra arguments to mocha
<br/><br/>

### `yarn coverage`

These will produce a coverage report in the `coverage/` folder
<br/><br/>

### `yarn gas`

These will produce a gas report for function used in the tests
<br/><br/>

### `yarn dev`

These will run a local hardhat network on `localhost:8545` and deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

### `yarn local:dev`

This assumes a local node it running on `localhost:8545`. It will deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

### `yarn execute <network> <file.ts> [args...]`

This will execute the script `<file.ts>` against the specified network
<br/><br/>

### `yarn deploy <network> [args...]`

This will deploy the contract on the specified network.

Behind the scene it uses `hardhat deploy` command so you can append any argument for it
<br/><br/>

### `yarn export <network> <file.json>`

This will export the abi+address of deployed contract to `<file.json>`
<br/><br/>

### `yarn fork:execute <network> [--blockNumber <blockNumber>] [--deploy] <file.ts> [args...]`

This will execute the script `<file.ts>` against a temporary fork of the specified network

if `--deploy` is used, deploy scripts will be executed
<br/><br/>

### `yarn fork:deploy <network> [--blockNumber <blockNumber>] [args...]`

This will deploy the contract against a temporary fork of the specified network.

Behind the scene it uses `hardhat deploy` command so you can append any argument for it
<br/><br/>

### `yarn fork:test <network> [--blockNumber <blockNumber>] [mocha args...]`

This will test the contract against a temporary fork of the specified network.
<br/><br/>

### `yarn fork:dev <network> [--blockNumber <blockNumber>] [args...]`

This will deploy the contract against a fork of the specified network and it will keep running as a node.

Behind the scene it uses `hardhat node` command so you can append any argument for it
