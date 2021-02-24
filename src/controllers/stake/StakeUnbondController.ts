import { ApiPromise } from '@polkadot/api';

import { StakingService } from '../../services/transaction/StakingService';
import { IAddressParam, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';

export default class StakeUnbondController extends AbstractController<StakingService> {
	constructor(api: ApiPromise) {
		super(api, '/pallets/staking/unbond', new StakingService(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.router.post(
			this.path,
			StakeUnbondController.catchWrap(this.unbond)
		);
	}

	/**
	 * POST stake unbond.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private unbond: IPostRequestHandler<IAddressParam> = async (
		{ body: { secret, amount } },
		res
	): Promise<void> => {
		const parsedAmount = Number.parseFloat(amount?.toString() ?? '-1');
		if (
			parsedAmount < 0 ||
			!Number.isFinite(parsedAmount) ||
			Number.isNaN(parsedAmount)
		) {
			throw {
				error: 'Amount is not valid. It must be > 0.',
			};
		}

		if (!secret) {
			throw {
				error: 'Secret is not valid.',
			};
		}

		StakeUnbondController.sanitizedSend(
			res,
			await this.service.unbond(secret, parsedAmount)
		);
	};
}
