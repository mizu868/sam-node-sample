import { NormalAuthRequest, NormalAuthResponse } from "@/types";
import { NormalAuth } from "@/usecase/NormalAuth";
import { Validator } from "@/utils/Validator";

export class NormalAuthController {
  async postInitiateAuth(body: string): Promise<NormalAuthResponse> {
    const requestBody: NormalAuthRequest = JSON.parse(body);
    const userName = requestBody.email;
    const password = requestBody.password;
    Validator.isEmail(userName);

    const normalAuth = new NormalAuth();
    const executeResponse = await normalAuth.execute(userName, password);
    return {
      challengeName: executeResponse.challengeName,
      authenticationResult: executeResponse.authenticationResult,
      session: executeResponse.session,
    };
  }
}
