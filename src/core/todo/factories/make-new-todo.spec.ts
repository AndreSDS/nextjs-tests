import { makeNewTodo } from "@/core/todo/factories/make-new-todo";

describe("makeNewTodo (unit)", () => {
    it("should return a new valid todo", () => {
        const expectedTodo = {
            id: expect.any(String),
            description: "Create a new todo",
            createdAt: expect.any(String),
        }

        const todo = makeNewTodo("Create a new todo");

        expect(todo.description).toStrictEqual(expectedTodo.description)
    
        expect(todo).toStrictEqual(expectedTodo)
    })
})