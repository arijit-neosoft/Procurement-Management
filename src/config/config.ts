import env from 'env-var';

export const config = {
  app: {
    APP_ENV: env.get('APP_ENV').required().asString(),
    APP_HOST: env.get('APP_HOST').required().asString(),
    APP_PORT: env.get('APP_PORT').required().asPortNumber(),
  },

  mongodb: {
    MONGO_INITDB_ROOT_USERNAME: env.get('MONGO_INITDB_ROOT_USERNAME').required().asString(),
    MONGO_INITDB_ROOT_PASSWORD: env.get('MONGO_INITDB_ROOT_PASSWORD').required().asString(),
    MONGODB_URI: env.get('MONGODB_URI').required().asString(),
  }
};