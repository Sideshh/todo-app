import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigs } from './common/configs';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseConfigs],
      useFactory: (databaseConfigs: DatabaseConfigs) => ({
        type: 'postgres',
        host: databaseConfigs.host,
        port: Number(databaseConfigs.port),
        username: databaseConfigs.username,
        password: databaseConfigs.password,
        database: databaseConfigs.name,
        synchronize: databaseConfigs.synchronize === 'true',
        autoLoadEntities: true,
        ...(databaseConfigs.ssl && {
          ssl: {
            rejectUnauthorized: false,
          },
        }),
      }),
      extraProviders: [DatabaseConfigs],
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
