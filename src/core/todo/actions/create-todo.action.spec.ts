import { makeTestTodoMocks } from '@/utils/make-test-todo-mocks';
import { createTodoAction } from './create-todo.action';

vi.mock('next/cache', () => {
    return {
        revalidatePath: vi.fn()
    }
})

describe('createAction (unit)', () => {
    it('should call createTodoUseCase with the correct values', async () => {
        const { useCaseSpy, todoMock } = makeTestTodoMocks('create');
        const expetectedParam = todoMock.description;

        await createTodoAction(expetectedParam);

        expect(useCaseSpy).toHaveBeenCalledExactlyOnceWith(expetectedParam);
    });

    it('should calll revalidatePath if useCase return success', async () => {
        const { revalidatePathMocked, todoMock } = makeTestTodoMocks('create');
        const description = todoMock.description;

        await createTodoAction(description);

        expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
    });

    it('should return same value from useCase if succeeds', async () => {
        const { todoMock, successResult } = makeTestTodoMocks('create');

        const result = await createTodoAction(todoMock.description);

        expect(result).toStrictEqual(successResult);
    });

    it('should return same value from useCase if fails', async () => {
        const { useCaseSpy, failResult } = makeTestTodoMocks('create');

        useCaseSpy.mockResolvedValueOnce(failResult);

        const result = await createTodoAction("");

        expect(result).toStrictEqual(failResult);
    });
})