import { ApiPromise } from '@polkadot/api';
import { RequestHandler } from 'express';

import { PalletsMiningSpeedBoostRatesTokenMiningService } from '../../services';
import { INumberParam, IPostRequestHandler, ITx } from '../../types/requests';
import AbstractController from '../AbstractController';

export default class PalletsMiningSpeedBoostRatesTokenMiningsController extends AbstractController<PalletsMiningSpeedBoostRatesTokenMiningService> {
	constructor(api: ApiPromise) {
    super(api, '/pallets/mining/mining-speed-boost/rates/token-mining',
    new PalletsMiningSpeedBoostRatesTokenMiningService(api));
		this.initRoutes();
	}

	protected initRoutes(): void {
		this.safeMountAsyncGetHandlers([
      ['/:index', this.getPalletsMiningSpeedBoostRatesTokenMiningById],
      ['/count', this.getPalletsMiningSpeedBoostRatesTokenMiningCount],
      ['/create', this.createPalletsMiningSpeedBoostRatesTokenMining],
		]);
	}
  
	/**
	 * Get a MiningSpeedBoostRatesTokenMining by its index.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private getPalletsMiningSpeedBoostRatesTokenMiningById: RequestHandler<INumberParam> = async (
    { params: { index } },
		res
	): Promise<void> => {
		PalletsMiningSpeedBoostRatesTokenMiningsController.sanitizedSend(
			res,
			await this.service.fetchPalletsMiningSpeedBoostRatesTokenMiningById(index)
		);
  };

  /**
	 * Get MiningSpeedBoostRatesTokenMining count.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private getPalletsMiningSpeedBoostRatesTokenMiningCount: RequestHandler = async (
    { query: { } },
		res
	): Promise<void> => {
		PalletsMiningSpeedBoostRatesTokenMiningsController.sanitizedSend(
			res,
			await this.service.fetchPalletsMiningSpeedBoostRatesTokenMiningCount()
		);
  };

  /**
	 * Create a MiningSpeedBoostRatesTokenMining.
	 *
	 * @param req Express Request
	 * @param res Express Response
	 */
	private createPalletsMiningSpeedBoostRatesTokenMining: IPostRequestHandler<ITx> = async (
		{ body: { tx } },
		res
	): Promise<void> => {
    console.log('blaghh')
		if (!tx) {
			throw {
				error: 'Missing field `tx` on request body.',
			};
    }
		PalletsMiningSpeedBoostRatesTokenMiningsController.sanitizedSend(
			res,
			await this.service.createPalletsMiningSpeedBoostRatesTokenMining(tx)
		);
	};
}
