import {
  IPalletMiningSpeedBoostRatesTokenMining,
  IPalletMiningSpeedBoostRatesTokenMiningCount
} from 'src/types/responses';

import { AbstractService } from '../AbstractService';

export class PalletsMiningSpeedBoostRatesTokenMiningService extends AbstractService {
	async fetchPalletsMiningSpeedBoostRatesTokenMiningById(index: string): Promise<IPalletMiningSpeedBoostRatesTokenMining> {
    console.log('this.api.query', this.api.query, index)
		let object;
		// try {
		// 	object = await this.api.query.palletsMiningSpeedBoostRatesTokenMiningById(index);
		// } catch {
		// 	object = 'Cannot query palletsMiningSpeedBoostRatesTokenMiningById from node.';
		// }

		return {
			object
		};
  }

	async fetchPalletsMiningSpeedBoostRatesTokenMiningCount(): Promise<IPalletMiningSpeedBoostRatesTokenMiningCount> {
    console.log('this.api.query', this.api.query)
		let count;
		// try {
		// 	count = await this.api.query.palletsMiningSpeedBoostRatesTokenMiningCount();
		// } catch {
		// 	count = 'Cannot query palletsMiningSpeedBoostRatesTokenMiningCount from node.';
		// }

		return {
			count
		};
	}
}
