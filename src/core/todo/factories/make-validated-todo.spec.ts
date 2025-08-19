import * as sanitizeStrMod from "@/utils/sanitize-str";
import * as validationTodoDescriptionMod from "@/core/todo/schemas/validate-todo-description";
import * as makeNewTodoMod from "@/core/todo/factories/make-new-todo";
import { InvalidTodo, makeValidatedTodo, ValidTodo } from "./make-validated-todo";
import { Todo } from "../schemas/todo.contract";
import { randomUUID } from "crypto";

function makeMocks(description: string) {
    const errors = ["Invalid todo description"]

    const todo: Todo = {
        id: randomUUID(),
        description: description,
        createdAt: new Date().toISOString()
    }
    const sanitizeStrSpy = vi.spyOn(sanitizeStrMod, "sanitizeStr").mockReturnValue(description)
    const validateTodoDescriptionSpy = vi.spyOn(validationTodoDescriptionMod, "validateTodoDescription").mockReturnValue({
        success: true,
        errors: []
    })
    const makeNewTodoSpy = vi.spyOn(makeNewTodoMod, "makeNewTodo").mockReturnValue(todo)

    return {
        errors,
        todo,
        description,
        sanitizeStrSpy,
        validateTodoDescriptionSpy,
        makeNewTodoSpy
    }
}

describe("makeValidatedTodo (unit)", () => {
    it("should call sanitizeStr with a correct vlaue", () => {
        const { sanitizeStrSpy, description } = makeMocks("abcded")

        makeValidatedTodo(description)

        expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description)
    })

    it("should call validateTodoDescription with sanitized return value", () => {
        const { sanitizeStrSpy, validateTodoDescriptionSpy } = makeMocks("abcded")
        
        const sanitizedReturn = "novo retorno"
        sanitizeStrSpy.mockReturnValue(sanitizedReturn)

        makeValidatedTodo(sanitizedReturn)

        expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(sanitizedReturn)
    })

    it("should call makeNewTodo if validateTodoDescription returned success", () => {
        const { description, todo } = makeMocks("Novo todo")

        const result = makeValidatedTodo(description) as ValidTodo

        expect(result.success).toBe(true)
        expect(result.data.id).toBe(todo.id)
        expect(result.data.description).toBe(todo.description)
        expect(result.data.createdAt).toStrictEqual(todo.createdAt)
    })

    it("should retornar validateDescription.error if validation failed", () => {
        const { description, validateTodoDescriptionSpy, errors } = makeMocks(123 as any)
        validateTodoDescriptionSpy.mockReturnValue({
            success: false,
            errors,
        })

        const result = makeValidatedTodo(description) as InvalidTodo

        expect(result.success).toBe(false)
        expect(result.errors).toStrictEqual(errors)
    })
})