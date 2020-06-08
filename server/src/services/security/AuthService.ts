import { Service } from '@tsed/common';
import * as jwt from 'jsonwebtoken';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '../core/ConfigService';

@Service()
export class AuthService {


    constructor(private config: ConfigService) {}


    public decode(token) {
        return jwt.decode(token, { complete: true }) ;
    }

    public verify(token: string, key: any, options?: jwt.VerifyOptions): Promise<object> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, key, options, (err, decoded: object) => {
                if (err) {
                    reject(err);
                }
                resolve(decoded);
            });
        });
    }

    public createRSAclient(keysUrl: string): jwksRsa.JwksClient {
        return jwksRsa({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 10, // Default value
            jwksUri: keysUrl,
          });
    }
}
