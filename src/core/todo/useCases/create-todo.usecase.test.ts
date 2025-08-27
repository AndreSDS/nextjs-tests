import { makeTestTodoRepository } from "../__tests__/utils/make-test-todo-repository";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import { createTodoUseCase } from "./create-todo.usecase";

describe('createTodoUseCase (integration)', () => {
    beforeEach(async () => {
        const { deleteTodos } = await makeTestTodoRepository()
        await deleteTodos();
    })

    afterAll(async () => {
        const { deleteTodos } = await makeTestTodoRepository()
        await deleteTodos();
    })

    it('should return error if validation failed', async () => {
        const result = await createTodoUseCase('') as InvalidTodo;

        expect(result.success).toBe(false);
        expect(result.errors).toHaveLength(1);
    })

    it('should return a created todo if validation passed', async () => {
        const result = await createTodoUseCase('test') as ValidTodo;

        expect(result.success).toBe(true);
        expect(result.todo).toStrictEqual({
            id: expect.any(String),
            description: 'test',
            createdAt: expect.any(String),
        })
    })

    it('should return error if repository failed', async () => {
        await createTodoUseCase('test');
        const result = await createTodoUseCase('test') as InvalidTodo;

        expect(result.success).toBe(false);
        expect(result.errors).toStrictEqual([
            'Todo already exists'
        ])
    })
})