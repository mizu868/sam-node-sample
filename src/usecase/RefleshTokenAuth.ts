import { RefleshTokenAuthDomain } from "@/domain/InitiateAuthDomain";
import { ValidationErrors } from "@/exception/ValidationErrors";
import { CognitoRepository } from "@/repository/aws/CognitoRepository";

export class RefleshTokenAuth {
  async execute(refleshToken: string) {
    const cognitoRepository = new CognitoRepository();
    const initiateAuthResponse = await cognitoRepository.initiateAuth({
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: {
        REFRESH_TOKEN: refleshToken,
      },
      ClientId: process.env.USER_POOL_CLIENT_ID,
    });
    if (!initiateAuthResponse.AuthenticationResult) {
      console.error(
        "RefleshTokenAuth処理の結果、AuthenticationResultが返却されませんでした。"
      );
      throw ValidationErrors.EXPVAL0003("RefleshTokenAuthResult");
    }

    if (!initiateAuthResponse.AuthenticationResult.IdToken) {
      console.error(
        "RefleshTokenAuth処理の結果、id tokenが返却されませんでした。"
      );
      throw ValidationErrors.EXPVAL0003("RefleshTokenAuthResult IdToken");
    }

    return new RefleshTokenAuthDomain({
      token: initiateAuthResponse.AuthenticationResult.IdToken,
      expiresIn: initiateAuthResponse.AuthenticationResult.ExpiresIn || 0,
      tokenType: initiateAuthResponse.AuthenticationResult.TokenType || "",
    });
  }
}
