import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.sub;
      return session;
    },
    // async jwt(token, user, account) {
    //   if (account) {
    //     token.accessToken = account.accessToken;
    //   }
    //   return token;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
