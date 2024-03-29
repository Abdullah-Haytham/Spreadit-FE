import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import submitToApi from "../../../src/app/utils/submitToApi";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const url = "http://localhost:3002/login";
        const response = await submitToApi(url, "POST", account.access_token);
        console.log(response)
        return true;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
