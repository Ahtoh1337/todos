export function shorten(str: string, maxlength: number): string {
    const maxl = Math.max(6, maxlength);
    return str.length > maxl ?
        str.substring(0, maxl - 3) + "..." :
        str;
}