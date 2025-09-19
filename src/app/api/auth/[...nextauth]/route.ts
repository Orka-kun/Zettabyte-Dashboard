import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const { handlers } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "MISSING_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "MISSING_SECRET",
    }),
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});

export const GET = handlers.GET;
export const POST = handlers.POST;

