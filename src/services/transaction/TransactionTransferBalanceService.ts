import { ApiPromise } from '@polkadot/api';

import { AbstractService } from '../AbstractService';
import { Keyring } from '@polkadot/api';

export class TransactionTransferService extends AbstractService {
	/**
	 * Transfer balance from one account (who's secret passed) to [destination]
	 *
	 * @param secret `string` transactor's secret
	 * @param amount `number` amount to send
	 * @param token `string` send token
	 * @param destination `string` transfer destination
	 */
	async transfer(
		secret: string,
		amount: number,
		token: string,
		destination: string,
	): Promise<string> {
		const api : ApiPromise = this.api;
		const keyring = new Keyring({ type: 'sr25519' });

		if (token != 'dhx') {
			throw {
				error: 'Token must be dhx.',
			};
		}

		const sender = keyring.addFromUri(secret);
		
		const txHash = await api.tx.balances
			.transfer(destination, amount)
			.signAndSend(sender);
			
		return txHash.toString();
	}
}
