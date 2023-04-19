import { errors as errorsTranslation } from "./errors";
import {getCustomError} from "./getCustomError";
jest.mock("./errors")

describe("getCustomError", () => {

    const originMsg = 'error message';
    const translatedMsg = 'translated error message';

    test.each([
        null,
        undefined,
        [],
        {},
        [null]
    ])
    ("returns null if errors is %p", (errors) => {
        expect(getCustomError(errors)).toBeNull();
    });

    test.each([
        [[originMsg]],
        [[[originMsg]]],
        [{ [originMsg]: null }],
        [{ "any": originMsg }],
        [{ "any": [originMsg] }],
    ])
    ("returns not translated", (errors) => {
        expect(getCustomError(errors)).toEqual(originMsg);
    });

    test.each([
        [[originMsg]],
        [[[originMsg]]],
        [{ [originMsg]: null }],
        [{ [originMsg]: "description" }],
    ])
    ("returns translated", (errors) => {
        errorsTranslation[originMsg] = translatedMsg;
        expect(getCustomError(errors)).toEqual(translatedMsg);
        delete errorsTranslation[originMsg];
    });
});
