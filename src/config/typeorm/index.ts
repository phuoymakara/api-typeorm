import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  private logger = new Logger(TypeOrmService.name);
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: +this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
      synchronize: true,
      //autoLoadEntities: true,
      keepConnectionAlive: true,
      logging: true,
    };
  }
}
