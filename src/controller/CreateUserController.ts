import { CreateUserRequest, CreateUserResponse } from "@/types";
import { CreateUser } from "@/usecase/CreateUser";
import { Validator } from "@/utils/Validator";

export class CreateUserController {
  async postCreateUser(body: string): Promise<CreateUserResponse> {
    const requestBody: CreateUserRequest = JSON.parse(body);
    const targetEmail = requestBody.email;
    Validator.isEmail(targetEmail);

    const createUser = new CreateUser();
    const executeResponse = await createUser.execute(targetEmail);
    return {
      user: {
        userName: executeResponse.user.userName,
        userCreateDate: executeResponse.user.userCreateDate.toString(),
        userStatus: executeResponse.user.userStatus,
      },
    };
  }
}
