import * as sut from "./currentUserService"
import {CurrentUser, RoleTypes} from "../../models";

describe("currentUser", () => {

    test("getCurrentUser should return CurrentUser", async () => {
        // Arrange
        const expected = {
            id: "id",
            username: "user_name",
            email: "email",
            role: RoleTypes.Admin,
            name: "name",
            token: "token"
        } as CurrentUser
        jest.spyOn(window.localStorage.__proto__, "getItem")
            .mockImplementation(() => JSON.stringify(expected))

        // Act
        const result = sut.getCurrentUser()

        // Assert
        expect(result).toEqual(expected)
    })

    test("getCurrentUser should throw error", async () => {
        // Arrange
        jest.spyOn(window.localStorage.__proto__, "getItem")
            .mockImplementation(() => "none")

        // Act
        const act = () => sut.getCurrentUser()

        // Assert
        expect(act).toThrow('Unexpected token o in JSON at position 1')
    })

    test("setCurrentUser should call dataSource with provided argument", async () => {
        // Arrange
        const mock = jest.spyOn(window.localStorage.__proto__, "setItem")
        const expected = {
            id: "id",
            username: "user_name",
            email: "email",
            role: RoleTypes.Admin,
            name: "name",
            token: "token"
        } as CurrentUser

        // Act
        sut.setCurrentUser(expected)

        // Assert
        expect(mock).toHaveBeenCalledWith("auth.currentUser", JSON.stringify(expected));
    })

})
