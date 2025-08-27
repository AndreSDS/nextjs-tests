import { makeTestTodoRepository } from "../__tests__/utils/make-test-todo-repository";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";
import { createTodoUseCase } from "./create-todo.usecase";
import { deleteTodoUseCase } from "./delete-todo.usecase";

describe('deleteTodoUseCase (integration)', () => {
    beforeEach(async () => {
        const { deleteTodos } = await makeTestTodoRepository()
        await deleteTodos();
    })

    afterAll(async () => {
        const { deleteTodos } = await makeTestTodoRepository()
        await deleteTodos();
    })

    it('should return error if id is invalid', async () => {
        const result = await deleteTodoUseCase("") as InvalidTodo;

        expect(result.success).toBe(false);
        expect(result).toStrictEqual({
            success: false,
            errors: ['Invalid id']
        });
    })

    it('should return a todo after delete', async () => {
        const { todo } = await createTodoUseCase('test') as ValidTodo;

        const result = await deleteTodoUseCase(todo.id) as ValidTodo;
        expect(result.todo).toStrictEqual(todo)
    })

    it('should return error if repository failed', async () => {
        const { todo } = await createTodoUseCase('test') as ValidTodo;

        await deleteTodoUseCase(todo.id);

        const result = await deleteTodoUseCase(todo.id) as InvalidTodo;

        expect(result.success).toBe(false);
        expect(result).toStrictEqual({
            success: false,
            errors: ['Todo do not exists']
        })
    })
})