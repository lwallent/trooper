import { UseAuth } from '@tsed/common';
import { applyDecorators } from '@tsed/core';
import { JWTMiddleware } from '../middlewares/security/JWTMiddleware';
import { Operation, Responses } from '@tsed/swagger';

export function JWT(): Function {
    return applyDecorators(
        UseAuth(JWTMiddleware),
        Operation({
          "parameters": [
            {
              "in": "header",
              "name": "Authorization",
              "type": "string",
              "required": true
            }
          ]
        }),
        Responses(401, {description: "Unauthorized"}),
        Responses(403, {description: "Forbidden"})
    );
}
