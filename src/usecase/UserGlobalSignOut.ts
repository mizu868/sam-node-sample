import { UserGlobalSignOutDomain } from "@/domain/UserGlobalSignOutDomain";
import { ValidationErrors } from "@/exception/ValidationErrors";
import { CognitoRepository } from "@/repository/aws/CognitoRepository";

export class UserGlobalSignOut {
  async execute(userName: string) {
    const cognitoRepository = new CognitoRepository();
    const userGlobalSignOutResponse = await cognitoRepository.userGlobalSignOut(
      {
        UserPoolId: process.env.USER_POOL_ID,
        Username: userName,
      }
    );
    if (!userGlobalSignOutResponse) {
      console.error(
        "UserGlobalSignOut処理の結果、userGlobalSignOutResponseが返却されませんでした。"
      );
      throw ValidationErrors.EXPVAL0003("userGlobalSignOutResponse");
    }
    return new UserGlobalSignOutDomain("Sign Out Success");
  }
}
