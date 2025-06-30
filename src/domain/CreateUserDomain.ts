import { UserStatusType } from "@aws-sdk/client-cognito-identity-provider/dist-types/models";

type User = {
  userName: string;
  userCreateDate: Date;
  userStatus: UserStatusType;
};

export class CreateUserDomain {
  constructor(public readonly user: User) {}
}
