import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers for mandala, acala's test network.
 */
export const mandalaControllers: ControllerConfig = {
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
		TransactionTransfer: true,
		PalletsMiningSpeedBoostRatesTokenMining: false,
		PalletsMiningSpeedBoostRatesHardwareMining: false,
		PalletsStakingProgress: true,
		PalletsStorage: true,
		StakeBondController: true,
		StakeBondExtraController: true,
		StakeUnbondController: true,
	},
	options: {
		finalizes: true,
	},
};
