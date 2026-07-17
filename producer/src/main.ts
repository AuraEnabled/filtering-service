import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'users',
        protoPath: join(__dirname, '../../proto/users.proto'),
        url: process.env.GRPC_URL ?? '0.0.0.0:50051',
      },
    },
  );
  await app.listen();
  console.log('Producer gRPC service is listening on 0.0.0.0:50051');
}
void bootstrap();
