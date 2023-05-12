import "next-auth";
import { Subscription, User as PrismaUser } from "@prisma/client";

interface IUser extends PrismaUser, DefaultUser {
  email: NonNullable<string>;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
