import { CommonError } from "./CommonError";

export class BackendErrors extends CommonError {
  /**
   * リクエストボディー不正エラー
   */
  static EXPBK0001 = () => {
    return new BackendErrors(
      "EXPBK0001",
      "ERROR",
      500,
      "リクエストボディーが不正です。"
    );
  };
  /**
   * ユーザー名重複エラー
   */
  static EXPBK0002 = () => {
    return new BackendErrors(
      "EXPBK0002",
      "ERROR",
      500,
      "設定されたユーザー名（メールアドレス）のユーザーはすでに存在します。"
    );
  };
  /**
   * ログインエラー
   */
  static EXPBK0003 = () => {
    return new BackendErrors(
      "EXPBK0003",
      "ERROR",
      500,
      "メールアドレス・パスワードまたはリフレッシュトークンが不正です。"
    );
  };
  /**
   * 不正セッションエラー
   */
  static EXPBK0004 = () => {
    return new BackendErrors(
      "EXPBK0004",
      "ERROR",
      500,
      "セッションIDが不正です。"
    );
  };
  /**
   * Cognitoレスポンスエラー
   */
  static EXPBK0005 = () => {
    return new BackendErrors(
      "EXPBK0005",
      "ERROR",
      500,
      "Cognitoからのレスポンスが不正です。"
    );
  };
  /**
   * 対象ユーザー存在なしエラー
   */
  static EXPBK0006 = () => {
    return new BackendErrors(
      "EXPBK0006",
      "ERROR",
      500,
      "対象のユーザーが存在しません"
    );
  };
  /**
   * 不明なエラー
   */
  static EXPBK9999 = (cause: unknown) => {
    return new BackendErrors(
      "EXPBK9999",
      "ERROR",
      500,
      "不明なエラーです。 couse: " + cause
    );
  };
}
