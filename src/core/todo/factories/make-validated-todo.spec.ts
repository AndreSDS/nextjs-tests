import * as sanitizeStrMod from "@/utils/sanitize-str";
import { makeValidatedTodo } from "./make-validated-todo";

const description = "abcdes"
const sanitizeStrSpy = vi.spyOn(sanitizeStrMod, "sanitizeStr")

describe("makeValidatedTodo (unit)", () => {
    it("should call sanitizeStr with a correct vlaue", () => {
        sanitizeStrSpy.mockReturnValue(description)

        makeValidatedTodo(description)

        expect(sanitizeStrSpy).toHaveBeenCalledTimes(1)
        expect(sanitizeStrSpy).toHaveBeenCalledWith(description)
    })

    it("should call validateTodoDescription with sanitized return value", () => {

    })

    it("should call makeNewTodo if validateTodoDescription returned success", () => { })

    it("should retornar validateDescription.error if validation failed", () => { })
})