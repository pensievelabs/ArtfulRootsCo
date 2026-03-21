import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

// For Vercel deployment, we need to export the app if we're using a specific adapter, 
// but standard NestJS can also run as a long-lived process if the platform supports it.
// Vercel's legacy "Serverless Functions" require an export.
// However, the modern way with @vercel/node is to just run the listeners.

if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}

export default async (req: any, res: any) => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
};
