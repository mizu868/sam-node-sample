import { InitPasswordRequest, InitPasswordResponse } from "@/types";
import { InitPassword } from "@/usecase/InitPassword";
import { Validator } from "@/utils/Validator";

export class InitPasswordController {
  async postInitPassword(body: string): Promise<InitPasswordResponse> {
    const requestBody: InitPasswordRequest = JSON.parse(body);
    const userName = requestBody.email;
    const newPassword = requestBody.newPassword;
    const session = requestBody.session;

    Validator.isEmail(userName);

    const initPassword = new InitPassword();
    const executeResponse = await initPassword.execute(
      userName,
      newPassword,
      session
    );
    return {
      authenticationResult: executeResponse.authenticationResult,
    };
  }
}
