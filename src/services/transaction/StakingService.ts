import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/api';
import {
	AddressOrPair,
	ApiTypes,
	SubmittableExtrinsic,
} from '@polkadot/api/types';
import {
	DeriveEraRewards,
	DeriveOwnExposure,
	DeriveStakerPoints,
	DeriveStakerSlashes,
	DeriveStakingElected,
} from '@polkadot/api-derive/staking/types';
import * as BN from 'bn.js';

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

				for (const {
					phase,
					event: { data, method, section },
				} of events) {
					for (const d of data) {
						// it's safe because of ?. operator
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
						const errorWords = (d as any)?.asModule?.error
							?.words as number[];
						if (errorWords) {
							const error = errorWords[0];
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
	 * Get elected info with validators
	 */
	async electedInfo(): Promise<DeriveStakingElected> {
		const api: ApiPromise = this.api;
		const res = await api.derive.staking.electedInfo();
		return res;
	}

	/**
	 * Get validator reward
	 *
	 * @param validatorId `string` controller address
	 */
	async validatorRewardData(
		validatorId: string
	): Promise<{
		points: { chart: (number[] | BN[])[]; labels: string[] };
		rewards: { chart: number[][]; labels: string[] };
		stakes: { chart: number[][]; labels: string[] };
	}> {
		const api: ApiPromise = this.api;
		const ownSlashes = await api.derive.staking.ownSlashes(
			validatorId,
			true
		);
		const erasRewards = await api.derive.staking.erasRewards();
		const stakerPoints = await api.derive.staking.stakerPoints(
			validatorId,
			true
		);
		const ownExposure = await api.derive.staking.ownExposures(
			validatorId,
			true
		);

		const points = this._extractPoints(stakerPoints);
		const rewards = this._extractRewards(
			erasRewards,
			ownSlashes,
			stakerPoints
		);
		const stakes = this._extractStake(ownExposure);
		return { points, rewards, stakes };
	}

	balanceToNumber(amount: BN): number {
		const divisor = new BN('1'.padEnd(12 + 1, '0'));
		return amount.muln(1000).div(divisor).toNumber() / 1000;
	}

	_extractRewards(
		erasRewards: DeriveEraRewards[],
		ownSlashes: DeriveStakerSlashes[],
		allPoints: DeriveStakerPoints[]
	): { chart: number[][]; labels: string[] } {
		const labels: string[] = [];
		const slashSet: number[] = [];
		const rewardSet: number[] = [];
		const avgSet: number[] = [];
		let avgCount = 0;
		let total = 0;

		erasRewards.forEach(({ era, eraReward }) => {
			const points = allPoints.find((points) => points.era.eq(era));
			const slashed = ownSlashes.find((slash) => slash.era.eq(era));
			const reward = points?.eraPoints.gtn(0)
				? this.balanceToNumber(
						points.points.mul(eraReward).div(points.eraPoints)
				  )
				: 0;
			const slash = slashed ? this.balanceToNumber(slashed.total) : 0;

			total += reward;

			if (reward > 0) {
				avgCount++;
			}

			labels.push(era.toHuman());
			rewardSet.push(reward);
			avgSet.push(
				(avgCount ? Math.ceil((total * 100) / avgCount) : 0) / 100
			);
			slashSet.push(slash);
		});

		return {
			chart: [slashSet, rewardSet, avgSet],
			labels,
		};
	}

	_extractPoints(
		points: DeriveStakerPoints[]
	): { chart: (number[] | BN[])[]; labels: string[] } {
		const labels: string[] = [];
		const avgSet: number[] = [];
		const idxSet: BN[] = [];
		let avgCount = 0;
		let total = 0;

		points.forEach(({ era, points }) => {
			total += points.toNumber();
			labels.push(era.toHuman());

			if (points.gtn(0)) {
				avgCount++;
			}

			avgSet.push(
				(avgCount ? Math.ceil((total * 100) / avgCount) : 0) / 100
			);
			idxSet.push(points);
		});

		return {
			chart: [idxSet, avgSet],
			labels,
		};
	}

	_extractStake(
		exposures: DeriveOwnExposure[]
	): { chart: number[][]; labels: string[] } {
		const labels: string[] = [];
		const cliSet: number[] = [];
		const expSet: number[] = [];
		const avgSet: number[] = [];
		let avgCount = 0;
		let total = 0;

		exposures.forEach(({ clipped, era, exposure }) => {
			const cli = this.balanceToNumber(clipped.total.unwrap());
			const exp = this.balanceToNumber(exposure.total.unwrap());

			total += cli;

			if (cli > 0) {
				avgCount++;
			}

			avgSet.push(
				(avgCount ? Math.ceil((total * 100) / avgCount) : 0) / 100
			);
			labels.push(era.toHuman());
			cliSet.push(cli);
			expSet.push(exp);
		});

		return {
			chart: [cliSet, expSet, avgSet],
			labels,
		};
	}
}
