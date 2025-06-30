import type { AuthenticationResult } from "@/types/index";

export class InitPasswordDomain {
  constructor(public readonly authenticationResult: AuthenticationResult) {}
}
