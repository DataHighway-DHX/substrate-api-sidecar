import { ApiPromise } from '@polkadot/api';

import { checkAddress } from '../../middleware/validate/validateAddressMiddleware';
import { StakingService } from '../../services/transaction/StakingService';
import { IAddressParam, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';

export default class StakeBondController extends AbstractController<StakingService> {
	constructor(api: ApiPromise) {
		super(api, '/pallets/staking/bond', new StakingService(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.router.post(this.path, StakeBondController.catchWrap(this.bond));
	}

	/**
	 * POST stake bond.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private bond: IPostRequestHandler<IAddressParam> = async (
		{ body: { secret, controller, amount } },
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

		const parsedController = controller?.toString() ?? '';
		const [addressValid, error] = checkAddress(parsedController);
		if (!addressValid) {
			throw {
				error: `Destination is not valid. ${error ?? ''}`,
			};
		}

		if (!secret) {
			throw {
				error: 'Secret is not valid.',
			};
		}

		StakeBondController.sanitizedSend(
			res,
			await this.service.bond(secret, parsedAmount, parsedController)
		);
	};
}
