export type SeverityTypes = 'error' | 'warning' | 'info' | 'success';
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SeverityTypes = {
    Error: 'error' as SeverityTypes,
    Warning: 'warning' as SeverityTypes,
    Info: 'info' as SeverityTypes,
    Success: 'success' as SeverityTypes,
} as const;
