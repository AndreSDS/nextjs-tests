'use server'

import { revalidatePath } from "next/cache";
import { createTodoUseCase } from "../useCases/create-todo.usecase";

export async function createTodoAction(description: string) {
    const createTodoResult = await createTodoUseCase(description)

    if (createTodoResult.success) {
        revalidatePath("/");
    }

    return createTodoResult;
}