import * as deleteTodoUseCaseMod from '@/core/todo/useCases/delete-todo.usecase';
import { InvalidTodo, ValidTodo } from '../schemas/todo.contract';
import { deleteTodoAction } from './delete-todo.action';
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
        errors: ['Todo do not exists']
    } as InvalidTodo

    const successResult = {
        success: true, todo: todoMock
    } as ValidTodo

    const deleteTodoUseCaseSpy = vi.spyOn(deleteTodoUseCaseMod, 'deleteTodoUseCase').mockResolvedValue(successResult);

    const revalidatePathMocked = vi.mocked(revalidatePath);

    return {
        deleteTodoUseCaseSpy,
        todoMock,
        failResult,
        successResult,
        revalidatePathMocked
    }
}

describe('deleteTOdoAction (unit)', () => {
    it('should call deleteTodoUseCase with the correct values', async () => {
        const { deleteTodoUseCaseSpy, todoMock } = mockCreateTodoUseCase();
        const expetectedParam = todoMock.id;

        await deleteTodoAction(expetectedParam);

        expect(deleteTodoUseCaseSpy).toHaveBeenCalledExactlyOnceWith(expetectedParam);
    });

    it('should calll revalidatePath if useCase return success', async () => {
        const { revalidatePathMocked, todoMock } = mockCreateTodoUseCase()
        const todoId = todoMock.id;

        await deleteTodoAction(todoId);

        expect(revalidatePathMocked).toHaveBeenCalledExactlyOnceWith('/');
    });

    it('should return same value from useCase if succeeds', async () => {
        const { todoMock, successResult } = mockCreateTodoUseCase()

        const result = await deleteTodoAction(todoMock.id);

        expect(result).toStrictEqual(successResult);
    });

    it('should return same value from useCase if fails', async () => {
        const { deleteTodoUseCaseSpy, failResult } = mockCreateTodoUseCase()

        deleteTodoUseCaseSpy.mockResolvedValueOnce(failResult);

        const result = await deleteTodoAction("");

        expect(result).toStrictEqual(failResult);
    });
})