import { parse } from 'pg-connection-string';
import { env } from 'process';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();
const config = parse(env.POSTGRES_URL);

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  port: +config.port,
  username: config.user,
  password: config.password,
  database: config.database,
  host: config.host,
  ssl: true,
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration_table',
};

const dataSource = new DataSource(databaseConfig);
export default dataSource;
