import { defaultTodoRepository } from "../repositories/default.repository";

export async function deleteTodoUseCase(id: string) {
    const todoToDelete = await defaultTodoRepository.remove(id)

    if (!todoToDelete) {
        return {
            success: false,
            errors: ['Todo not found']
        }
    }

    return todoToDelete;
};