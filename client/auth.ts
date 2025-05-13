import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        console.log(credentials);
        console.log(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        if (!res.ok) {
          const errorResponse = await res.json();
          console.log('errorResponse auth', errorResponse);
          throw new Error(errorResponse.error || 'Login failed');
        }

        const data = await res.json();

        return {
          id: data.userId.toString(),
          email: data.email,
          name: data.name,
        } as User;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
});
