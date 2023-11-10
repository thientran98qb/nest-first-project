import { DataSource } from "typeorm";
import { EnvService } from "../config/env/env.service";

export const databaseProviders = [
    {
        provide: 'DATA_SOURCE',
        useFactory: async (envService: EnvService) => {
            const dataSource = new DataSource({
              type: envService.read().DB_TYPE,
              host: envService.read().DB_HOST,
              port: envService.read().DB_PORT,
              username: envService.read().DB_USER,
              password: envService.read().DB_PASSWORD,
              database: envService.read().DB_NAME,
              entities: [
                __dirname + '/../**/entities/*.entity{.ts,.js}',
              ],
              migrations: ['database/migrations/*.ts'],
              synchronize: true,
            });
      
            return dataSource.initialize();
        },
        inject: [EnvService]
    }
]
