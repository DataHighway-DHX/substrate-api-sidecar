
<br /><br />

<div align="center">
  <h1 align="center">@substrate/api-sidecar</h1>
  <h4 align="center"> REST service that makes it easy to interact with blockchain nodes built using Substrate's FRAME framework.</h4>

  <p align="center">
    <a href="https://www.npmjs.com/package/@substrate/api-sidecar">
      <img alt="npm" src="https://img.shields.io/npm/v/@substrate/api-sidecar" />
    </a>
    <a href="https://github.com/paritytech/substrate-api-sidecar/actions">
      <img alt="Github Actions" src="https://github.com/paritytech/substrate-api-sidecar/workflows/pr/badge.svg" />
    </a>
    <a href="https://github.com/paritytech/substrate-api-sidecar/blob/master/LICENSE">
      <img alt="GPL-3.0-or-later" src="https://img.shields.io/npm/l/@substrate/api-sidecar" />
    </a>
  </p>
</div>

<br /><br />

## Note

v1.0.0 was released on 2020-10-23. This major release introduced several renamed endpoints as breaking changes. It is important that users complete the transition to the new endpoints ASAP so they are ready for any subsequent emergency updates. Please visit the [MIGRATION_GUIDE](/MIGRATION_GUIDE.md) to
learn more.

## Prerequisites

This service requires Node version 12 or higher.

## Table of contents

