import { revalidatePath } from "next/cache"
import { InvalidTodo, ValidTodo } from "@/core/todo/schemas/todo.contract"
import * as createTodoUseCaseMod from '@/core/todo/useCases/create-todo.usecase';
import * as deleteTodoUseCaseMod from '@/core/todo/useCases/delete-todo.usecase';

export const makeTestTodoMocks = (useCase: 'create' | 'delete') => {
    const todoMock = {
        id: 'id',
        description: 'description',
        createdAt: 'createdAt',
    }

    const successResult = {
        success: true, todo: todoMock
    } as ValidTodo

    const revalidatePathMocked = vi.mocked(revalidatePath);

    let failResult: InvalidTodo;
    let useCaseSpy;

    if (useCase === 'create') {
        failResult = { success: false, errors: ['description is required'] } as InvalidTodo;
        useCaseSpy = vi.spyOn(createTodoUseCaseMod, 'createTodoUseCase').mockResolvedValue(successResult);
    } else { // useCase === 'delete'
        failResult = { success: false, errors: ['Todo do not exists'] } as InvalidTodo;
        useCaseSpy = vi.spyOn(deleteTodoUseCaseMod, 'deleteTodoUseCase').mockResolvedValue(successResult);
    }

    return {
        useCaseSpy,
        todoMock,
        failResult,
        successResult,
        revalidatePathMocked
    }
}