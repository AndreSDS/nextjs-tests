import { defaultTodoRepository } from "../repositories/default.repository";

export async function deleteTodoUseCase(id: string) {
    const todoToDelete = await defaultTodoRepository.remove(id)

    if (!todoToDelete.success) {
        return {
            success: false,
            errors: ['Todo do not exists']
        }
    }

    return todoToDelete;
};