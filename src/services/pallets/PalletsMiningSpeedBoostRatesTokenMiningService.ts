import {
  IPalletMiningSpeedBoostRatesTokenMining,
} from 'src/types/responses';

import { AbstractService } from '../AbstractService';
import { extractCauseAndStack } from './extractCauseAndStack';

export class PalletsMiningSpeedBoostRatesTokenMiningService extends AbstractService {
	async fetchPalletsMiningSpeedBoostRatesTokenMiningById(index: string): Promise<IPalletMiningSpeedBoostRatesTokenMining> {
		let hash;
		try {
			hash = await this.api.query
				.dataHighwayMiningSpeedBoostRatesTokenMining
				.miningSpeedBoostRatesTokenMinings(index);
		} catch {
			hash = 'Cannot query miningSpeedBoostRatesTokenMinings from node.';
		}

		return {
			hash
		};
  }

	async fetchPalletsMiningSpeedBoostRatesTokenMiningCount(): Promise<IPalletMiningSpeedBoostRatesTokenMining> {
		let hash;
		try {
			hash = await this.api.query
				.dataHighwayMiningSpeedBoostRatesTokenMining
				.miningSpeedBoostRatesTokenMiningCount();
		} catch {
			hash = 'Cannot query miningSpeedBoostRatesTokenMiningCount from node.';
		}

		return {
			hash
		};
	}

	/**
	 * Submit a fully formed SCALE-encoded extrinsic for block inclusion.
	 *
	 * @param extrinsic scale encoded extrinsic to submit
	 */
	async createPalletsMiningSpeedBoostRatesTokenMining(transaction: string): Promise<IPalletMiningSpeedBoostRatesTokenMining> {
		const { api } = this;

		let tx;

		try {
			tx = api.tx(transaction);
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);

			throw {
				error: 'Failed to parse transaction.',
				transaction,
				cause,
				stack,
			};
		}

		try {
			const hash = await api.rpc.author.submitExtrinsic(tx);

			return {
				hash,
			};
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);

			throw {
				error: 'Failed to submit transaction.',
				transaction,
				cause,
				stack,
			};
		}
	}
}
