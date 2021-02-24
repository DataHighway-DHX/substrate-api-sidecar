import { ApiPromise } from '@polkadot/api';

import { StakingService } from '../../services/transaction/StakingService';
import { IAddressParam, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';

export default class StakeBondController extends AbstractController<StakingService> {
	constructor(api: ApiPromise) {
		super(api, '/pallets/staking/bond-extra', new StakingService(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.router.post(
			this.path,
			StakeBondController.catchWrap(this.bondExtra)
		);
	}

	/**
	 * POST stake bond extra.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private bondExtra: IPostRequestHandler<IAddressParam> = async (
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

		StakeBondController.sanitizedSend(
			res,
			await this.service.bondExtra(secret, parsedAmount)
		);
	};
}
