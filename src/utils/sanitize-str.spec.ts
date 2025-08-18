import { sanitizeStr } from '@/utils/sanitize-str'

const stringToSanitize = {
    stringCase: {
        str: ' Sanitized string ',
        expected: 'Sanitized string',
    },
    nonStringCase: {
        str: 123,
        expected: '',
    },
    normalizeCase: {
        str: 'e\u0301',
        expected: 'é',
    }
}

describe('sanitize-str (unit)', () => {
    it('should return an empty string if no parameter', () => {
        // @ts-expect-error - testando sem parametro
        expect(sanitizeStr()).toBe('')
    })

    it('should return an empty string if the input is not a string', () => {
        const sanitizedString = sanitizeStr(stringToSanitize.nonStringCase.str as any)
        expect(sanitizedString).toBe(stringToSanitize.nonStringCase.expected)
    })

    it('should return a sanitized string with trimmed spaces', () => {
        const sanitizedString = sanitizeStr(stringToSanitize.stringCase.str)
        expect(sanitizedString).toBe(stringToSanitize.stringCase.expected)
    })

    it("should return a sanitized string with normalized characters", () => {
        const sanitizedString = sanitizeStr(stringToSanitize.normalizeCase.str)
        expect(sanitizedString).toBe(stringToSanitize.normalizeCase.expected)
    })
})