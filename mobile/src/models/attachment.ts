export interface IAttachment {
  Code: string;
  Url: string;
  Extension: string;
  Description: string;
  Deleted: boolean;
}

export interface IAttachmentResponse {
  FileName: string;
  Extension: string;
  Url: string;
}
