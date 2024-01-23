import { LetterparserMail } from "letterparser";

export interface Mail extends LetterparserMail {
  _id: string;
  avatar?: string;
  raw: string;
}

export interface FetchResponse {
  messages: string[];
}

export interface Box {
  children: Box[];
  name: string;
}
