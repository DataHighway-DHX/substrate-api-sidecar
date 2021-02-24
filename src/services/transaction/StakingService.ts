import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import {
	AddressOrPair,
	ApiTypes,
	SubmittableExtrinsic,
} from '@polkadot/api/types';

import { AbstractService } from '../AbstractService';

export class StakingService extends AbstractService {
	async _waitTx(
		tx: SubmittableExtrinsic<ApiTypes>,
		secret: AddressOrPair
	): Promise<void> {
		return new Promise((resolve, err) => {
			void tx.signAndSend(secret, ({ events = [], status }) => {
				const type = status.type;
				if (type === 'Finalized') {
					console.log(
						'Successful transfer ' +
							' with hash ' +
							status.asFinalized.toString()
					);
					resolve(undefined);
				} else {
					console.log('Status of transfer: ' + type);
				}
				events.forEach(
					({ phase, event: { data, method, section } }) => {
						for (const d of data) {
							if (
								d &&
								d['asModule'] &&
								// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
								d['asModule']['error'] &&
								// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
								d['asModule']['error']['words']
							) {
								// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
								const error =
									// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
									d['asModule']['error']['words'][0];
								if (error == 2) {
									err({
										error: 'Stash is already bonded.',
									});
								} else if (error == 3) {
									err({
										error: 'Controller is already paired.',
									});
								} else {
									err({
										error:
											'Unknown error [3]. (https://wiki.polkadot.network/docs/en/maintain-errors)',
									});
								}
							}
						}
						console.log(
							`${phase.toString()}: ${section}.${method}.${data.toString()}`
						);
					}
				);
			});
		});
	}

	/**
	 * Bonds stake
	 *
	 * @param secret `string` transactor's secret
	 * @param amount `number` amount to send
	 * @param controller `string` controller address
	 */
	async bond(
		secret: string,
		amount: number,
		controller: string
	): Promise<void> {
		const api: ApiPromise = this.api;
		const keyring = new Keyring({ type: 'sr25519' });

		const sender = keyring.addFromUri(secret);
		const tx = api.tx.staking.bond(controller, amount, {
			Staked: true,
		});
		return this._waitTx(tx, sender);
	}

	/**
	 * Bond extra funds
	 *
	 * @param secret `string` transactor's secret
	 * @param amount `number` amount to send
	 */
	async bondExtra(secret: string, amount: number): Promise<void> {
		const api: ApiPromise = this.api;
		const keyring = new Keyring({ type: 'sr25519' });

		const sender = keyring.addFromUri(secret);
		const tx = api.tx.staking.bondExtra(amount);
		return this._waitTx(tx, sender);
	}

	/**
	 * Unbonds stake
	 *
	 * @param secret `string` transactor's secret
	 * @param amount `number` amount to send
	 * @param controller `string` controller address
	 */
	async unbond(secret: string, amount: number): Promise<void> {
		const api: ApiPromise = this.api;
		const keyring = new Keyring({ type: 'sr25519' });

		const sender = keyring.addFromUri(secret);
		const tx = api.tx.staking.unbond(amount);

		return this._waitTx(tx, sender);
	}

	/**
	 * Get ledger data by controller
	 *
	 * @param controller `string` controller address
	 */
	async ledger(controller: string): Promise<string> {
		const api: ApiPromise = this.api;
		const res = await api.query.staking.ledger(controller);
		console.log(res);

		return 'txHash.toString()';
	}
}
