import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CommonError } from "@/exception/CommonError";
import { BackendErrors } from "@/exception/BackendErrors";
import { CreateUserController } from "@/controller/CreateUserController";
import { NormalAuthController } from "@/controller/NormalAuthController";
import { InitPasswordController } from "@/controller/InitPasswordController";
import { RefleshTokenAuthController } from "@/controller/RefleshTokenAuthController";
import { UserGlobalSignOutController } from "@/controller/UserGlobalSignOutController";
import { ErrorResultType } from "@/types";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const path = event.path;
    let body: string;
    if (event.httpMethod === "POST" && !event.body) {
      throw BackendErrors.EXPBK0001();
    } else if (!event.body) {
      body = "";
    } else {
      body = event.body;
    }

    let response = "";
    switch (path) {
      case "/create-user":
        const createUserController = new CreateUserController();
        response = JSON.stringify(
          await createUserController.postCreateUser(body)
        );
        console.log(response);
        break;
      case "/init-password":
        const initPasswordController = new InitPasswordController();
        response = JSON.stringify(
          await initPasswordController.postInitPassword(body)
        );
        break;
      case "/login":
        const initiateAuthController = new NormalAuthController();
        response = JSON.stringify(
          await initiateAuthController.postInitiateAuth(body)
        );
        break;
      case "/token-reflesh":
        const refleshTokenAuthController = new RefleshTokenAuthController();
        response = JSON.stringify(
          await refleshTokenAuthController.postRefleshTokenAuth(body)
        );
        break;
      case "/logout":
        const userGlobalSignOutController = new UserGlobalSignOutController();
        response = JSON.stringify(
          await userGlobalSignOutController.postUserGlobalSignOut(body)
        );
        break;
      case "/hello":
        response = "ok hello";
    }
    return {
      statusCode: 200,
      body: response,
    };
  } catch (err) {
    console.error(err);
    return createError(err);
  }
};

function createError(err: unknown) {
  if (err instanceof CommonError) {
    return {
      statusCode: err.httpStatusCode,
      body: JSON.stringify({
        errorCode: err.errorCode,
        message: err.message,
      } as ErrorResultType),
    };
  } else {
    const unknownError = BackendErrors.EXPBK9999(err);
    return {
      statusCode: unknownError.httpStatusCode,
      body: JSON.stringify({
        errorCode: unknownError.errorCode,
        message: unknownError.message,
      } as ErrorResultType),
    };
  }
}
