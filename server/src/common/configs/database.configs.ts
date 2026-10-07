import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigs {
  constructor(private readonly configService: ConfigService) {}

  get host(): string {
    return this.configService.getOrThrow<string>('DATABASE_HOST');
  }

  get port(): string {
    return this.configService.getOrThrow<string>('DATABASE_PORT');
  }

  get username(): string {
    return this.configService.getOrThrow<string>('DATABASE_USERNAME');
  }

  get password(): string {
    return this.configService.getOrThrow<string>('DATABASE_PASSWORD');
  }

  get name(): string {
    return this.configService.getOrThrow<string>('DATABASE_NAME');
  }

  get synchronize(): string {
    return this.configService.getOrThrow<string>('DATABASE_SYNCHRONIZE');
  }

  get ssl(): boolean {
    return this.configService.get<string>('DATABASE_SSL') === 'true';
  }
}
