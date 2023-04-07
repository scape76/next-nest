import { Post, User } from '@prisma/client';

export class UserDto {
  email: string;
  name?: string;
  id: number;

  constructor(user: User) {
    this.email = user.email;
    this.name = user.name;
    this.id = user.id;
  }
}
