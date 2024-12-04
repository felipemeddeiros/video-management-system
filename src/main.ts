import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ClassSerializerInterceptor, HttpStatus, ValidationPipe} from "@nestjs/common";
import {WrapperDataInterceptor} from "./nest-modules/shared-module/interceptors/wrapper-data/wrapper-data.interceptor";
import {NotFoundFilter} from "./nest-modules/shared-module/filters/not-found.filter";
import {EntityValidationFilter} from "./nest-modules/shared-module/filters/entity-validation.filter";
import {applyGlobalConfig} from "./nest-modules/global-config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  applyGlobalConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
