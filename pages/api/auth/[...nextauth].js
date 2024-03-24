import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import submitToApi from "../../../src/app/utils/submitToApi";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const url = "http://localhost:80/google/oauth";
        const response = await submitToApi(url, "POST", {"googleToken" :account.access_token});
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
