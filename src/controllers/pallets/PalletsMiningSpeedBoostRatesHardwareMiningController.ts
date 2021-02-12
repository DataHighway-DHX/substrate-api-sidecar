import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';

import { PalletsMiningSpeedBoostRatesHardwareMiningService } from '../../services';
import { INumberParam, IPostRequestHandler, ITx } from '../../types/requests';
import AbstractController from '../AbstractController';

export default class PalletsMiningSpeedBoostRatesHardwareMiningsController extends AbstractController<PalletsMiningSpeedBoostRatesHardwareMiningService> {
	constructor(api: ApiPromise) {
		super(api, '/pallets/mining/mining-speed-boost/rates/hardware-mining',
		new PalletsMiningSpeedBoostRatesHardwareMiningService(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		// GET
		this.safeMountAsyncGetHandlers([
			['/:index/show', this.getPalletsMiningSpeedBoostRatesHardwareMiningById],
			['/count', this.getPalletsMiningSpeedBoostRatesHardwareMiningCount],
			['/:index/config/show', this.getPalletsMiningSpeedBoostRatesHardwareMiningConfigById],
		]);
		// POST
		this.router.post(
			`${this.path}/create`,
			PalletsMiningSpeedBoostRatesHardwareMiningsController
				.catchWrap(this.createPalletsMiningSpeedBoostRatesHardwareMining)
		);
		this.router.post(
			`${this.path}/:index/config/create`,
			PalletsMiningSpeedBoostRatesHardwareMiningsController
				.catchWrap(this.createConfigPalletsMiningSpeedBoostRatesHardwareMining)
		);
	}

	/**
	 * POST Create a MiningSpeedBoostRatesHardwareMining.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private createPalletsMiningSpeedBoostRatesHardwareMining: IPostRequestHandler<ITx> = async (
		{ body: { tx } },
		res
	): Promise<void> => {
		if (!tx) {
			throw {
				error: 'Missing field `tx` on request body.',
			};
		}
		PalletsMiningSpeedBoostRatesHardwareMiningsController.sanitizedSend(
			res,
			await this.service.createPalletsMiningSpeedBoostRatesHardwareMining(tx)
		);
	};

	/**
	 * GET Get a MiningSpeedBoostRatesHardwareMining by its index.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private getPalletsMiningSpeedBoostRatesHardwareMiningById: RequestHandler<INumberParam> = async (
    	{ params: { index } },
		res
	): Promise<void> => {
		PalletsMiningSpeedBoostRatesHardwareMiningsController.sanitizedSend(
			res,
			await this.service.fetchPalletsMiningSpeedBoostRatesHardwareMiningById(index)
		);
  	};

  	/**
	 * GET Get MiningSpeedBoostRatesHardwareMining count.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private getPalletsMiningSpeedBoostRatesHardwareMiningCount: RequestHandler = async (
    	{ query: { } },
		res
	): Promise<void> => {
		PalletsMiningSpeedBoostRatesHardwareMiningsController.sanitizedSend(
			res,
			await this.service.fetchPalletsMiningSpeedBoostRatesHardwareMiningCount()
		);
	};

	/**
	 * POST Create a MiningSpeedBoostRatesHardwareMiningConfigForId.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private createConfigPalletsMiningSpeedBoostRatesHardwareMining: IPostRequestHandler<ITx> = async (
		{ body: { tx } },
		res
	): Promise<void> => {
		if (!tx) {
			throw {
				error: 'Missing field on request body.',
			};
		}
		// console.log('params index that is used in the unsigned tx', index);

		PalletsMiningSpeedBoostRatesHardwareMiningsController.sanitizedSend(
			res,
			await this.service.createConfigPalletsMiningSpeedBoostRatesHardwareMining(tx)
		);
	};

	/**
	 * GET Get a MiningSpeedBoostRatesHardwareMiningConfig by its index.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private getPalletsMiningSpeedBoostRatesHardwareMiningConfigById: RequestHandler<INumberParam> = async (
    	{ params: { index } },
		res
	): Promise<void> => {
		PalletsMiningSpeedBoostRatesHardwareMiningsController.sanitizedSend(
			res,
			await this.service.fetchPalletsMiningSpeedBoostRatesHardwareMiningConfigById(index)
		);
  	};
}
