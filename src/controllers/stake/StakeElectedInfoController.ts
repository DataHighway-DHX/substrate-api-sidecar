import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';

import { StakingService } from '../../services/transaction/StakingService';
import AbstractController from '../AbstractController';

export default class StakeElectedInfoController extends AbstractController<StakingService> {
	constructor(api: ApiPromise) {
		super(api, '/pallets/staking/elected-info', new StakingService(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.safeMountAsyncGetHandlers([['', this.electedInfo]]);
	}

	/**
	 * GET elected info with validators
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private electedInfo: RequestHandler = async (_, res): Promise<void> => {
		StakeElectedInfoController.sanitizedSend(
			res,
			await this.service.electedInfo()
		);
	};
}
