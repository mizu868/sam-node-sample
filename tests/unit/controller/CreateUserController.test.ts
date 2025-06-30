import { CreateUserController } from "@/controller/CreateUserController";
import { CreateUser } from "@/usecase/CreateUser";
import { afterEach, expect, jest, describe, test } from "@jest/globals";

jest.mock("@/usecase/CreateUser");
const createUserMock = CreateUser as jest.Mock;

describe("CreateUserController", function () {
  afterEach(() => {
    createUserMock.mockClear();
  });
  test("正常系", async () => {
    // Arrange
    createUserMock.mockImplementation(() => {
      return {
        execute: () => {
          return {
            user: {
              userName: "hogehoge",
              userCreateDate: new Date("2024-09-01 00:00:00"),
              userStatus: "UNKNOWN",
            },
          };
        },
      };
    });
    const body = JSON.stringify({
      email: "hoge.hoge@prdm.biz",
    });

    const expectValue = {
      user: {
        userName: "hogehoge",
        userCreateDate: new Date("2024-09-01 00:00:00").toString(),
        userStatus: "UNKNOWN",
      },
    };

    // Act
    const createUserController = new CreateUserController();
    const actual = await createUserController.postCreateUser(body);

    // Assert
    expect(actual).toMatchObject(expectValue);
  });

  // test("メールアドレスが許容されたもの以外の場合エラーになること", async () => {
  //   // Arrange
  //   createUserMock.mockImplementation(() => {
  //     return {
  //       execute: () => {
  //         return {
  //           user: {
  //             userName: "hogehoge",
  //             userCreateDate: new Date("2024-09-01 00:00:00"),
  //             userStatus: "UNKNOWN",
  //           },
  //         };
  //       },
  //     };
  //   });
  //   const body = JSON.stringify({
  //     email: "hoge.hoge@hoge.com",
  //   });

  //   // Act
  //   const createUserController = new CreateUserController();
  //   const actual = createUserController.postCreateUser(body);

  //   // Assert
  //   expect(actual).rejects.toThrow(
  //     "設定可能なメールアドレス以外の値が設定されています。"
  //   );
  // });
});
