import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import {CategoriesModule} from "./categories.module";
import {DatabaseModule} from "../database-modules/database.module";
import {ConfigModule} from "../config-modules/config.module";
import {join} from "path";

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        CategoriesModule,
      ]
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});