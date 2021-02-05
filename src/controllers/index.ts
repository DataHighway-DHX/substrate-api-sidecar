import {
	AccountsBalanceInfo,
	AccountsStakingInfo,
	AccountsStakingPayouts,
	AccountsVestingInfo,
} from './accounts';
import { Blocks, BlocksExtrinsics } from './blocks';
import { NodeNetwork, NodeTransactionPool, NodeVersion } from './node';
import { PalletsMiningSpeedBoostRatesTokenMining, PalletsStakingProgress, PalletsStorage } from './pallets';
import { RuntimeCode, RuntimeMetadata, RuntimeSpec } from './runtime';
import {
	TransactionDryRun,
	TransactionFeeEstimate,
	TransactionMaterial,
	TransactionSubmit,
} from './transaction';

/**
 * Object containing every controller class definition.
 */
export const controllers = {
	Blocks,
	BlocksExtrinsics,
	AccountsBalanceInfo,
	AccountsStakingInfo,
	AccountsVestingInfo,
	AccountsStakingPayouts,
	PalletsMiningSpeedBoostRatesTokenMining,
	PalletsStakingProgress,
	PalletsStorage,
	NodeNetwork,
	NodeTransactionPool,
	NodeVersion,
	RuntimeCode,
	RuntimeMetadata,
	RuntimeSpec,
	TransactionDryRun,
	TransactionFeeEstimate,
	TransactionMaterial,
	TransactionSubmit,
};
