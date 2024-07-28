export class ResponseData {
  success: boolean;
  error: null | string | unknown;
  data: null | any;

  constructor(success: boolean, error: null | string | unknown, data: null | any = null) {
    this.success = success;
    this.error = error;
    this.data = data;
  }
}