export interface Mail {
  _id: string;
  title: string;
  body: string;
  date: Date;
  sender: string;
  from: string;
  to: string[];
  folder: string;
  star: boolean;
  avatar: string;
}
