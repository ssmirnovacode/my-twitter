import { FORM_FIELDS } from "@/utils/constants";

export interface IUser {
  id: number;
  username: string;
  avatar: string;
}

export interface IPost {
  id: number;
  content: string;
  created_at: string;
  username: string;
  avatar: string;
}
// TODO add updated_at for edited posts

export interface IError {
  field: string;
  message: string;
}

export type FieldLabel = keyof typeof FORM_FIELDS;
