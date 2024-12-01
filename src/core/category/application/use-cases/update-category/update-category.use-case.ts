import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { EntityValidationError } from '../../../../shared/domain/validators/validation.error';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
    CategoryOutput,
    CategoryOutputMapper,
} from '../common/category-output';
import { UpdateCategoryInput } from './update-category.input';
import {Category} from "../../../domain/category.entity";
import {Uuid} from "../../../../shared/domain/value-objects/uuid.vo";

export class UpdateCategoryUseCase
    implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
    constructor(private categoryRepo: ICategoryRepository) {}

    async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
        const categoryId = new Uuid(input.id);
        const category = await this.categoryRepo.findById(categoryId);

        if (!category) {
            throw new NotFoundError(input.id, Category);
        }

        input.name && category.changeName(input.name);

        if (input.description !== undefined) {
            category.changeDescription(input.description);
        }

        if (input.is_active === true) {
            category.activate();
        }

        if (input.is_active === false) {
            category.deactivate();
        }

        if (category.notification.hasErrors()) {
            throw new EntityValidationError(category.notification.toJSON());
        }

        await this.categoryRepo.update(category);

        return CategoryOutputMapper.toOutput(category);
    }
}

export type UpdateCategoryOutput = CategoryOutput;