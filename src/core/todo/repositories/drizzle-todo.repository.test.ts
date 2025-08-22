import { makeTestTodoRepository } from "../__tests__/utils/make-test-todo-repository"

describe("DrizzleRepository (integration)", () => {
    beforeEach(async () => {
        const { deleteTodos } = await makeTestTodoRepository()
        await deleteTodos();
    })

    afterAll(async () => {
        const { deleteTodos } = await makeTestTodoRepository()
        await deleteTodos();
    })

    describe('findAll', () => {
        it('should return an empty array when no todos are found', async () => {
            const { todoTestRepository } = await makeTestTodoRepository()
            const todos = await todoTestRepository.findAll();
            expect(todos).toStrictEqual([]);
        })

        it('should return an array ordered by descending when todos are found', async () => {
            const { todoTestRepository, insertTodo, newTodos } = await makeTestTodoRepository()

            insertTodo(newTodos[0]);
            insertTodo(newTodos[1]);

            const todos = await todoTestRepository.findAll();
            expect(todos[0].description).toBe(newTodos[1].description);
            expect(todos[1].description).toBe(newTodos[0].description);
            expect(todos[0].createdAt).toBe(newTodos[1].createdAt);
            expect(todos[1].createdAt).toBe(newTodos[0].createdAt);
        })
    })

    describe('create', () => {
        it('should create a new todo item if the data is valid', async () => {
            const { todoTestRepository, newTodos } = await makeTestTodoRepository()
            const result = await todoTestRepository.create(newTodos[0]);
            expect(result).toStrictEqual({
                success: true,
                todo: newTodos[0]
            })
        })

        it('should return an error if there is same description or id', async () => {
            const { todoTestRepository, insertTodo, newTodos } = await makeTestTodoRepository()
            insertTodo(newTodos[0]);

            const result = await todoTestRepository.create(newTodos[0]);

            expect(result).toStrictEqual({
                success: false,
                errors: ['Todo already exists']
            })
        })
    })

    describe('delete', () => {
        it('should delete the todo item if it exists', async () => {
            const { todoTestRepository, insertTodo, newTodos } = await makeTestTodoRepository()
            insertTodo(newTodos[0]);

            const result = await todoTestRepository.remove(newTodos[0].id);

            expect(result).toStrictEqual({
                success: true,
                todo: newTodos[0]
            })
        })

        it('should return an error if the todo item does not exist', async () => {
            const { todoTestRepository, newTodos } = await makeTestTodoRepository()

            const result = await todoTestRepository.remove(newTodos[0].id);

            expect(result).toStrictEqual({
                success: false,
                errors: ['Todo do not exists']
            })
        })
    })
})