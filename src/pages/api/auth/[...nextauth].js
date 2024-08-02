import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

export default NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // 세션 만료 시간 설정
      session.expires = token.exp * 1000;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
        // JWT 만료 시간을 현재 시간 + 1시간으로 설정
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
        //token.exp = Math.floor(Date.now() / 1000) + 60;
      }
      return token;
    },
  },
  session: {
    // 세션 전략을 JWT로 설정
    strategy: 'jwt',
    maxAge: 60 * 60, // 1시간
    //maxAge: 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
