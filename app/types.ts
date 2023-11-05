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
