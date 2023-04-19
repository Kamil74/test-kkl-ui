import {errors as errorsTranslation} from "./errors";
export function getCustomError(errors: any) {
    if (!errors) return null;
    if (errors.push) {
        if (!errors.length) return null;
        for (let error of errors) {
            if (!error) return null;
            if (error.push && error.length) {
                error = error[0];
            }
            const translated = errorsTranslation[error];
            return translated || error;
        }
    }
    if (errors && Object.keys(errors).length) {
        for (const key in errors) {
            const translated = errorsTranslation[key];
            if (translated) return translated;
            if (!errors[key]) return key;
            if (!errors[key].push || !errors[key][0])
                return errors[key];
            return errors[key][0];
        }
    }
    return null;
}
