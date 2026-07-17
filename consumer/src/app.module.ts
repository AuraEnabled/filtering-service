import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USERS_PACKAGE } from './constants';
import { UserClientService } from './user-client.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_PACKAGE,
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '../../proto/users.proto'),
          url: process.env.PRODUCER_GRPC_URL ?? 'localhost:50051',
        },
      },
    ]),
  ],
  providers: [UserClientService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly userClientService: UserClientService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.userClientService.fetchAndLogFilteredUsers();
  }
}
