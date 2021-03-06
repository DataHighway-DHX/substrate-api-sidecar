import { ControllerConfig } from '../types/chains-config';

/**
 * Controllers for Dock's test network.
 */
export const dockTestnetControllers: ControllerConfig = {
	controllers: {
		Blocks: true,
		BlocksExtrinsics: true,
		AccountsStakingPayouts: false,
		AccountsBalanceInfo: true,
		AccountsStakingInfo: false,
		AccountsVestingInfo: false,
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
		PalletsStakingProgress: false,
		PalletsStorage: true,
		StakeBondController: true,
		StakeBondExtraController: true,
		StakeUnbondController: true,
		StakeValidatorRewardController: true,
		StakeElectedInfoController: true,
	},
	options: {
		finalizes: true,
	},
};
