import { makeValidatedTodo } from "../factories/make-validated-todo";
import { defaultTodoRepository } from "../repositories/default.repository";

export async function createTodoUseCase(description: string) {
    const validatedResult = makeValidatedTodo(description);

    if (!validatedResult.success) {
        return validatedResult;
    }

    const createResult = await defaultTodoRepository.create(validatedResult.todo);

    return createResult;
}