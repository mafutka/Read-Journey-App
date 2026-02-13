export function calculateProgress(
    readPages: number,
    totalPages:  number
): number {
    if (!totalPages || totalPages === 0)
        return 0;
    return (readPages / totalPages) * 100
}