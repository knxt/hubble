1. User opens a new channel on-chain with a channelId. The channelId is a random bytes32 value.
2. Hubble can then join that channel by submitting a tx on-chain.
3. Deposits to/from the Hub are made.
4. Users then open threads with each other, locking up ETH in these threads until they're closed.

QUESTION: A hub would be like a arcade, opening a channel and making the deposits would be like buying the arcade credits for use in games and opening/updating threads would be like paying the small fees at the arcade games for each round, except in the end you can refund wtv credits you have left for cash?

5. Users do wtv tf they want, sending as many txs they need.
6. Once users are done transacting, they close the thread and update the state of their balances.

QUESTION: How are channels updated state and blockchain wise?

7. When users want ETH back they close the channel and reclaim their ETH on chain.

NOTE: idk the potential of e-contracts but it's possible a contract won't even be needed, instead there can be off-chain hubs that lock up your ETH and can send you wtv you're owed once you're done with the hub.

QUESTION: How will state be stored (what info needs to be stored)? How is the final state transmitted on-chain? Could a hub simply sign and execute a transfer from one party to another (maybe taking fees in between)? Is there any need for an on-chain component with e-contracts?
