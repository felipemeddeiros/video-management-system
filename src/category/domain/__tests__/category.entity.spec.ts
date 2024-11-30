import {Category} from "../category.entity";
import {Uuid} from "../../../shared/domain/value-objects/uuid.vo";

describe('Category Unit Tests', () => {
    let validateSpy: any;
    beforeEach(() => {
        validateSpy = jest.spyOn(Category, "validate");
    })
    describe('constructor', () => {
        test('should create category with default values', () => {
            const category = new Category({
                name: 'Movie'
            });
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toEqual('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        });

        test('should create category with defined values', () => {
            const created_at = new Date();
            const category = new Category({
                name: 'Movie',
                description: 'Movie description',
                is_active: false,
                created_at
            });
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toEqual('Movie');
            expect(category.description).toEqual('Movie description');
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(created_at);
        });

        test('should create category with name and description', () => {
            const category = new Category({
                name: 'Movie',
                description: 'Movie description',
            });
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toEqual('Movie');
            expect(category.description).toEqual('Movie description');
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        })
    })

    describe('create command', () => {
        test('should create a category', () => {
            const category = Category.create({
                name: 'Movie',
            });
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toEqual('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })

        test('should create a category with description', () => {
            const category = Category.create({
                name: 'Movie',
                description: 'Movie description',
            });
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toEqual('Movie');
            expect(category.description).toEqual('Movie description');
            expect(category.is_active).toBe(true);
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })

        test('should create a category with is_active', () => {
            const category = Category.create({
                name: 'Movie',
                is_active: false,
            });
            expect(category.category_id).toBeInstanceOf(Uuid)
            expect(category.name).toEqual('Movie');
            expect(category.description).toBeNull();
            expect(category.is_active).toBe(false);
            expect(category.created_at).toBeInstanceOf(Date);
            expect(validateSpy).toHaveBeenCalledTimes(1);
        })
    })

    describe("category_id field", () => {
        const arrange = [
            { category_id: null },
            { category_id: undefined },
            { category_id: new Uuid() },
        ];
        test.each(arrange)("id = %j", ({ category_id }) => {
            const category = new Category({
                name: 'Movie',
                category_id: category_id as any,
            });
            expect(category.category_id).toBeInstanceOf(Uuid);
            if(category_id instanceof Uuid) {
                expect(category.category_id).toBe(category_id);
            }
        });
    })

    test('should change name', () => {
        const category = Category.create({
            name: 'Movie'
        });
        category.changeName('other name');
        expect(category.name).toEqual('other name');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should change description', () => {
        const category = Category.create({
            name: 'Movie'
        });
        category.changeDescription('some description');
        expect(category.description).toEqual('some description');
        expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test('should active category', () => {
        const category = Category.create({
            name: 'Movie',
            is_active: false,
        });
        category.activate();
        expect(category.is_active).toBe(true);
    });

    test('should deactivate category', () => {
        const category = Category.create({
            name: 'Movie',
        });
        category.deactivate();
        expect(category.is_active).toBe(false);
    });
});

describe('Category Validator', () => {
    describe('create command', () => {
        test('should inform a valid name for category', () => {
            expect(() => Category.create({ name: null })).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ]
            })

            expect(() => Category.create({ name: '' })).containsErrorMessages({
                name: [
                    "name should not be empty",
                ]
            })

            expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ]
            })

            expect(() => Category.create({ name: "t".repeat(256) })).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            })
        })

        test('should inform a valid description for category', () => {
            expect(() => Category.create({ description: 5 } as any)).containsErrorMessages({
                description: [
                    "description must be a string",
                ]
            })
        })

        test('should a invalid category using is_active property', () => {
            expect(() => Category.create({ is_active: 5 } as any)).containsErrorMessages({
                is_active: [
                    "is_active must be a boolean value",
                ]
            })
        })

        test('should inform a valid name when change category name', () => {
            const category = Category.create({name: 'Movie'});
            expect(() => category.changeName(null)).containsErrorMessages({
                name: [
                    "name should not be empty",
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ]
            })

            expect(() => category.changeName('')).containsErrorMessages({
                name: [
                    "name should not be empty",
                ]
            })

            expect(() => category.changeName( 5 as any )).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ]
            })

            expect(() => category.changeName( "t".repeat(256) )).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            })
        })

        test('should inform a valid description when change category description', () => {
            const category = Category.create({name: 'Movie', description: 'Movie description'});
            expect(() => category.changeDescription( 5 as any )).containsErrorMessages({
                description: [
                    "description must be a string",
                ]
            })
        })
    })
});