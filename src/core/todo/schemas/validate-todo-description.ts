type ValidadeTodoDescription = {
    success: boolean;
  errors: string[];
}

export function validateTodoDescription(description: string): ValidadeTodoDescription {
    const errors = [];

    if (description.length <= 3) {
        errors.push('Description must be at least 3 characters long.');
    }

    if (description.length > 50) {
        errors.push('Description must be at most 50 characters long.')
    }

    return {
        success: errors.length === 0,
        errors
    }
}