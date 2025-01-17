import * as dotenv from 'dotenv';

export interface EnvironmentVariables {
  PORT: number;
  DATABASE_URL: string;
}

dotenv.config();

export const environment: EnvironmentVariables = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  DATABASE_URL: process.env.DATABASE_URL || '',
};
