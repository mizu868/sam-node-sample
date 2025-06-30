import { BackendErrors } from "@/exception/BackendErrors";
import {
  AdminCreateUserCommand,
  AdminUserGlobalSignOutCommand,
  CodeMismatchException,
  CognitoIdentityProviderClient,
  CognitoIdentityProviderClientConfig,
  InitiateAuthCommand,
  NotAuthorizedException,
  RespondToAuthChallengeCommand,
  UsernameExistsException,
  UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";
import type {
  AdminCreateUserCommandInput,
  AdminUserGlobalSignOutRequest,
  InitiateAuthRequest,
  RespondToAuthChallengeRequest,
} from "@aws-sdk/client-cognito-identity-provider";

export class CognitoRepository {
  private client: CognitoIdentityProviderClient;

  constructor() {
    const config: CognitoIdentityProviderClientConfig = {
      region: process.env.REGION,
    };
    this.client = new CognitoIdentityProviderClient(config);
  }

  async createUser(adminCreateUserInput: AdminCreateUserCommandInput) {
    try {
      const command = new AdminCreateUserCommand(adminCreateUserInput);
      return await this.client.send(command);
    } catch (err) {
      if (err instanceof UsernameExistsException) {
        throw BackendErrors.EXPBK0002();
      }
      throw err;
    }
  }

  async initiateAuth(initiateAuthInput: InitiateAuthRequest) {
    try {
      const command = new InitiateAuthCommand(initiateAuthInput);
      return await this.client.send(command);
    } catch (err) {
      if (err instanceof NotAuthorizedException) {
        throw BackendErrors.EXPBK0003();
      } else if (err instanceof UserNotFoundException) {
        throw BackendErrors.EXPBK0006();
      }
      throw err;
    }
  }

  async respondToAuthChallenge(
    respondToAuthChallengeInput: RespondToAuthChallengeRequest
  ) {
    try {
      const command = new RespondToAuthChallengeCommand(
        respondToAuthChallengeInput
      );
      return await this.client.send(command);
    } catch (err) {
      if (
        err instanceof CodeMismatchException ||
        err instanceof NotAuthorizedException
      ) {
        throw BackendErrors.EXPBK0004();
      }
      throw err;
    }
  }

  async userGlobalSignOut(
    userGlobalSignOutInput: AdminUserGlobalSignOutRequest
  ) {
    try {
      const command = new AdminUserGlobalSignOutCommand(userGlobalSignOutInput);
      return await this.client.send(command);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw BackendErrors.EXPBK0006();
      }
    }
  }
}
