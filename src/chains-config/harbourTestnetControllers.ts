import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers for harbour, DataHighway's test network.
 */
export const harbourTestnetControllers: ControllerConfig = {
	controllers: {
		Blocks: true,
		BlocksExtrinsics: true,
		AccountsStakingPayouts: true,
		AccountsBalanceInfo: true,
		AccountsStakingInfo: true,
		AccountsVestingInfo: true,
		NodeNetwork: true,
		NodeVersion: true,
    	NodeTransactionPool: true,
		RuntimeCode: true,
		RuntimeSpec: true,
		RuntimeMetadata: true,
		TransactionDryRun: true,
		TransactionMaterial: true,
		TransactionFeeEstimate: true,
		TransactionSubmit: true,
		PalletsMiningSpeedBoostRatesTokenMining: true,
		PalletsMiningSpeedBoostRatesHardwareMining: true,
		PalletsStakingProgress: true,
		PalletsStorage: true,
	},
	options: {
		finalizes: true,
	},
};
