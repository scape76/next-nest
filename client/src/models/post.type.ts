interface Post {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  content?: string;
  authorId: number;
  author: IUser;
}
