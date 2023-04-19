
export const typesBase = {
    hasValue(value: string) {
        for (const key in this) {
            if (this[key] === value)
                return true
        }
        return false
    },
}
