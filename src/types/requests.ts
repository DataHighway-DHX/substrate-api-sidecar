import { RequestHandler } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';

/**
 * Body for RequestHandlerTx. In other words, the body of a POST route that sends an encoded transaction.
 */
export interface ITx {
	tx: string;
}

export interface ITxHardwareConfig {
	hardware_mining_rates_id: string;
	hardware_hardware_secure: string;
	hardware_hardware_insecure: string;
	hardware_max_hardware: string
}

/**
 * Post Request - assuming no url params
 */
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
export type IPostRequestHandler<T> = RequestHandler<{}, any, T, Query>;

export interface INumberParam extends ParamsDictionary {
	number: string;
}

export interface IAddressParam extends ParamsDictionary {
	address: string;
}

export interface IAddressNumberParams extends IAddressParam {
	number: string;
}
