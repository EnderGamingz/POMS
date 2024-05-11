import { isAuthenticated } from '@/lib/session';
import { redirect } from 'next/navigation';
import handleLogin from '@/app/auth/login/_components/handleLogin';

export default async function Page() {
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) redirect('/auth/admin');

  return (
    <div className={'container mx-auto mt-10 max-w-lg'}>
      <form action={handleLogin} className={'flex flex-col gap-2'}>
        <input type={'text'} name={'username'} placeholder={'Username'} />
        <input type={'password'} name={'code'} placeholder={'One time code'} />
        <button className={'rounded-lg bg-indigo-300 p-2'}>Log in</button>
      </form>
    </div>
  );
}
