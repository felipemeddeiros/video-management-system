import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {CategoryModel} from "@core/category/infra/db/sequelize/category.model";
import {CategoriesModule} from "../categories/categories.module";

const models = [CategoryModel];

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'sqlite' as any,
            host: ':memory:',
            logging: false,
            models: [...models]
        })
    ]
})
export class DatabaseModule {}
