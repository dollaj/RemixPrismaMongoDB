import { Film } from "@prisma/client";
import { prisma } from "./prisma.server";
import { RegisterForm } from "./types.server";
import bcrypt from "bcryptjs";

export const createUser = async (user: RegisterForm) => {
  const passwordHash = await bcrypt.hash(user.password, 10)
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: passwordHash,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      planToWatch: [],
    },
  });
  return { id: newUser.id, email: user.email };
};

export const getUserFilms = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      planToWatch: true
    }
  })
}

export const addUserFilms = async (userId: string, film: Film) => {
  return await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      planToWatch: {
        push: film
      }
    }
  })
}

