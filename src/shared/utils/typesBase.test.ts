import {typesBase} from "./typesBase";

describe('typesBase', () => {
    const mock = {...typesBase, key1: 'value1'};
    test('hasValue() should return true if value is a property of the object', () => {
        const result = mock.hasValue('value1');
        expect(result).toBe(true);
    });

    test('hasValue() should return false if value is not a property of the object', () => {
        const result = mock.hasValue('value2');
        expect(result).toBe(false);
    });
});
