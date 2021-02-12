import {
  	IPalletMiningSpeedBoostRatesHardwareMining,
} from 'src/types/responses';

import { createPair } from '@polkadot/keyring/pair';
import { createTestKeyring } from '@polkadot/keyring/testing';
import { hexToU8a } from '@polkadot/util';

import { ITxHardwareConfig } from '../../types/requests';
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
	async createConfigPalletsMiningSpeedBoostRatesHardwareMiningForId(args: ITxHardwareConfig): Promise<any> {
		const { api } = this;

		let tx;

		const keyring = createTestKeyring({ type: 'ed25519' });
		const aliceEd = keyring.addPair(
		  // eslint-disable-next-line @typescript-eslint/unbound-method
		  createPair({ toSS58: keyring.encodeAddress, type: 'ed25519' }, {
			publicKey: hexToU8a('0x88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee'),
			secretKey: hexToU8a('0xabf8e5bdbe30c65656c0a3cbd181ff8a56294a69dfedd27982aace4a7690911588dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee')
		  })
		);

		try {
			// https://polkadot.js.org/docs/api/cookbook/tx
			tx = await api.tx
				.dataHighwayMiningSpeedBoostSamplingHardwareMining
				.setMiningSpeedBoostsSamplingsHardwareMiningSamplingsConfig(
					args.hardware_mining_rates_id,
					args.hardware_hardware_secure,
					args.hardware_hardware_insecure,
					args.hardware_max_hardware
				)
				.signAsync(aliceEd.address, {})

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
}
