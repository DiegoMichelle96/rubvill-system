import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ApiError, backend } from "@/lib/backend";
import { loginSchema } from "@/lib/schemas";

const SESSION_SECONDS = 59 * 60;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        try {
          const { sessionId: session } = await backend("/auth/login", { method: "POST", body: parsed.data, sessionId: null });
          const { sessionId, expiresAt } = typeof session === "string" ? { sessionId: session } : session;
          return { id: parsed.data.email, email: parsed.data.email, sessionId, expiresAt };
        } catch (error) {
          if (error instanceof ApiError && error.status < 500) return null;
          throw error;
        }
      },
    }),
  ],
  session: { maxAge: SESSION_SECONDS },
  pages: { signIn: "/login" },
  callbacks: {
    authorized: ({ auth }) => !!auth,
    jwt({ token, user }) {
      if (user) return { ...token, sessionId: user.sessionId, expiresAt: Date.parse(user.expiresAt) || Date.now() + SESSION_SECONDS * 1000 };
      return token.expiresAt > Date.now() ? token : null;
    },
  },
  events: {
    async signOut({ token }) {
      if (token?.sessionId) await backend("/auth/logout", { method: "POST", sessionId: token.sessionId }).catch(() => {});
    },
  },
});
