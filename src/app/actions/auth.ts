"use server";
import prisma from "@/lib/db";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

type SignUpResponse =
  | {
      id: string;
      username: string;
      email: string;
      password: string;
      createdAt: Date;
    }
  | { error: string };

export const handleSignUp = async (
  email: string,
  password: string,
  username: string
): Promise<SignUpResponse> => {
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in handleSignUp:", error);
    return { error: "An error occurred during sign up" };
  }
};

export const handleSignIn = async (email: string,password:string) => {
  if (!email || !password) {
    return { error: "All fields required" };
  }
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log(result)

    if (result?.error) {
      return { error: "Invalid credentials" };
    }

    return { success: true };

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    return { error: "An unexpected error occurred" };
  }
};