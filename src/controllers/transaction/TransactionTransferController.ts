import { ApiPromise } from '@polkadot/api';

import { checkAddress } from '../../middleware/validate/validateAddressMiddleware';
import { TransactionTransferService } from '../../services/transaction/TransactionTransferBalanceService';
import { IAddressParam, IPostRequestHandler } from '../../types/requests';
import AbstractController from '../AbstractController';

export default class TransactionTransferController extends AbstractController<TransactionTransferService> {
	constructor(api: ApiPromise) {
		super(
			api,
			'/transaction/transfer',
			new TransactionTransferService(api)
		);
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.router.post(
			this.path,
			TransactionTransferController.catchWrap(this.transfer)
		);
	}

	/**
	 * POST balance transfer.
	 *
	 * @param _req Express Request
	 * @param res Express Response
	 */
	private transfer: IPostRequestHandler<IAddressParam> = async (
		{ body: { secret, destination, amount, token } },
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

		if (token?.toString()?.toUpperCase() !== 'DHX') {
			throw {
				error: 'Only DHX token is now supported.',
			};
		}

		const parsedDestination = destination?.toString() ?? '';
		const [addressValid, error] = checkAddress(parsedDestination);
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

		TransactionTransferController.sanitizedSend(
			res,
			await this.service.transfer(
				secret,
				parsedAmount,
				'dhx',
				parsedDestination
			)
		);
	};
}
