import { InitPasswordController } from "@/controller/InitPasswordController";
import { InitPassword } from "@/usecase/InitPassword";
import { afterEach, expect, jest, describe, test } from "@jest/globals";

jest.mock("@/usecase/InitPassword");
const initPasswordMock = InitPassword as jest.Mock;

describe("InitPasswordController", function () {
  afterEach(() => {
    initPasswordMock.mockClear();
  });
  test("正常系", async () => {
    // Arrange
    initPasswordMock.mockImplementation(() => {
      return {
        execute: () => {
          return {
            authenticationResult: {
              refreshToken: "RefleshToken",
              token: "Token",
              expiresIn: "2024-09-01 00:00:00",
              tokenType: "Beare",
            },
          };
        },
      };
    });
    const body = JSON.stringify({
      email: "hoge.hoge@prdm.biz",
      newPassword: "newpassword",
      session: "dummySession",
    });

    const expectValue = {
      authenticationResult: {
        refreshToken: "RefleshToken",
        token: "Token",
        expiresIn: "2024-09-01 00:00:00",
        tokenType: "Beare",
      },
    };

    // Act
    const createUserController = new InitPasswordController();
    const actual = await createUserController.postInitPassword(body);

    // Assert
    expect(actual).toMatchObject(expectValue);
  });
});
