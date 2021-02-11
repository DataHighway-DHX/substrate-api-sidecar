* Check the account balance of the DHX DAO before making a transaction

```
curl -s http://0.0.0.0:8080/accounts/5EWKojw2i3uoqfWx1dEgVjBsvK5xuTr5G3NjXYh47H6ycBWr/balance-info\ | jq

{
  "at": {
    "hash": "0xa1257fcefd3d54333ad942c36602e6f044c09f68f11c21acbaa4e3aeb76bad5e",
    "height": "8766"
  },
  "nonce": "5",
  "tokenSymbol": "DHX",
  "free": "29999999999999374999262",
  "reserved": "0",
  "miscFrozen": "0",
  "feeFrozen": "0",
  "locks": []
}
```

Connect Polkadot.js Apps to the node by going to https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fspreehafen.datahighway.com#/accounts.
Make a transfer of 1 DHX. The fee estimate of 125.0001 pico DHX will be shown.
Choose not to sign and send so it will just generate an unsigned transaction hash

```
0x4502846c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e2262014c07390bdca66d30586819dfaed8a2741dcc1de35415387573d1ca115780b4677630e1651702a04e6c17ba286a349d950737c208db94b08f4bfb2f04f0f8ab8a0501140006006c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e226213000064a7b3b6e00d
```

Copy that unsigned transaction hash and use it to calculate the estimated transaction fee, and note that the estimated fee is shown in the output as 125000147
```
curl -X POST "http://0.0.0.0:8080/transaction/fee-estimate" \
        -H  "accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{"tx": "0x4502846c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e2262014c07390bdca66d30586819dfaed8a2741dcc1de35415387573d1ca115780b4677630e1651702a04e6c17ba286a349d950737c208db94b08f4bfb2f04f0f8ab8a0501140006006c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e226213000064a7b3b6e00d"}'

{"weight":"190949000","class":"Normal","partialFee":"125000147"}
```

Copy the unsigned transaction hash again and use it for the actual transaction

```
curl -X POST "http://0.0.0.0:8080/transaction" \
        -H  "accept: application/json" \
        -H "Content-Type: application/json" \
        -d '{"tx": "0x4502846c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e2262014c07390bdca66d30586819dfaed8a2741dcc1de35415387573d1ca115780b4677630e1651702a04e6c17ba286a349d950737c208db94b08f4bfb2f04f0f8ab8a0501140006006c029e6fc41ec44d420030071f04995bac19e59a0f0a1a610f9f0f6d689e226213000064a7b3b6e00d"}'

{"hash":"0x6b2162961081dba28e8ef0b077589e81259582bc16aee2c04717289eb8c540aa"}
```

Now check the user's account balance again to see how much the actual tx fee reduced their balance by:
```
{
  "at": {
    "hash": "0xf8729156d1f9c2ae4a63a05156d328d9a9717306d66dcafb0b6c53d64f5d1141",
    "height": "8804"
  },
  "nonce": "6",
  "tokenSymbol": "DHX",
  "free": "29999999999999249999115",
  "reserved": "0",
  "miscFrozen": "0",
  "feeFrozen": "0",
  "locks": []
}
```

Calculate the difference between actual and estimated tx fee:
```
actual tx fee = 29999999999999374999262 - 29999999999999249999115 = 125829120
diff between actual and estimated fee = 125829120 - 125000147 = 828973

29999.999999999249999115
    0.000000000000828973
```


