"use server";
import prisma from "@/lib/db";
import { hash } from "bcryptjs";

type SignUpResponse =
  | { id: string; username: string; email: string; password: string; createdAt: Date }
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
