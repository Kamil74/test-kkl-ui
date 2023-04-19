import { RoleTypes } from "./roleTypes";

describe("roleTypes", () => {

    test("should return Regular", () => {
        expect(RoleTypes.Regular).toBe('salkakal-user')
    });

    test("should return Admin", () => {
        expect(RoleTypes.Admin).toBe('salkakal-admin')
    });

    test("hasValue should return true", () => {
        expect(RoleTypes.hasValue('salkakal-user')).toBe(true)
    });

    test("hasValue should return false", () => {
        expect(RoleTypes.hasValue('salkakal-user1')).toBe(false)
    });
});
