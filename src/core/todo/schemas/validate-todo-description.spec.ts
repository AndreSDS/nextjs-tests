import { validateTodoDescription } from '@/core/todo/schemas/validate-todo-description'

describe('Todo Description Validation', () => {
    it("should return errors when description length has less than 3 characters", () => {
        const result = validateTodoDescription('123')
        expect(result).toStrictEqual({
            success: false,
            errors: ['Description must be at least 3 characters long.']
        })
    })

    it("should return errors when description length has more than 50 characters", () => {
        const result = validateTodoDescription("A luz do sol dourada ilumina a cidade, trazendo calor e vida a cada canto e recanto.");
        expect(result).toStrictEqual({
            success: false,
            errors: ['Description must be at most 50 characters long.']
        })
    })

    it("should return success when description length is valid", () => {
        const result = validateTodoDescription('12345678901234567890123456789')
        expect(result).toStrictEqual({
            success: true,
            errors: []
        })
    })
})