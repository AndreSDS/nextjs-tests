'use server'

import { revalidatePath } from "next/cache";
import { deleteTodoUseCase } from "../useCases/delete-todo.usecase";

export async function deleteTodoAction(id: string) {
    const deleteTodoResult = await deleteTodoUseCase(id);

    if (deleteTodoResult.success) {
        revalidatePath("/");
    }

    return deleteTodoResult;
}