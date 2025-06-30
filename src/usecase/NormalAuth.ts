import { NormalAuthDomain } from "@/domain/InitiateAuthDomain";
import { ValidationErrors } from "@/exception/ValidationErrors";
import { CognitoRepository } from "@/repository/aws/CognitoRepository";

export class NormalAuth {
  async execute(userName: string, password: string) {
    const cognitoRepository = new CognitoRepository();
    const initiateAuthResponse = await cognitoRepository.initiateAuth({
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: userName,
        PASSWORD: password,
      },
      ClientId: process.env.USER_POOL_CLIENT_ID,
    });

    // 一時パスワード変更前のユーザーがログインした時
    if (initiateAuthResponse.ChallengeName === "NEW_PASSWORD_REQUIRED") {
      const challengeName = initiateAuthResponse.ChallengeName;
      const session = initiateAuthResponse.Session;
      if (!session) {
        console.error("NormalAuth処理の結果、Sessionが返却されませんでした。");
        throw ValidationErrors.EXPVAL0003("NormalAuthResult");
      }
      return new NormalAuthDomain(challengeName, undefined, session);
    }

    // 通常ログイン時
    if (!initiateAuthResponse.AuthenticationResult) {
      console.error(
        "NormalAuth処理の結果、AuthenticationResultが返却されませんでした。"
      );
      throw ValidationErrors.EXPVAL0003("InitPasswordResult");
    }

    if (!initiateAuthResponse.AuthenticationResult.IdToken) {
      console.error("NormalAuth処理の結果、id tokenが返却されませんでした。");
      throw ValidationErrors.EXPVAL0003("InitPasswordResult IdToken");
    }

    if (!initiateAuthResponse.AuthenticationResult.RefreshToken) {
      console.error(
        "NormalAuth処理の結果、reflesh tokenが返却されませんでした。"
      );
      throw ValidationErrors.EXPVAL0003("InitPasswordResult RefleshToken");
    }

    return new NormalAuthDomain(
      initiateAuthResponse.ChallengeName,
      {
        refreshToken: initiateAuthResponse.AuthenticationResult.RefreshToken,
        token: initiateAuthResponse.AuthenticationResult.IdToken,
        expiresIn: initiateAuthResponse.AuthenticationResult.ExpiresIn || 0,
        tokenType: initiateAuthResponse.AuthenticationResult.TokenType || "",
      },
      undefined
    );
  }
}
