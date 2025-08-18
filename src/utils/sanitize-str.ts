export function sanitizeStr(str: string) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.trim().normalize();
}