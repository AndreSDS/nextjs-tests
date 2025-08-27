import { deleteTodoAction } from './delete-todo.action';
import { makeTestTodoMocks } from '@/utils/make-test-todo-mocks';

vi.mock('next/cache', () => {
    return {
        revalidatePath: vi.fn()
    }
})

describe('deleteTOdoAction (unit)', () => {
    it('should call deleteTodoUseCase with the correct values', async () => {
        const { useCaseSpy, todoMock } = makeTestTodoMocks('delete');
        const expetectedParam = todoMock.id;

        await deleteTodoAction(expetectedParam);

        expect(useCaseSpy).toHaveBeenCalledExactlyOnceWith(expetectedParam);
    });

    it('should calll revalidatePath if useCase return success', async () => {
        const { revalidatePathMocked, todoMock } = makeTestTodoMocks('delete')
        const todoId = todoMock.id;

        await deleteTodoAction(todoId);

        expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
    });

    it('should return same value from useCase if succeeds', async () => {
        const { todoMock, successResult } = makeTestTodoMocks('delete')

        const result = await deleteTodoAction(todoMock.id);

        expect(result).toStrictEqual(successResult);
    });

    it('should return same value from useCase if fails', async () => {
        const { useCaseSpy, failResult } = makeTestTodoMocks('delete')

        useCaseSpy.mockResolvedValueOnce(failResult);

        const result = await deleteTodoAction("");

        expect(result).toStrictEqual(failResult);
    });
})