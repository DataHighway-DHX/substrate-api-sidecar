import {
  	IPalletMiningSpeedBoostRatesHardwareMining,
} from 'src/types/responses';

// import { ITxHardwareConfig } from '../../types/requests';
import { AbstractService } from '../AbstractService';
import { extractCauseAndStack } from '../transaction/extractCauseAndStack';

export class PalletsMiningSpeedBoostRatesHardwareMiningService extends AbstractService {
	async fetchPalletsMiningSpeedBoostRatesHardwareMiningById(index: string): Promise<IPalletMiningSpeedBoostRatesHardwareMining> {
		let hash;
		try {
			hash = await this.api.query
				.dataHighwayMiningSpeedBoostRatesHardwareMining
				.miningSpeedBoostRatesHardwareMinings(index);
		} catch {
			hash = 'Cannot query miningSpeedBoostRatesHardwareMinings from node.';
		}

		return {
			hash
		};
  	}

	async fetchPalletsMiningSpeedBoostRatesHardwareMiningCount(): Promise<IPalletMiningSpeedBoostRatesHardwareMining> {
		let hash;
		try {
			hash = await this.api.query
				.dataHighwayMiningSpeedBoostRatesHardwareMining
				.miningSpeedBoostRatesHardwareMiningCount();
		} catch {
			hash = 'Cannot query miningSpeedBoostRatesHardwareMiningCount from node.';
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
	async createPalletsMiningSpeedBoostRatesHardwareMining(transaction: string): Promise<IPalletMiningSpeedBoostRatesHardwareMining> {
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


	/**
	 * Submit a fully formed SCALE-encoded extrinsic for block inclusion.
	 *
	 * @param extrinsic scale encoded extrinsic to submit
	 */
	async createConfigPalletsMiningSpeedBoostRatesHardwareMiningForId(args: string): Promise<any> {
		console.log('args', args)
		
		const { api } = this;

		let tx;

		try {
			tx = api.tx(args);
		} catch (err) {
			const { cause, stack } = extractCauseAndStack(err);

			throw {
				error: 'Failed to parse transaction.',
				args,
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
				args,
				cause,
				stack,
			};
		}
	}

	async fetchPalletsMiningSpeedBoostRatesHardwareMiningConfigById(index: string): Promise<IPalletMiningSpeedBoostRatesHardwareMining> {
		let hash;
		try {
			hash = await this.api.query
				.dataHighwayMiningSpeedBoostRatesHardwareMining
				.miningSpeedBoostRatesHardwareMiningRatesConfigs(index);
		} catch {
			hash = 'Cannot query miningSpeedBoostRatesHardwareMiningRatesConfigs from node.';
		}

		return {
			hash
		};
  	}
}
