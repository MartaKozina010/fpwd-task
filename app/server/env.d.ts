declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
      POSTGRES_PRISMA_URL: string;
      POSTGRES_URL_NON_POOLING: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
    }
  }
}

export {};