- [Note](#note)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [NPM package installation and usage](#npm-package-installation-and-usage)
  - [Global installation](#global-installation)
  - [Local installation](#local-installation)
  - [Finishing up](#finishing-up)
- [Source code installation and usage](#source-code-installation-and-usage)
  - [Quick install](#quick-install)
  - [Rust development installation](#rust-development-installation)
  - [Quickstart](#quickstart)
    - [Swagger Docs](#swagger-docs)
  - [Running](#running)
- [Configuration](#configuration)
  - [Express server](#express-server)
  - [Substrate node](#substrate-node)
    - [Custom substrate types](#custom-substrate-types)
      - [Connecting a modified node template](#connecting-a-modified-node-template)
  - [Logging](#logging)
    - [Log levels](#log-levels)
    - [RPC logging](#rpc-logging)
- [Debugging fee and payout calculations](#debugging-fee-and-payout-calculations)
- [Available endpoints](#available-endpoints)
- [Chain integration guide](#chain-integration-guide)
- [Docker](#docker)
  - [Pull the latest release](#pull-the-latest-release)
  - [Or build from source](#or-build-from-source)
  - [Run](#run)
- [Contribute](#contribute)
- [Note for maintainers](#note-for-maintainers)

## NPM package installation and usage

### Global installation

Install the service globally:

```bash
npm install -g @substrate/api-sidecar
# OR
yarn global add @substrate/api-sidecar
```

Run the service from any directory on your machine:

```bash
substrate-api-sidecar
```

### Local installation

Install the service locally:

```bash
npm install @substrate/api-sidecar
# OR
yarn add @substrate/api-sidecar
```

Run the service from within the local directory:

```bash
node_modules/.bin/substrate-api-sidecar
```

### Finishing up

[Jump to the configuration section](#configuration) for more details on connecting to a node.

[Click here for full endpoint docs.](https://paritytech.github.io/substrate-api-sidecar/dist/)

## Source code installation and usage

### Quick install

Simply run `yarn`.

### Rust development installation

If you are looking to hack on the `calc` Rust crate make sure your machine has an [up-to-date version of `rustup`](https://www.rust-lang.org/tools/install)
installed to manage Rust dependencies.

Install `wasm-pack` if your machine does not already have it:

```bash
cargo install wasm-pack
```

Use yarn to do the remaining setup:

```bash
yarn
```

### Quickstart

Run a local DataHighway node in separate tab

Ensure that in src/chains-config.index.ts the spec_name from the DataHighway repository's node runtime matches the name included in this file (e.g. `'datahighway': harbourTestnetControllers,`, where `'datahighway'` is the spec_name), otherwise it'll use the defaultController instead

---

#### Swagger Docs

```
cd docs/
yarn
yarn serve
```

Open in browser http://localhost:9000

---

Change the endpoint if necessary (e.g. `SAS_SUBSTRATE_WS_URL=ws://127.0.0.1:9944` or `SAS_SUBSTRATE_WS_URL=wss://spreehafen.datahighway.com` (standalone testnet) in .env.local)
```
export SAS_SUBSTRATE_WS_URL=wss://spreehafen.datahighway.com
export SAS_SUBSTRATE_TYPES=/Users/ls2/code/DataHighway-DHX/node/custom_types.json
export SAS_LOG_LEVEL=silly
export SAS_LOG_STRIP_ANSI=true
CALC_DEBUG=1 sh calc/build.sh
yarn build
yarn start:log-rpc
brew install jq
```
or `yarn dev`

Lint the changes:
```
yarn run lint
```

Create queries using the endpoints that are added to the Swagger docs (mentioned above):

To test block and account endpoints:

```
curl -s http://0.0.0.0:8080/blocks/head | jq
curl -s http://0.0.0.0:8080/blocks/1 | jq 
# Alice
curl -s http://0.0.0.0:8080/accounts/5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY/balance-info\ | jq
# DHX DAO
curl -s http://0.0.0.0:8080/accounts/5EWKojw2i3uoqfWx1dEgVjBsvK5xuTr5G3NjXYh47H6ycBWr/balance-info\ | jq
```

To test transaction endpoints:

Note: Use polkadot.js apps to make a transaction but unselect sign & send so it gives the unsigned extrinsic to add below:

```
curl -X POST "http://0.0.0.0:8080/transaction/fee-estimate" \
        -H  "accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{"tx": "0x4502846c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e2262014c07390bdca66d30586819dfaed8a2741dcc1de35415387573d1ca115780b4677630e1651702a04e6c17ba286a349d950737c208db94b08f4bfb2f04f0f8ab8a0501140006006c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e226213000064a7b3b6e00d"}'

{"weight":"190949000","class":"Normal","partialFee":"125000147"}
```

```
curl -X POST "http://0.0.0.0:8080/transaction" \
        -H  "accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{"tx": "0x4502846c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e2262011e0adc21437dce05a45d918caf86a6ba49c1b70f9eba0614e87da638f535977b09bb22bbf36364681bcaa8028f578653d771d3c0699db448edd195d9848c51854500080006006c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e226213000064a7b3b6e00d"}'

{"hash":"0x4d40886dc0e833dcbe09ef27fc35ef608b84db304100723d261e1b0eb0a5e88e"}
```

```
curl -X GET "http://0.0.0.0:8080/transaction/material?at=1" -H  "accept: application/json" | jq

{
  "at": {
    "hash": "0x79e15278d3f46dd83becfd41c9e1e6ef97a35c5ae5e3de532226eccc8699fe36",
    "height": "1"
  },
  "genesisHash": "0xc9749948729cb3a9bdb0e9985fbc77625c0bf919ca9a951821a9317e1223ddba",
  "chainName": "DataHighway Harbour Testnet",
  "specName": "datahighway",
  "specVersion": "1",
  "txVersion": "1",
  "metadata": "0x6
}
```

To list all storage of an endpoint `/pallets/:palletId/storage/` and to query the storage id of any pallet, `/pallets/:palletId/storage/:storageItemId"`

Specifically to test this storage endpoint of the democracy module (but it needs to be implemented in the DataHighway chain itself first)
```
curl -s http://0.0.0.0:8080/pallets/democracy/storage/ | jq
curl -s http://0.0.0.0:8080/pallets/democracy/storage/ReferendumInfoOf | jq
```

To tests a **token mining** endpoint

Create a new token mining rate instance at https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fspreehafen.datahighway.com#/extrinsics. Uncheck "Sign and Submit", enter a Nonce that is larger than the last shown. click "Sign". Copy the unsigned transaction hash and paste below. Alternatively just sign the transaction and submit it there if you do not want to do it separately with cURL.

```
curl -X POST "http://0.0.0.0:8080/pallets/mining/mining-speed-boost/rates/token-mining/create" \
        -H  "accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{"tx": "<UNSIGNED_TX>"}'
```

Check that it has been created.

```
curl -s http://0.0.0.0:8080/pallets/mining/mining-speed-boost/rates/token-mining/0/show | jq
curl -s http://0.0.0.0:8080/pallets/mining/mining-speed-boost/rates/token-mining/count | jq
```

To test a **hardware mining** endpoint

```
curl -X POST "http://0.0.0.0:8080/pallets/mining/mining-speed-boost/rates/hardware-mining/create" \
        -H  "accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{"tx": "<UNSIGNED_TX>"}'

curl -s http://0.0.0.0:8080/pallets/mining/mining-speed-boost/rates/hardware-mining/0/show | jq
```

Now create a "config" for the new token mining rate at https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fspreehafen.datahighway.com#/extrinsics. There is only one "config" per mining rate object. Uncheck "Sign and Submit", enter a Nonce that is larger than the last shown. click "Sign". Copy the unsigned transaction hash and paste below. Alternatively just sign the transaction and submit it there if you do not want to do it separately with cURL.

```
curl -X POST "http://0.0.0.0:8080/pallets/mining/mining-speed-boost/rates/hardware-mining/0/config/create" \
        -H  "accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{"tx": "<UNSIGNED_TX>"}'
```

Specify as a URL parameter the mining rate object id that the "config" belongs to, which you want to query.
```
curl -s http://0.0.0.0:8080/pallets/mining/mining-speed-boost/rates/hardware-mining/0/config/show | jq

// terminal output example
{
  "hash": {
    "hardware_hardware_secure": "2",
    "hardware_hardware_insecure": "1.5",
    "hardware_max_hardware": "1.25",
    "hardware_category_1_max_token_bonus_per_gateway": "1000000",
    "hardware_category_2_max_token_bonus_per_gateway": "500000",
    "hardware_category_3_max_token_bonus_per_gateway": "250000",
  }
}
```

Note: The actual tx fee is larger than the estimated tx fee by ~0.6%, see [Actual vs Estimated Tx Fee](./TRANSACTION_FEE_COMPARE.md)

### Running

```bash
# For live reload in development
yarn dev

# To build and run
yarn build
yarn start
```

[Jump to the configuration section](#configuration) for more details on connecting to a node.

## Configuration

To use a specific env profile (here for instance a profile called 'env.sample'):

```bash
NODE_ENV=sample yarn start
```

For more information on our configuration manager visit its readme [here](https://gitlab.com/chevdor/confmgr/-/raw/master/README.adoc). See `Specs.ts` to view the env configuration spec.

### Express server

-   `SAS_EXPRESS_BIND_HOST`: address on which the server will be listening, defaults to `127.0.0.1`.
-   `SAS_EXPRESS_PORT`: port on which the server will be listening, defaults to `8080`.
-   `SAS_EXPRESS_LOG_MODE`: enable console logging of "all" HTTP requests, only "errors", or nothing by
    setting it to anything else. LOG_MODE defaults to only "errors".

### Substrate node

-   `SAS_SUBSTRATE_WS_URL`: WebSocket URL to which the RPC proxy will attempt to connect to, defaults to
    `ws://127.0.0.1:9944`.

#### Custom substrate types

Some chains require custom type definitions in order for Sidecar to know how to decode the data
retrieved from the node. Sidecar pulls types for chains from [@polkadot/apps-config](https://github.com/polkadot-js/apps/tree/master/packages/apps-config), but in some cases
the types for the chain you are trying to connect to may be out of date or may simply not exist in
@polkadot/apps-config.

Sidecar affords environment variables which allow the user to specify an absolute path to a JSON file
that contains type definitions in the corresponding formats. Consult polkadot-js/api for more info on
the type formats (see `RegisteredTypes`).

**N.B** Types set from environment variables will override the corresponding types pulled from
@polkadot/apps-config.

-   `SAS_SUBSTRATE_TYPES_BUNDLE`: a bundle of types with versioning info, type aliases, derives, and
    rpc definitions. Format: `OverrideBundleType` (see [`typesBundle`](https://github.com/polkadot-js/api/blob/21039dec1fcad36061a96bf5526248c5fab38780/packages/types/src/types/registry.ts#L72)).
-   `SAS_SUBSTRATE_TYPES_CHAIN`: type definitions keyed by `chainName`. Format: `Record<string, RegistryTypes>` (see [`typesChain`](https://github.com/polkadot-js/api/blob/21039dec1fcad36061a96bf5526248c5fab38780/packages/types/src/types/registry.ts#L76)).
-   `SAS_SUBSTRATE_TYPES_SPEC`: type definitions keyed by `specName`. Format: `Record<string, RegistryTypes>` (see [`typesSpec`](https://github.com/polkadot-js/api/blob/21039dec1fcad36061a96bf5526248c5fab38780/packages/types/src/types/registry.ts#L80)).
-   `SAS_SUBSTRATE_TYPES`: type definitions and overrides, not keyed. Format: `RegistryTypes` (see [`types`](https://github.com/polkadot-js/api/blob/21039dec1fcad36061a96bf5526248c5fab38780/packages/types/src/types/registry.ts#L64)).

You can read more about [defining types for polkadot-js here.](https://polkadot.js.org/api/start/types.extend.html)

##### Connecting a modified node template

Polkadot-js can recognize the standard node template and inject the correct types, but if you have
modified the name of your chain in the node template you will need to add the types manually in a
JSON `types` file like so:

```json
// my-chains-types.json
{
  "Address": "AccountId",
  "LookupSource": "AccountId"
}
```

and then set the enviroment variable to point to your definitions:

```bash
export SAS_SUBSTRATE_TYPES=/path/to/my-chains-types.json
```

### Logging

-   `SAS_LOG_LEVEL`: the lowest priority log level to surface, defaults to `info`. Tip: set to `http`
    to see all HTTP requests.
-   `SAS_LOG_JSON`: wether or not to have logs formatted as JSON, defaults to `false`.
    Useful when using `stdout` to programmatically process Sidecar log data.
-   `SAS_LOG_FILTER_RPC`: wether or not to filter polkadot-js API-WS RPC logging, defaults to `false`.
-   `SAS_LOG_STRIP_ANSI`: wether or not to strip ANSI characters from logs, defaults
    to `false`. Useful when logging RPC calls with JSON written to transports.

#### Log levels

Log levels in order of decreasing importance are: `error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`.

| http status code range | log level |
|------------------------|-----------|
| `code` < 400           | `http`    |
| 400 <= `code` < 500    | `warn`    |
| 500 < `code`           | `error`   |

#### RPC logging

If looking to track raw RPC requests/responses, one can use `yarn start:log-rpc` to turn on polkadot-js's 
logging. It is recommended to also set `SAS_LOG_STRIP_ANSI=true` to increase the readability of the logging stream.

**N.B.** If running `yarn start:log-rpc`, the NODE_ENV will be set to `test`. In order still run your `.env`
file you can `symlink` it with `.env.test`. For example you could run
`ln -s .env.myEnv .env.test && yarn start:log-rpc` to use `.env.myEnv` to set ENV variables. (see linux
commands `ln` and `unlink` for more info.)

## Debugging fee and payout calculations

It is possible to get more information about the fee and payout calculation process logged to
the console. Because this fee calculation happens in the statically compiled web assembly part
a re-compile with the proper environment variable set is necessary:

```bash
CALC_DEBUG=1 sh calc/build.sh
```

## Available endpoints

[Click here for full endpoint docs.](https://paritytech.github.io/substrate-api-sidecar/dist/)

## Chain integration guide

[Click here for chain integration guide.](/CHAIN_INTEGRATION.md)

## Docker

### Pull the latest release

```bash
docker pull docker.io/parity/substrate-api-sidecar:latest
```

The specific image tag matches the release version.

### Or build from source

```bash
yarn build:docker
```

### Run

```bash
# For default use run:
docker run --rm -it -p 8080:8080 substrate-api-sidecar

# Or if you want to use environment variables set in `.env.docker`, run:
docker run --rm -it --env-file .env.docker -p 8080:8080 substrate-api-sidecar
```

then you can test with:

```bash
curl -s http://0.0.0.0:8080/blocks/head | jq
```

**N.B.** The docker flow presented here is just a sample to help get started. Modifications may be necessary for secure usage.

## Contribute

Need help or want to contribute ideas or code? Head over to our [CONTRIBUTING](CONTRIBUTING.md) doc for more information.

## Note for maintainers

All the commits in this repo follow the [Conventional Commits spec](https://www.conventionalcommits.org/en/v1.0.0/#summary). When merging a PR, make sure 1/ to
use squash merge and 2/ that the title of the PR follows the Conventional Commits spec.

The history of commits will be used to generate the `CHANGELOG`. To do so, run `yarn deploy` on the master
branch. This command will look at all the commits since the latest tag, bump the package version according
to semver rules, and generate a new `CHANGELOG`.

If you don't want to follow semver or need to do a dry run, consult the [`standard-version` CLI usage](https://github.com/conventional-changelog/standard-version#cli-usag)
docs. Flags for `standard-version` can be passed to `yarn deploy`.

`yarn deploy`, which only does local operations and doesn't push anything, will output more or
less the following lines:

``` bash
$ yarn deploy
yarn run v1.21.1
$ yarn build && standard-version -r minor
$ rimraf lib/ && tsc
✔ bumping version in package.json from 0.18.1 to 0.18.2
✔ outputting changes to CHANGELOG.md
✔ committing package.json and CHANGELOG.md
✔ tagging release v0.18.2
ℹ Run `git push --follow-tags origin master && npm publish` to publish
```

To publish the new package, just follow the instructions: `git push --follow-tags origin master && npm publish.`
You must have access to the @substrate organization on npm to publish.
