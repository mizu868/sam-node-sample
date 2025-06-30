import { InitPasswordDomain } from "@/domain/InitPasswordDomain";
import { ValidationErrors } from "@/exception/ValidationErrors";
import { CognitoRepository } from "@/repository/aws/CognitoRepository";

export class InitPassword {
  async execute(userName: string, newPassword: string, session: string) {
    const cognitoRepository = new CognitoRepository();
    const challengeResponse = await cognitoRepository.respondToAuthChallenge({
      ClientId: process.env.USER_POOL_CLIENT_ID,
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      ChallengeResponses: {
        USERNAME: userName,
        NEW_PASSWORD: newPassword,
      },
      Session: session,
    });

    if (!challengeResponse.AuthenticationResult) {
      console.error(
        "initPassword処理の結果、AuthenticationResultが返却されませんでした。"
      );
      throw ValidationErrors.EXPVAL0003("InitPasswordResult");
    }

    if (!challengeResponse.AuthenticationResult.IdToken) {
      console.error("initPassword処理の結果、id tokenが返却されませんでした。");
      throw ValidationErrors.EXPVAL0003("InitPasswordResult IdToken");
    }

    if (!challengeResponse.AuthenticationResult.RefreshToken) {
      console.error(
        "initPassword処理の結果、reflesh tokenが返却されませんでした。"
      );
      throw ValidationErrors.EXPVAL0003("InitPasswordResult RefleshToken");
    }

    return new InitPasswordDomain({
      refreshToken: challengeResponse.AuthenticationResult.RefreshToken,
      token: challengeResponse.AuthenticationResult.IdToken,
      expiresIn: challengeResponse.AuthenticationResult.ExpiresIn || 0,
      tokenType: challengeResponse.AuthenticationResult.TokenType || "",
    });
  }
}
