import { sanitizeStr } from "@/utils/sanitize-str";
import { defaultTodoRepository } from "../repositories/default.repository";

export async function deleteTodoUseCase(id: string) {
    const cleanId = sanitizeStr(id);

    if(!cleanId) {
        return {
            success: false,
            errors: ['Invalid id']
        }
    }

    const todoToDelete = await defaultTodoRepository.remove(id)
    return todoToDelete;
};