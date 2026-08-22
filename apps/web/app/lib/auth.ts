import "./env";

import prisma from "@repo/db/client";

import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "Enter Phone Number",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            number: credentials.phone,
          },
        });

        // User doesn't exist
        if (!user) {
           const newUser=await prisma.user.create({
            data:{
                username:"Alice",
                password:credentials.password,
                number:credentials.phone,
            }
           })
           return {
            id:newUser.id,
            name:newUser.username,
            number:newUser.number,
           }
        }

        // User exists but doesn't have a password
        if (!user.password) {
          return null;
        }

        const passwordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        // Credentials login
        if (account?.provider === "credentials") {
          return true;
        }

        // OAuth providers need an email to identify/link the user.
        if (!user.email) {
          return false;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (existingUser) {
          user.id = existingUser.id;
          return true;
        }

        const newUser = await prisma.user.create({
          data: {
            username: user.name ?? "User",
            email: user.email,
          },
        });

        user.id = newUser.id;

        return true;
      } catch (error) {
        console.error("NextAuth signIn error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};