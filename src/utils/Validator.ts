import { ValidationErrors } from "@/exception/ValidationErrors";

export class Validator {
  static isEmail = (value?: string): void => {
    const regex = /[a-zA-Z]*\.[a-zA-Z]*@prdm\.biz/;
    if (!value) {
      throw ValidationErrors.EXPVAL0001("email");
    }
    if (!value.match(regex)) {
      throw ValidationErrors.EXPVAL0002();
    }
  };
}
