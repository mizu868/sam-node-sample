import { CommonError } from "./CommonError";

export class ValidationErrors extends CommonError {
  /**
   * リクエスト必須チェック
   */
  static EXPVAL0001 = (targetKey: string) => {
    return new ValidationErrors(
      "EXPVAL0001",
      "ERROR",
      500,
      "リクエストデータに[" + targetKey + "]は必須です。"
    );
  };
  /**
   * メールアドレスバリデーションエラー
   */
  static EXPVAL0002 = () => {
    return new ValidationErrors(
      "EXPVAL0002",
      "ERROR",
      500,
      "設定可能なメールアドレス以外の値が設定されています。"
    );
  };
  /**
   * 返却値必須チェック
   */
  static EXPVAL0003 = (targetKey: string) => {
    return new ValidationErrors(
      "EXPVAL0003",
      "ERROR",
      500,
      "返却値に[" + targetKey + "]は必須です。"
    );
  };
}
