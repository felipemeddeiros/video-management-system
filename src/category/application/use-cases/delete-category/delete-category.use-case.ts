import { IUseCase } from '../../../../shared/application/use-case.interface';
import { ICategoryRepository } from '../../../domain/category.repository';
import {Uuid} from "../../../../shared/domain/value-objects/uuid.vo";

export class DeleteCategoryUseCase
    implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
    constructor(private categoryRepo: ICategoryRepository) {}

    async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
        const categoryId = new Uuid(input.id);
        await this.categoryRepo.delete(categoryId);
    }
}

export type DeleteCategoryInput = {
    id: string;
};

type DeleteCategoryOutput = void;
