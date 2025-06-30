import { AuthenticationResult, InitPasswordChallengeNameType } from "@/types";

type RefleshTokenAuthResult = Omit<AuthenticationResult, "refreshToken">;
export class NormalAuthDomain {
  constructor(
    public readonly challengeName?: InitPasswordChallengeNameType,
    public readonly authenticationResult?: AuthenticationResult,
    public readonly session?: string
  ) {}
}

export class RefleshTokenAuthDomain {
  constructor(public readonly ahthenticationResult: RefleshTokenAuthResult) {}
}
