import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
    CategoryOutput,
    CategoryOutputMapper,
} from '../common/category-output';
import {Category} from "../../../domain/category.entity";
import {Uuid} from "../../../../shared/domain/value-objects/uuid.vo";

export class GetCategoryUseCase
    implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
    constructor(private categoryRepo: ICategoryRepository) {}

    async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
        const categoryId = new Uuid(input.id);
        const category = await this.categoryRepo.findById(categoryId);
        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        return CategoryOutputMapper.toOutput(category);
    }
}

export type GetCategoryInput = {
    id: string;
};

export type GetCategoryOutput = CategoryOutput;