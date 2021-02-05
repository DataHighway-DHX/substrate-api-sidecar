import {
  IPalletMiningSpeedBoostRatesTokenMining,
  IPalletMiningSpeedBoostRatesTokenMiningCount
} from 'src/types/responses';

import { AbstractService } from '../AbstractService';

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

	async fetchPalletsMiningSpeedBoostRatesTokenMiningCount(): Promise<IPalletMiningSpeedBoostRatesTokenMiningCount> {
		let count;
		try {
			count = await this.api.query
				.dataHighwayMiningSpeedBoostRatesTokenMining
				.miningSpeedBoostRatesTokenMiningCount();
		} catch {
			count = 'Cannot query miningSpeedBoostRatesTokenMiningCount from node.';
		}

		return {
			count
		};
	}
}
