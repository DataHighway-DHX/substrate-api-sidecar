import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';

import { StakingService } from '../../services/transaction/StakingService';
import AbstractController from '../AbstractController';

export default class StakeValidatorRewardController extends AbstractController<StakingService> {
	constructor(api: ApiPromise) {
		super(
			api,
			'/pallets/staking/validator-reward',
			new StakingService(api)
		);
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.safeMountAsyncGetHandlers([['', this.validatorReward]]);
	}

	/**
	 * GET validator reward
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private validatorReward: RequestHandler = async (
		{ query: { validatorId } },
		res
	): Promise<void> => {
		if (!validatorId || typeof validatorId !== 'string') {
			throw {
				error: 'validatorId is not correct',
			};
		}
		StakeValidatorRewardController.sanitizedSend(
			res,
			await this.service.validatorRewardData(validatorId)
		);
	};
}
