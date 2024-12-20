import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [/^(http:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?$/], // Allows localhost, 127.0.0.1, and bugxplore with any port
    credentials: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Bugxplore-Dev-7623486',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
