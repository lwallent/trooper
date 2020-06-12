import { IMiddleware, Middleware, Next, Request, Response } from '@tsed/common';
import * as Express from 'express';
import * as ExpressJwt from 'express-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '../../services/core/ConfigService';
import { AuthService } from '../../services/security/AuthService';

export const LOCALS_TOKEN = 'token';
export const LOCALS_JWT = 'jwt';

export interface IJwtToken {
    sub?: string;
    iss: string;
    roles: string[];        // More of a users thing --> move to db, assign locally
}

/**
 * This middleware handles the pure presence of a JWT token. The resulting payload is injected
 * into the Express Response Locals object as 'token'
 *
 * When and if this middleware is passed successfully a validated token is present
 *
 * No Authorization (roles) is done in this middleware.
 *
 * @middleware
 */
@Middleware()
export class JWTMiddleware implements IMiddleware {

    private auth0RsaCallback: ExpressJwt.SecretCallbackLong;

    private fromTokenToUser: ExpressJwt.RequestHandler;

    constructor(
        private config: ConfigService,
        private auth: AuthService) {

        this.auth0RsaCallback = this.createRSAcallback(this.config.trooper.keysUrl);
        this.fromTokenToUser  = this.createTokenToUserMethod();
    }

    public async use(   @Request()     request: Express.Request,
                        @Response()    response: Express.Response,
                        @Next()        next: Express.NextFunction) {

        this.fromTokenToUser(request, response, (err) => {
            if (err) { // in case of error pass that on
                return next(err);
            }

            // It is now save to extract the jwt itself
            // and add it to locals for easy access further
            // downstream
            response.locals[LOCALS_JWT] = this.extractJWT(request);

            // express jwt adds a user to the request
            const token = request['user'];

            // Response Locals is the official Express documented place
            // for local variables scoped to the request, and therefore
            // available only during that request/response cycle.
            response.locals.token = token;
            next();
         });
    }

    private createTokenToUserMethod() {
        const secretCallback = (req, header, payload, done): void => {

            // just forward to the rsa callback
            return this.auth0RsaCallback(req, header, payload, done);
        };

        return ExpressJwt({
            secret: secretCallback as any,
            audience: [this.config.trooper.audience ],
            algorithms: [ 'RS256', 'HS256'],
        });
    }

    private createRSAcallback(keysUrl: string) {
        return jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: keysUrl,
        });
    }

    /**
     * This method assumes that the token has been verified
     * already and just extract the JWT
     */
    private extractJWT(request: Express.Request): string {
        const {headers} = request;
        const {authorization} = headers;

        const [/* bearer */, token] = authorization.toString().split(' ');

        return token;
    }
}
