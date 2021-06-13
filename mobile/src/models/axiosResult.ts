/* eslint-disable no-useless-constructor */
export default class AxiosResult {
  HasError = false;

  ErrorCode = 0;

  private ErrorMessage = '';

  private ResponseData: any;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  AddError(message: string): void {
    this.ErrorMessage = message;
    this.HasError = true;
  }

  AddResponseData(responseData: any): void {
    this.ResponseData = responseData;
  }

  GetError(): string {
    return this.ErrorMessage;
  }

  GetResponseData(): string {
    return this.ResponseData;
  }
}
