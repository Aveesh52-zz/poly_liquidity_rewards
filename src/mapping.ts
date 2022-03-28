import { BigInt } from "@graphprotocol/graph-ts"
import {
  RewardPaid
} from "../generated/poly_liquidity_rewards/poly_liquidity_rewards"
import { Balance } from "../generated/schema"

export function handleRewardPaid(event: RewardPaid): void {
   
  let entity = Balance.load(event.transaction.from.toHex())
  if (!entity) {
    entity = new Balance(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }
 // let entitybalanceEntity = new Balance(event.transaction.hash.toHex());
  entity.address = event.params.user
  entity.count = event.params.reward

  entity.save()
}
