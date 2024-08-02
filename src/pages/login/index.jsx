import { signIn, signOut, useSession } from 'next-auth/react';

export default function Login() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <>
      <button onClick={() => signIn('kakao')}>Sign in</button>
      <button onClick={() => signOut('kakao')}>로그아웃</button>
    </>
  );
}
