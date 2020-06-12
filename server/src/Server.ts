import * as env from 'dotenv';
env.config();
import {Configuration, GlobalAcceptMimesMiddleware, Inject, PlatformApplication} from '@tsed/common';
import '@tsed/swagger';
import '@tsed/platform-express';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as methodOverride from 'method-override';
import {join} from 'path';

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ['application/json'],
  httpPort: process.env.PORT || 8083,
  httpsPort: false, // CHANGE
  logger: {
    debug: true,
    logRequest: true,
    requestFields: ['reqId', 'method', 'url', 'headers', 'query', 'params', 'duration']
  },
  mongoose: [
    {
      id: 'default',
      url: process.env.mongoose_url || 'mongodb://127.0.0.1:27017/default',
      connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    }
  ],
  mount: {
    '/rest': [
      `${rootDir}/controllers/**/*.ts`
    ]
  },
  componentsScan: [
    '${rootDir}/mvc/**/*.ts',
    '${rootDir}/services/**/*.ts',
    '${rootDir}/middlewares/**/*.ts',
    '${rootDir}/converters/**/*.ts'
  ],
  swagger: [
    {
      path: '/api-docs',
      spec: {
        securityDefinitions: {
          Token: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        }
      }
    }
  ],
  calendar: {
    token: true
  },
  statics: {
    '/statics': join(__dirname, '..', 'statics')
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(cors())
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }
}
