import { sanitizeStr } from "@/utils/sanitize-str";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewTodo } from "./make-new-todo";
import { Todo } from "../schemas/todo.contract";

type InvalidTodo = {
    success: false;
    errors: string[];
}

type ValidTodo = {
    success: true;
    data: Todo;
}

type MakeValidTodo = ValidTodo | InvalidTodo;

export function makeValidatedTodo(description: string): MakeValidTodo {
    const sanitizedDescription = sanitizeStr(description)
    const validateDescription = validateTodoDescription(sanitizedDescription)

    if (validateDescription.success) {
        return {
            success: true,
            data: makeNewTodo(sanitizedDescription)
        }
    }

    return {
        success: false,
        errors: validateDescription.errors
    }
}