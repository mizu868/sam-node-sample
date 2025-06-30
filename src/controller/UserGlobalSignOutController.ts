import { UserGlobalSignOutRequest, UserGlobalSignOutResponse } from "@/types";
import { UserGlobalSignOut } from "@/usecase/UserGlobalSignOut";
import { Validator } from "@/utils/Validator";

export class UserGlobalSignOutController {
  async postUserGlobalSignOut(
    body: string
  ): Promise<UserGlobalSignOutResponse> {
    const requestBody: UserGlobalSignOutRequest = JSON.parse(body);
    const userName = requestBody.email;

    Validator.isEmail(userName);

    const userGlobalSignOut = new UserGlobalSignOut();
    const executeResponse = await userGlobalSignOut.execute(userName);
    return {
      message: executeResponse.message,
    };
  }
}
