import * as createTodoUseCaseMod from '@/core/todo/useCases/create-todo.usecase';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';
import { createTodoAction } from './create-todo.action';
import { revalidatePath } from 'next/cache';

vi.mock('next/cache', () => {
    return {
        revalidatePath: vi.fn()
    }
})

const mockCreateTodoUseCase = () => {
    const todoMock = {
        id: 'id',
        description: 'description',
        createdAt: 'createdAt',
    }

    const failResult = {
        success: false,
        errors: ['description is required']
    } as InvalidTodo

    const successResult = {
        success: true, todo: todoMock
    } as ValidTodo

    const createTodoUseCaseSpy = vi.spyOn(createTodoUseCaseMod, 'createTodoUseCase').mockResolvedValue(successResult);

    const revalidatePathMocked = vi.mocked(revalidatePath);

    return {
        createTodoUseCaseSpy,
        todoMock,
        failResult,
        successResult,
        revalidatePathMocked
    }
}

describe('createAction (unit)', () => {
    it('should call createTodoUseCase with the correct values', async () => {
        const { createTodoUseCaseSpy, todoMock } = mockCreateTodoUseCase();
        const expetectedParam = todoMock.description;

        await createTodoAction(expetectedParam);

        expect(createTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(expetectedParam);
    });

    it('should calll revalidatePath if useCase return success', async () => {
        const { revalidatePathMocked, todoMock } = mockCreateTodoUseCase()
        const description = todoMock.description;

        await createTodoAction(description);

        expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
    });

    it('should return same value from useCase if succeeds', async () => {
        const { todoMock, successResult } = mockCreateTodoUseCase()

        const result = await createTodoAction(todoMock.description);

        expect(result).toStrictEqual(successResult);
    });

    it('should return same value from useCase if fails', async () => { 
        const { createTodoUseCaseSpy, failResult } = mockCreateTodoUseCase()

        createTodoUseCaseSpy.mockResolvedValueOnce(failResult);

        const result = await createTodoAction("");

        expect(result).toStrictEqual(failResult);
     });
})