import { ChallengeNameType } from "@aws-sdk/client-cognito-identity-provider";
import { components, paths } from "./types";

export type AuthenticationResult = {
  refreshToken: string;
  token: string;
  expiresIn: number;
  tokenType: string;
};

export type InitPasswordChallengeNameType = ChallengeNameType;

export type ErrorResultType = components["schemas"]["ErrorResult"];

export type CreateUserRequest =
  paths["/create-user"]["post"]["requestBody"]["content"]["application/json"];

export type CreateUserResponse =
  paths["/create-user"]["post"]["responses"][200]["content"]["application/json"];

export type InitPasswordRequest =
  paths["/init-password"]["post"]["requestBody"]["content"]["application/json"];

export type InitPasswordResponse =
  paths["/init-password"]["post"]["responses"][200]["content"]["application/json"];

export type NormalAuthRequest =
  paths["/login"]["post"]["requestBody"]["content"]["application/json"];

export type NormalAuthResponse =
  paths["/login"]["post"]["responses"][200]["content"]["application/json"];

export type RefleshTokenAuthRequest =
  paths["/token-reflesh"]["post"]["requestBody"]["content"]["application/json"];

export type RefleshTokenAuthResponse =
  paths["/token-reflesh"]["post"]["responses"][200]["content"]["application/json"];

export type UserGlobalSignOutRequest =
  paths["/logout"]["post"]["requestBody"]["content"]["application/json"];

export type UserGlobalSignOutResponse =
  paths["/logout"]["post"]["responses"][200]["content"]["application/json"];
