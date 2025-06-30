import { RefleshTokenAuthRequest, RefleshTokenAuthResponse } from "@/types";
import { RefleshTokenAuth } from "@/usecase/RefleshTokenAuth";

export class RefleshTokenAuthController {
  async postRefleshTokenAuth(body: string): Promise<RefleshTokenAuthResponse> {
    const requestBody: RefleshTokenAuthRequest = JSON.parse(body);
    const refleshToken = requestBody.refleshToken;

    const refleshTokenAuth = new RefleshTokenAuth();
    const executeResponse = await refleshTokenAuth.execute(refleshToken);
    return {
      authenticationResult: executeResponse.ahthenticationResult,
    };
  }
}
