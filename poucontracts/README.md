## Foundry

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Deploy

```shell
$ forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY --constructor-args $OWNER_ADDRESS  --legacy src/Factory.sol:PouFactory

$ forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY --legacy src/Staking.sol:PouStaking
```
