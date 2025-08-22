import { sanitizeStr } from "@/utils/sanitize-str";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";
import { TodoPresenter } from "../schemas/todo.contract";

export function makeValidatedTodo(description: string): TodoPresenter {
    const sanitizedDescription = sanitizeStr(description)
    const validateDescription = validateTodoDescription(sanitizedDescription)

    if (validateDescription.success) {
        return {
            success: true,
            todo: makeNewTodo(sanitizedDescription)
        }
    }

    return {
        success: false,
        errors: validateDescription.errors
    }
}