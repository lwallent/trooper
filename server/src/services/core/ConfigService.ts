import { Service, $log } from '@tsed/common';
import { Env } from '@tsed/core';

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

$log.info('Config Environment: ', env);


export const IS_PRODUCTION = env === Env.PROD;

//#region INTERFACES

export interface IAuth0Environment {
    domain: string;
    keysUrl: string;
    tokenUrl: string;
    audience: string;
}

//#endregion

@Service()
export class ConfigService {

    get trooper(): IAuth0Environment {
        return {
            domain: process.env.AUTH0_DOMAIN,
            keysUrl: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            tokenUrl: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
            audience: process.env.AUTH0_AUDIENCE,
        };
    }
}
