import { CreateUserDomain } from "@/domain/CreateUserDomain";
import { ValidationErrors } from "@/exception/ValidationErrors";
import { CognitoRepository } from "@/repository/aws/CognitoRepository";

export class CreateUser {
  async execute(email: string) {
    const cognitoRepository = new CognitoRepository();
    const userData = await cognitoRepository.createUser({
      // AdminCreateUserRequest
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      UserAttributes: [
        // AttributeListType
        {
          Name: "email",
          Value: email,
        },
      ],
      // MessageAction: "SUPPRESS",
      DesiredDeliveryMediums: [
        // DeliveryMediumListType
        "EMAIL",
      ],
    });
    if (!userData.User) {
      console.error(
        "createUser処理の結果、Userが返却されませんでした。登録状況を確認してください。"
      );
      throw ValidationErrors.EXPVAL0003("User");
    }
    const user = userData.User;
    return new CreateUserDomain({
      userName: user.Username || "",
      userCreateDate: user.UserCreateDate || new Date(),
      userStatus: user.UserStatus || "UNKNOWN",
    });
  }
}
