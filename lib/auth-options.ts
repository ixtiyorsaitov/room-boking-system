import { AuthOptions } from "next-auth";
import User from "@/database/user.model";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { connectToDatabase } from "./mongoose";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });
        if (!user || !credentials?.password) return null;

        const isCorrect = await compare(credentials.password, user.password);
        if (!isCorrect) return null;

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectToDatabase();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const name = user.name || "";

          await User.create({
            email: user.email,
            fullName: name,
            profileImage: user.image,
            password: "",
          });
        }
      }

      return true;
    },

    async session({ session }) {
      await connectToDatabase();
      const user = await User.findOne({ email: session.user?.email });
      const haveAPassword =
        user.password && user.password.toString() !== "" ? true : false;
      if (user) {
        const safeUser = { ...user.toObject(), password: haveAPassword };

        session.currentUser = safeUser;
      }

      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_JWT_SECRET!,
  },

  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET!,
};
